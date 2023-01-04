// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    /**
     * jquery.dbm.nav.js
     * contain nav js
     */
    var dbmNav;

    dbmNav = {
        $navItem0 : $('.c-nav__level0 > li'),
        $navItem1 : $('.c-nav__level1 > li'),
        $navSubDisplay : $('.c-nav__show'),
        $navSubHide : $('.c-nav__hide'),
        subMenu : '[class*="c-nav__level"]',

        init: function() {
            this._eventHandler();
        },

        _eventHandler: function() {
            var self = this;

            $('body').on('click.dbm', '.c-nav__show', function(ev) {
                self._displayNavSubLevel($(this));
            });

            $('body').on('click.dbm', '.c-nav__hide', function(ev) {
                self._hideNavSubLevel($(this));
            });

            $(document).on('CLOSE_OFFCANVAS', function() {
                self._closeAllSubLevel();
            });
        },

        _getSubMenu: function($el) {
            var $subMenu = $el.find(this.subMenu).first();

            return $subMenu;
        },

        _hasSubMenu: function($el) {
            var $subMenu = this._getSubMenu($el);

            if(!$subMenu.length)
            {
                return false;
            }
            else
            {
                return true;
            }
        },

        _toggleActive: function($el) {
            $el.find('a').first().toggleClass('is-active');
        },

        _toggleSubMenu: function(ev, $el) {
            var $subMenu = this._getSubMenu($el);

            $subMenu.toggleClass('is-visible');
        },

        _displayNavSubLevel: function($el) {
            var navSubLevel = $el.next(this.subMenu);
            var navSubLevel__megaMenu = $el.next('.c-nav__megaMenu').find(this.subMenu).first();

            if(navSubLevel__megaMenu.length)
            {
                navSubLevel__megaMenu.addClass('is-inViewport');
            }
            else
            {
                navSubLevel.addClass('is-inViewport');
            }
        },

        _hideNavSubLevel: function($el) {
            var navSubLevel = $el.parents('.is-inViewport').first();

            navSubLevel.removeClass('is-inViewport');
        },

        _closeAllSubLevel: function() {
            this.$navSubHide.parent(this.subMenu).removeClass('is-inViewport');
        },
        
    };

    var dbmOffCanvas;

    dbmOffCanvas = {
        /**
        * Initialize variables
        */
        // icon menu
        $iconHolder: $('.c-nav__icon'),
        // offcanvas
        $menuHolder: $('.o-nav'),
        // overlay for closure
        $closeOffcanvas: $('.c-nav__close'),
        // wrapper offset
        $wrapper : $('body'),
        // scrollTop for fixed nav
        scrollTop : $(window).scrollTop(),
        scrollTopSave : undefined,

        /**
        * Initialize event
        */
        CLOSE_OFFCANVAS : 'CLOSE_OFFCANVAS',

        /**
        * [init] constructor
        */
        init: function() {
            this._eventHolder();
            this._eventTrigger();
            this._updateScrollTop();
        },

        /**
        * Catch click event
        */
        _eventHolder: function() {
            var self = this;

            // click on burger icon
            this.$iconHolder.on('click', function(ev) {
                ev.preventDefault();
                if($(ev.target).hasClass('is-active'))
                {
                    self._closeOffCanvas();
                    $(document).trigger('CLOSE_OFFCANVAS');
                }
                else
                {
                    self._openOffCanvas();
                }
            });

            // bind CLOSE_OFFCANVAS to document
            $(document).on('CLOSE_OFFCANVAS', function() {
                self._closeOffCanvas();
            });

            // pragmatical closure
            $('.o-nav .c-close').on('click.dbm', function() {
                self._closeOffCanvas();
            });
        },

        /**
        * Trigger custom event
        */
        _eventTrigger: function() {
            this.$closeOffcanvas.on('click', function(ev) {
                ev.preventDefault();
                $(document).trigger('CLOSE_OFFCANVAS');
            });
        },

        /**
        * Hide / show offcanvas
        */
        _openOffCanvas: function($el) {
            // save scrollTop
            this.scrollTopSave = $(window).scrollTop();

            // swap burger icon <-> cross icon
            this.$iconHolder.toggleClass('is-active');

            // display / hide offcanvas
            this.$menuHolder.toggleClass('is-inViewport');
            this.$wrapper.toggleClass('is-fixed');

            // display / hide $closeOffcanvas
            this.$closeOffcanvas.toggleClass('is-active');

            // udpade $('body') position
            this._updateDomElmntPosition();
        },

        /**
        * listen to CLOSE_OFFCANVAS, for pragmatic closure
        */
        _closeOffCanvas: function() {
            // swap cross icon -> burger icon
            this.$iconHolder.removeClass('is-active');

            // hide offcanvas
            this.$menuHolder.removeClass('is-inViewport');
            this.$wrapper.removeClass('is-fixed');

            // hide $closeOffcanvas
            this.$closeOffcanvas.removeClass('is-active');

            // release body position
            $('body, .c-nav').css({
                top : 0
            });

            $(window).scrollTop(this.scrollTopSave);
        },

        _updateScrollTop: function() {
            var self = this;
            var resizeTimer;

            $(window).on('scroll', function(){
                // lock function during scroll handler
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    self.scrollTop = $(window).scrollTop();
                }, 250);
            });
        },

        _updateDomElmntPosition: function() {
            var self = this;

            $('body').css({
                'top' : -1*self.scrollTop
            });
        },
    };


    $(document).ready(function() {
        dbmOffCanvas.init();
        dbmNav.init();
        jQuery(".sub-menu").addClass("c-nav__level1");

        jQuery(".menu-item-has-children > a").attr("aria-haspopup", "true");
        jQuery('<div class="c-nav__show"><span class="c-fdbm__icon--arrowRight"></span></div>').insertAfter(".menu-item-has-children a[aria-haspopup='true']");

        //jQuery('<li class="c-nav__hide"><span class="c-fdbm__icon--arrowLeft"></span><span class="c-text">Visioconférence</span></li>').insertBefore(".menu-item-has-children .c-nav__level1 li:eq(0)");
        jQuery(".menu-item-has-children ").each(function() {
            var txt = jQuery( this ).find("a[aria-haspopup='true']").text();
            var txt2 = '<li class="c-nav__hide"><span class="c-fdbm__icon--arrowLeft"></span><span class="c-text">'+txt+'</span></li>';
            jQuery( this ).find('.c-nav__level1').prepend(txt2);
          });

        $(".menu-item-has-children >a").click(function (event) {
            event.preventDefault();
        });
    });
}));
