// js-accordion
// ============

;(function($) {

    // Settings
    var pluginName = "accordion",
    defaults = {
        accItem             : ".accordion__item",
        accContent          : ".accordion__content",
        accActive           : "accordion__item--active",
        accRadio            : "js-accordion-radio",
        accLabel            : ".accordion__label",
        accSpeed            : 500,
        accToggle           : false,
        onComplete : function () {}
    };

    // Ctor
    function Plugin( element, options ) {
        this.element    = element;
        this.options    = $.extend( {}, defaults, options) ;
        this._defaults  = defaults;
        this._name      = pluginName;

        this.init();
    }

    //Init
    Plugin.prototype.init = function () {

        var e       = $( this.element );
        var opts    = this.options;
        var item    = e.find( opts.accItem );
        var itemLabel = e.find(opts.accLabel);

        if (e.data("toggle") === true) {
            opts.accToggle = true;
        }

        $("."+opts.accActive).find(opts.accContent).css({height: "auto"});
        $(".js-accordion-radio:checked", e).parents(opts.accItem).addClass(opts.accActive).find(opts.accContent).css({height: "auto"});

        itemLabel.on( "click" , function() {
            var evt = $(this);
            var accItemParent = evt.closest(opts.accItem)


            if(!accItemParent.hasClass(opts.accActive)) {
                var contentHeight = 0;
                var content = accItemParent.find( opts.accContent );

                content.css({ height: "auto" });
                contentHeight = content.outerHeight( true );

                //  Opens the clicked accordion item
                content.css({ height: 0 }).stop().animate(
                    { height: contentHeight },
                    opts.accSpeed,
                    function(){
                        content.css({height: "auto" })
                         if( e.attr("data-resize-colorbox") === "true" ) {
                                $.colorbox.resize();
                         }
                        opts.onComplete();
                    }
                );

                if(!opts.accToggle) {

                    // Closes the active accordion item
                    $("."+opts.accActive).find(opts.accContent).stop().animate(
                        { height: 0 },
                        opts.accSpeed,
                        function() {
                           $(this).removeAttr("style");

                        }
                    );

                    // Remove all active accordion class
                    item.removeClass( opts.accActive );
                }
                // Assign active accordion class to new clicked accordion item
                accItemParent.addClass( opts.accActive );
                accItemParent.children(".js-accordion-radio").prop("checked", true);
            } else {
                // If clicked accordion item is active close that shit
                accItemParent.find(opts.accContent).stop().animate(
                    { height: 0 },
                    opts.accSpeed,
                    function() {
                       $(this).removeAttr("style");
                       accItemParent.removeClass( opts.accActive );

                    }
                );
            }
        } );
    };

    // Plugin wrapped ctor
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

}(jQuery));

$( ".js-accordion" ).accordion();
