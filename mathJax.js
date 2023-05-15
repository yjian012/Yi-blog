window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    processRefs: true
  },
  options: {
    skipHtmlTags: [
      'script', 'noscript', 'style', 'textarea',
      'code', 'annotation', 'annotation-xml'
    ],
    includeHtmlTags: {
      br: '\n',
      wbr: '',
      '#comment': ''
    },
    ignoreHtmlClass: 'tex2jax_ignore|editor-rich-text|hljs'
  }
};

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  script.async = true;
  document.head.appendChild(script);
})();
