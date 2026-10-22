/* Builds the plain-text "Copy for Simon" message: paper IDs, full titles and years only. */
(function (root) {
  var INTRO = 'Help me explore these papers from the Enterprise Policy Literacy corpus. Identify potential thematic connections and implications for enterprise policy. Use metadata and abstracts you can reliably retrieve; distinguish evidence from hypotheses and do not assume access to full texts.';

  function clean(v) {
    v = v == null ? '' : String(v).trim();
    return v;
  }

  function buildMessage(papers) {
    var seen = new Set();
    var lines = [INTRO, '', 'Papers:'];
    var count = 0;
    (papers || []).forEach(function (p) {
      if (!p) return;
      var id = Number(p.paper_id != null ? p.paper_id : p.id);
      if (!Number.isFinite(id) || seen.has(id)) return;
      seen.add(id);
      count++;
      var title = clean(p.title) || 'Untitled';
      var year = clean(p.year);
      lines.push('[P' + id + '] ' + title + (year ? ' (' + year + ')' : ''));
    });
    return { text: lines.join('\n'), count: count };
  }

  root.EpltSimonCopy = { buildMessage: buildMessage, INTRO: INTRO };
})(typeof window !== 'undefined' ? window : globalThis);
