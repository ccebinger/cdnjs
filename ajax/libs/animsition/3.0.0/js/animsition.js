/*!
 * animsition v3.0.0
 * http://blivesta.github.io/animsition/
 * Licensed under MIT
 * Copyright 2013-2014 blivesta
 * 
 */
(function($) {
  var namespace = "animsition";
  var methods = {
    init: function(options) {
      options = $.extend({
        inClass: "animsition-in-duration",
        outClass: "animsition-out-duration",
        linkElement: ".animsition-link"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          $(window).load(function() {
            methods.pageIn.call(_this);
          });
          $(options.linkElement).on("click." + namespace, function(event) {
            event.preventDefault();
            var $self = $(this);
            methods.pageOut.call(_this, $self);
          });
        }
      });
    },
    pageIn: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var inClass = $this.data("animsition-in");
      var inDelay = $("." + options.inClass).css("animation-duration").replace(/s/g, "") * 1e3;
      var inOutClass = function() {
        $this.addClass(inClass);
      };
      inOutClass();
      setTimeout(function() {
        $this.removeClass(inClass + " " + options.inClass).addClass(options.outClass).css({
          opacity: 1
        });
      }, inDelay);
    },
    pageOut: function($self) {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var url = $self.attr("href");
      var selfOutClass = $self.data("animsition-out");
      var bodyOutClass = $this.data("animsition-out");
      var outDelay = $("." + options.outClass).css("animation-duration").replace(/s/g, "") * 1e3;
      var stream = function() {
        location.href = url;
      };
      var addOutClass = function() {
        if (selfOutClass) {
          outClass = selfOutClass;
        } else {
          outClass = bodyOutClass;
        }
        $this.addClass(outClass);
      };
      addOutClass();
      setTimeout(function() {
        stream();
      }, outDelay);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.animsition = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);