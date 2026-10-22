// Shared Reading List store for every Artefact entry point (tables now,
// network hover card later). Storage key `eplt-reading-list`, versioned:
// { "version": 1, "items": [{ "id": <paper_id>, "savedAt": <ms> }] }.
// Unreadable or unsupported data is never overwritten.
(function () {
    const KEY = 'eplt-reading-list';
    const VERSION = 1;
    const listeners = new Set();
    let state = { status: 'ok', items: [] };

    const parse = raw => {
        if (raw === null || raw === undefined) return { status: 'ok', items: [] };
        let data;
        try { data = JSON.parse(raw); } catch { return { status: 'unreadable', items: [] }; }
        if (!data || typeof data !== 'object' || Array.isArray(data)) return { status: 'unreadable', items: [] };
        if (data.version !== VERSION) return { status: 'unsupported', items: [] };
        if (!Array.isArray(data.items)) return { status: 'unreadable', items: [] };
        const seen = new Set();
        const items = [];
        for (const it of data.items) {
            const id = Number(it && it.id);
            if (!Number.isInteger(id) || seen.has(id)) continue;
            seen.add(id);
            const savedAt = Number(it.savedAt);
            items.push({ id, savedAt: Number.isFinite(savedAt) ? savedAt : 0 });
        }
        return { status: 'ok', items };
    };

    const load = () => {
        try { state = parse(localStorage.getItem(KEY)); }
        catch { state = { status: 'unavailable', items: [] }; }
    };

    const notify = () => listeners.forEach(fn => { try { fn(api); } catch (e) { console.error(e); } });

    const write = items => {
        if (state.status !== 'ok') return false;
        try { localStorage.setItem(KEY, JSON.stringify({ version: VERSION, items })); }
        catch { return false; }
        state = { status: 'ok', items };
        notify();
        return true;
    };

    const api = {
        KEY,
        VERSION,
        parse,
        status: () => state.status,
        canSave: () => state.status === 'ok',
        has: id => state.items.some(it => it.id === Number(id)),
        count: () => state.items.length,
        // Newest saved first; savedAt kept for future sort options.
        list: () => [...state.items].sort((a, b) => b.savedAt - a.savedAt),
        add(id) {
            id = Number(id);
            if (!Number.isInteger(id)) return false;
            load();
            if (api.has(id)) return true;
            return write([...state.items, { id, savedAt: Date.now() }]);
        },
        remove(id) {
            id = Number(id);
            load();
            if (!api.has(id)) return true;
            return write(state.items.filter(it => it.id !== id));
        },
        // Bulk removal in a single write (used by Remove selected / Clear all).
        removeMany(ids) {
            const drop = new Set([...ids].map(Number));
            load();
            if (!state.items.some(it => drop.has(it.id))) return true;
            return write(state.items.filter(it => !drop.has(it.id)));
        },
        clear() { load(); return api.removeMany(state.items.map(it => it.id)); },
        toggle(id) { return api.has(id) ? api.remove(id) : api.add(id); },
        subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
        reload() { load(); notify(); }
    };

    window.addEventListener('storage', event => {
        try { if (event.storageArea && event.storageArea !== localStorage) return; } catch { return; }
        if (event.key !== KEY && event.key !== null) return;
        api.reload();
    });

    load();
    window.EpltReadingList = api;
})();
