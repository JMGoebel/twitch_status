// The point of SVG pipeline
jQuery.fn.extend({
  addSVG: function (url, name, callback) {
    'use strict';
    var elementPrefix, elementName;
    if (!this[0]) {
      console.error("addSVG should be called from a jQuery selector");
      console.error("Ex:  $('#target').addSVG(url, name, function () { //do stuff after creation })");
      return;
    }

    if (this[0].id !== undefined) {
      elementPrefix = "#";
      elementName = this[0].id;
    } else if (this[0].className !== undefined) {
      elementPrefix = ".";
      elementName = this[0].className;
    } else {
      console.error("Invalid call in addSVG");
    }

    $.ajax({
      url: url,
      success: function (data) {
        var svg_code = (new XMLSerializer()).serializeToString(data),
          build_html = "";

        build_html = "<!-- " + name + ".svg code <SVG PIPELINE> -->";
        build_html += "<div class='" + name + "'>";
        build_html += svg_code;
        build_html += "</div>";

        $(elementPrefix + elementName).append(build_html);

        if (callback) {
          callback();
        }
      }
    });
  }
});
