/**
 * targetin v0.0.1
 * Author: taknakamu
 * Git: https://github.com/taknakamu/jquery-targetin.js
 *
 * Copyright (c) 2014 nmta
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {

  var windowInfo = screen = {};

  var screenOffset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  }

  var targets = [];

  $.event.special.targetin = {

    add: function( handleObj ) {
      targets.push(this);
    }

  };

  function setWindowInfo() {
    windowInfo = {
      screen: {
        width: $(window).width(),
        height: $(window).height()
      },
      scroll: {
        top:  $(window).scrollTop(),
        left: $(window).scrollLeft()
      }
    }
  }

  function setScreen() {
    screen.top = windowInfo.scroll.top;
    screen.bottom = windowInfo.scroll.top + windowInfo.screen.height;
    screen.left = windowInfo.scroll.left;
    screen.right = windowInfo.scroll.top + windowInfo.screen.width;

    screen.top    += screenOffset.top;
    screen.bottom -= screenOffset.bottom;
    screen.left   += screenOffset.left;
    screen.right  -= screenOffset.right;
  }

  function setTargetInfo(target) {
    var targetOffset = $(target).offset();

    $(target).coveringWidth  = (target.offsetWidth  > windowInfo.screen.width);
    $(target).coveringHeight = (target.offsetHeight > windowInfo.screen.height);

    $(target).data("info", {
      top: targetOffset.top,
      bottom: targetOffset.top + target.offsetHeight,
      left: targetOffset.left,
      right: targetOffset.left + target.offsetWidth,
      coveringWidth: (target.offsetWidth  > windowInfo.screen.width),
      coveringHeight: (target.offsetHeight > windowInfo.screen.height)
    });
  }

  $(window).on("focus scroll scrollstop resize", function() {
    setWindowInfo();
    setScreen();

    var height = windowInfo.screen.height - (windowInfo.screen.height * 0.06);
    var width  = windowInfo.screen.width  - (windowInfo.screen.width * 0.06);

    $(targets).each(function(i, v) {
      setTargetInfo(v);

      var usePositonTop = $(v).data("info").top;
      var usePositonBottom = $(v).data("info").bottom;
      var usePositonRight = $(v).data("info").right;
      var usePositonLeft = $(v).data("info").left;

      if ($(v).data("info").coveringHeight) {
        usePositonBottom = $(v).data("info").top + height;
      }

      if ($(v).data("info").coveringWidth) {
        usePositonRight = $(v).data("info").left + width;
      }

      if (screen.top <= usePositonTop && screen.left <= usePositonLeft) {
          if (screen.bottom >= usePositonBottom && screen.right >= usePositonRight) {
            $(v).trigger("targetin");
          }
      }
    })
  });

})(jQuery);
