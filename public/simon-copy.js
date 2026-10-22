/* Builds the plain-text "Copy for Simon" message from bibliographic metadata only. */
(function (root) {
  var LIMITATION = 'Please analyse this selection using only the bibliographic metadata provided and any additional metadata you can reliably access within Enterprise Policy Literacy. Do not assume access to the full texts of these publications. Distinguish observations supported by the metadata from hypotheses requiring further reading. This is not a full-text literature review.';
  var REQUEST = 'Based on the bibliographic metadata provided, help me explore potential thematic connections between these papers, identify questions worth investigating, and suggest possible implications for enterprise policy that would require verification through further reading.';

  function field(v) {
    if (Array.isArray(v)) v = v.filter(Boolean).join(', ');
    v = v == null ? '' : String(v).trim();
    return v || 'not recorded';
  }

  function buildMessage(papers) {
    var seen = new Set();
    var list = [];
    (papers || []).forEach(function (p) {
      if (!p) return;
      var id = Number(p.paper_id != null ? p.paper_id : p.id);
      if (!Number.isFinite(id) || seen.has(id)) return;
      seen.add(id);
      list.push({ id: id, p: p });
    });
    var lines = [
      'Papers selected from the Enterprise Policy Literacy corpus',
      'Number of papers: ' + list.length,
      'Note: paper IDs are internal corpus identifiers, not DOIs.',
      ''
    ];
    list.forEach(function (it, i) {
      lines.push((i + 1) + '. [P' + it.id + '] ' + field(it.p.title));
      lines.push('   Authors: ' + field(it.p.authors));
      lines.push('   Year: ' + field(it.p.year) + ' | Journal: ' + field(it.p.journal));
    });
    lines.push('', 'Suggested request:', REQUEST, '', LIMITATION);
    return { text: lines.join('\n'), count: list.length };
  }

  root.EpltSimonCopy = { buildMessage: buildMessage, LIMITATION: LIMITATION, REQUEST: REQUEST };
})(typeof window !== 'undefined' ? window : globalThis);
