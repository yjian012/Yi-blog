var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");
//
// markdown-highlight-in-blogger.js -- javascript for using Markdown in Blogger
// Based on Francis Tang's http://blog.chukhang.com/2011/09/markdown-in-blogger.html
// Copyright (c) 2017 Divya van Mahajan
//
// Redistributable under a BSD-style open source license.
// Documentation: https://github.com/cs905s/md-in-blogger
//
  // namespace
  var MarkdownHighlightInBlogger = {};
  // From http://erlend.oftedal.no/blog/?blogid=14
  MarkdownHighlightInBlogger.unescapeHTML = function (html) {
    var htmlNode = document.createElement("DIV");
    htmlNode.innerHTML = html;
    if(htmlNode.innerText !== undefined)
      return htmlNode.innerText; // IE
    return htmlNode.textContent; // FF
  };
  MarkdownHighlightInBlogger.convertMD = function () {
    try {
      console.info('Converting markdown using jQuery');
      // showdown renderer
      var converter = new showdown.Converter({});
      converter.setFlavor('github');
      $('pre.markdown').each(function (i, block) {
        //var rawtext = MarkdownHighlightInBlogger.unescapeHTML(block.innerText);
        var rawtext = block.innerText;
        var md_html = converter.makeHtml(rawtext);
        var md = $(md_html); //.css('border','3px solid blue');
        md.insertBefore(block);
        block.hidden = true;
      });
      $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    } catch (exc) {
      console.error(exc);
    }
  };
  $(document).ready(MarkdownHighlightInBlogger.convertMD);
}