'use strict';

!function ($) {
    var name_space = 'f-tab',
        tab_selector = '[data-toggle="' + name_space + '"]',
        Tab = function (element, options) {
            this.element = $(element);
            this.options = $.extend(options, $.fn[name_space].defaults);

            this.init();
        };

    Tab.prototype = {
        init: function () {
            var me = this,
                $el = this.element;

            me.parent = $el.parent('li');
            me.target = $($el.attr('href'));
        },

        show: function () {
            var me = this,
                active_class = me.options.active_class;

            if (me.parent.hasClass(active_class)) return false;

            me.parent.
                add(me.target).addClass(active_class).
                end().
                siblings().
                    find(tab_selector)[name_space]('hide');

            me.element.trigger('shown');
        },

        hide: function () {
            var me = this,
                active_class = me.options.active_class;

            me.parent.add(me.target).removeClass(active_class);
        }
    };

    $.fn[name_space] = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data(name_space),
                options = (typeof option == 'object') ? option: {};

            if (!data) $this.data(name_space, (data = new Tab(this, options)));
            if (typeof option == 'string') data[option]();
        })
    };

    $.fn[name_space].defaults = {
        active_class: 'active'
    };

    $(function () {
        $('body').on('click.' + name_space, tab_selector, function (e) {
            e.preventDefault();
            $(this)[name_space]('show');
        })
    });
} (jQuery);