(function () {
  var src = document.body.getAttribute('data-src');
  if (!src) return;

  function setContent(html) {
    var el = document.getElementById('content');
    if (el) el.innerHTML = html;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'})[c];
    });
  }

  function fallback(md) {
    setContent('<pre>' + escapeHtml(md) + '</pre>');
  }

  fetch(src)
    .then(function (r) { return r.text(); })
    .then(function (md) {
      if (window.marked && window.marked.parse) {
        setContent(window.marked.parse(md));
      } else {
        fallback(md);
      }
    })
    .catch(function () {
      setContent('<p class="meta">Failed to load content.</p>');
    });
})();
