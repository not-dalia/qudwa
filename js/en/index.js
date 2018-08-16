(function($) {
  "use strict";
  var definer = $(
      '<div dir="rtl" style="font-size: 14px; width: 4px; height: 1px; position: absolute; top: -1000px; overflow: scroll">ABCD</div>'
    ).appendTo("body")[0],
    type = "reverse";

  if (definer.scrollLeft > 0) {
    type = "default";
  } else {
    definer.scrollLeft = 1;
    if (definer.scrollLeft === 0) {
      type = "negative";
    }
  }
  console.log(type);
  $(definer).remove();
  $.support.rtlScrollType = type;
})(jQuery);

$.fn.attachDragger = function() {
  var attachment = false,
    lastPosition,
    position,
    difference,
    activeTouch = 0;
  $(this).on(
    "mousedown mouseup mousemove touchstart touchend touchmove",
    function(e) {
      if (e.type == "mousedown" || e.type == "touchstart") {
        (attachment = true),
          (lastPosition = [
            e.clientX || e.touches[0].clientX,
            e.clientY || e.touches[0].clientY
          ]);
        if (e.type == "touchstart")
          activeTouch = e.changedTouches[0].identifier;
      }
      if (e.type == "mouseup" || e.type == "touchend") {
        attachment = false;
        if (e.type == "touchend") activeTouch = 0;
      }
      if (
        (e.type == "mousemove" || e.type == "touchmove") &&
        attachment == true
      ) {
        position = [
          e.clientX || e.touches[0].clientX,
          e.clientY || e.touches[0].clientY
        ];
        if (e.type == "touchmove") {
          var currentTouch = e.touches[0];
          for (var i = 0; i < e.touches.length; i++) {
            if (e.touches[i].identifier == activeTouch) {
              currentTouch = e.touches[i];
              position = [currentTouch.clientX, currentTouch.clientY];
              break;
            }
          }
        }
        difference = [
          position[0] - lastPosition[0],
          position[1] - lastPosition[1]
        ];
        var scrollValue = 0;
        switch (jQuery.support.rtlScrollType) {
          case "negative":
            scrollValue = $(this).scrollLeft() - difference[0];
            break;
          case "reverse":
            scrollValue = $(this).scrollLeft() + difference[0];
            break;
          default:
            scrollValue = $(this).scrollLeft() - difference[0];
            break;
        }
        $(this).scrollLeft(scrollValue);
        // $(this).scrollTop($(this).scrollTop() - difference[1]);
        lastPosition = [
          e.clientX || e.touches[0].clientX,
          e.clientY || e.touches[0].clientY
        ];
      }
    }
  );
  $(window).on("mouseup", function() {
    attachment = false;
  });
};

$(document).ready(function() {
  $(".selected-tags").attachDragger();
});