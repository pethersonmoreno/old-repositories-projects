(function($){
    var WpInitStandardSlider = function(element, options) {
        var el = $(element);

        var settings = $.extend({
            baseWidth: 700,
            baseHeight: 350
        }, options || {});

        var slider_opts = {
            slideResize         : true,
            containerResize     : false,
            fit                 : 1,
            fx                  : 'scrollRight',
            pause               : 1,
            pauseOnPagerHover   : 1,
            random              : 0,
            timeout             : 4000,
            speed               : 1000,
            pager               : '#slider_pager',
            next                : '#slider_next',
            prev                : '#slider_prev'
        };
        var slider_resize = function() {
            var xWidth  = el.parent().width();
            var xHeight = options.baseHeight * xWidth / options.baseWidth;
            slider_opts.width = xWidth;
            slider_opts.height = xHeight;
            el.cycle('destroy');
            el.cycle(slider_opts);
        };
        slider_resize();
        $(window).resize(function() {
            slider_resize();
        });
    };

    $.fn.wpInitStandardSlider = function(options) {
        return this.each(function() {
            var element = $(this);
            if (element.data('wpInitStandardSlider')) return;
            var wpInitStandardSlider = new WpInitStandardSlider(this, options);
            element.data('wpInitStandardSlider', wpInitStandardSlider);
        });
    };

})(jQuery);
