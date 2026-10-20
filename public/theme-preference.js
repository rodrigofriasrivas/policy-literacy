// Same preference contract as src/lib/themePreference.ts. This small bridge
// keeps the standalone artefact independent of React and its rendering logic.
(function () {
    const key = 'eplt-theme';
    const valid = value => value === 'dark' || value === 'light';
    const read = () => {
        try {
            const value = localStorage.getItem(key);
            return valid(value) ? value : 'dark';
        } catch {
            return 'dark';
        }
    };
    const apply = theme => {
        document.documentElement.dataset.theme = theme;
        document.body.classList.toggle('theme-light', theme === 'light');
        const toggle = document.getElementById('themeToggle');
        if (toggle) toggle.checked = theme === 'dark';
    };
    window.EpltTheme = {
        read,
        set(theme) {
            if (!valid(theme)) return;
            apply(theme);
            try { localStorage.setItem(key, theme); } catch { /* In-page updates remain available. */ }
        }
    };
    window.addEventListener('storage', event => {
        try {
            if (event.storageArea && event.storageArea !== localStorage) return;
        } catch { return; }
        if (event.key !== key && event.key !== null) return;
        if (event.newValue === null) apply('dark');
        else if (valid(event.newValue)) apply(event.newValue);
    });
    apply(read());
    document.addEventListener('DOMContentLoaded', () => apply(read()), { once: true });
})();