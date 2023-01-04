// import PhotoSwipeLightbox from '../js/photoswipe-lightbox.esm.min.js';
(function($) {
    var $noodraApp;
    $noodraApp = {
        subMenu: '[class*="submenu"]',
        init: function() {
            this._scrollToTop();
            this._menuBurger();
            this._menuMobile();
            this._swiper();
            this._cloneHeader();
            this._selectBox();
            this._fancybox();
            this._tabs();
            this._checkWidth();
            this._switchDisplay();

        },
        _scrollToTop: function() {
            var headerFixed = $(".header");
            $(window).scroll(function() {
                var topPos = $(this).scrollTop();
                if (topPos > 20 && $(this).width() > 768) {
                    $(headerFixed).addClass('fixed');
                } else {
                    $(headerFixed).removeClass('fixed');
                }
                if ($('#search').length > 0 && !$('#search').hasClass('fixedInTop')) {
                    if (topPos > 200 && $(this).width() > 768) {

                        $('#search').addClass('fixed');
                    } else {
                        $('#search').removeClass('fixed');
                    }
                }
                if (topPos > 100) {
                    $('#scrollTop').addClass('show')
                } else {
                    $('#scrollTop').removeClass('show')
                }
            });
            $('#scrollTop').on('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            $('.searchHeader').on('click', function() {
                var search = $('#search');
                var header = $('.header');
                $('.header__center').removeClass('open');
                $('.menuBurger').removeClass('open');
                if (!$(search).hasClass('open')) {
                    $(search).addClass('open');
                    $(header).addClass('open');
                    // $('.header').removeClass('fixed');
                } else {
                    $(search).removeClass('open');
                    $(header).removeClass('open');
                    // $('.header').addClass('fixed');
                }
            })
            $('#showvideo').click(function(e) {
                e.preventDefault();
                $('#wrapperVideo').addClass('open');
                $('#wrapperVideo').html('<iframe id="video" width="420" height="315" src="//www.youtube.com/embed/aS3DPglji0o?rel=0" frameborder="0" allowfullscreen></iframe>');
            });
        },
        _menuBurger: function() {
            $(".menuBurger").click(function() {
                $(this).toggleClass("open");
                $(".header__center").toggleClass("open");
                $('#search').removeClass("open");
            });
        },
        _menuMobile: function() {
            $(window).resize(function() {
                if ($(window).width() < 767) {
                    $('.global').prepend($('.header__center'));
                    $('.header').append($('#search'));
                }
            })
        },
        _swiper: function() {
            if ($(".mySwiper").length > 0) {
                var swiper = new Swiper(".mySwiper", {
                    slidesPerView: 1,
                    watchOverflow: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                });
            }
            if ($(".swiperCity").length > 0) {
                var swiper1 = new Swiper(".swiperCity", {
                    slidesPerView: 5,
                    centeredSlides: false,
                    spaceBetween: 15,
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        375: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 40
                        },
                        640: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 4,
                            centeredSlides: false,
                        },
                    },
                });
            }
            if ($(".marque__list").length > 0) {
                var swiper2 = new Swiper(".marque__list", {
                    slidesPerView: 5,
                    centeredSlides: false,
                    spaceBetween: 15,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    breakpoints: {
                        560: {
                            slidesPerView: 1,
                            centeredSlides: false,
                        },
                        767: {
                            slidesPerView: 2,
                            centeredSlides: false,
                        },
                        1023: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                    },
                });
            }

        },
        _cloneHeader: function() {
            var $header = $(".header").outerHeight();
            var $newHader = $('<div class="cloneHeader"></div>');
            $newHader.height($header);
            if ($('.global').length > 0) {
                $(".global").prepend($newHader);
            } else {
                $("body").prepend($newHader);
            }
        },
        _selectBox: function() {
            if ($(".selectBox").length > 0) {
                $(".selectBox").selectBox({
                    mobile: true,
                    menuSpeed: "fast",
                });
            }
        },
        _fancybox: function() {
            if ($('.pswp-gallery').length > 0) {
                Fancybox.bind("[data-fancybox]", {});
            }
        },
        _tabs: function() {
            if ($('.right-part__wrapper--tabs').length > 0) {
                $('.right-part__wrapper--tabs ul li').click(function() {
                    var tab_id = $(this).attr('data-tab');

                    $('.right-part__wrapper--tabs ul li').removeClass('current');
                    $('.right-part__wrapper--tabsContent .tabsContent').removeClass('current');

                    $(this).addClass('current');
                    $("#" + tab_id).addClass('current');
                })
            }
            if ($('ul.wrapper-search__tabs').length > 0) {
                $('ul.wrapper-search__tabs li').on('click', function() {
                    var tab_id = $(this).attr('data-tab');
                    var _this = $(this);
                    $('ul.wrapper-search__tabs li').removeClass('current');
                    $('.wrapper-search__tab-content').removeClass('current');
                    $(this).addClass('current');
                    $("#" + tab_id).addClass('current');
                    if ($('#view-card-list').hasClass('current')) {
                        $('.wrapper-search__header').addClass('fixed');
                    } else {
                        $('.wrapper-search__header').removeClass('fixed');
                    }
                    if ($('#view-card').hasClass('current')) {
                        $('.wrapper-search__header').addClass('fixed-card');
                    } else {
                        $('.wrapper-search__header').removeClass('fixed-card');
                    }
                })
            }

            /*******Tabs detail biens*******/
            $('.tabs__list--menu li').click(function() {
                var tab_id = $(this).attr('data-tab');

                $('.tabs__list--menu li').removeClass('current');
                $('.tab-content').removeClass('current');

                $(this).addClass('current');
                $("#" + tab_id).addClass('current');
            })
        },
        _checkWidth: function() {
            if ($('#tab3 .list-items').length > 0) {
                var windowSize = $(window).width();
                if (windowSize > 991) {
                    $('#tab3 .list-items').jScrollPane({
                        verticalDragMinHeight: 300,
                        verticalDragMaxHeight: 300,
                        autoReinitialise: true
                    });
                }
            }
        },
        _switchDisplay: function() {
            $('.icon__row-horizontal').on('click', function() {
                $(this).addClass('current');
                $('.icon__row-vertical').removeClass('current');
                $('.gallery_display_detail').removeClass('flex-column');
            })
            $('.icon__row-vertical').on('click', function() {
                $(this).addClass('current');
                $('.icon__row-horizontal').removeClass('current');
                $('.gallery_display_detail').addClass('flex-column');
            })
            $('.moreOption,.icon__arrow-circle-down').on('click', function() {
                $('.tooltipMAdmoune').hasClass('actions') ? $(this).next('.actions').toggleClass('open') : $(this).next('.tooltipMAdmoune').toggleClass('open');
            })
            $('.tableWithScroll .moreOption').on('click', function() {
                console.log($(this).offset().top);
                $('.tooltipMAdmoune.actions').toggleClass('open').css({top : $(this).offset().top, left : $(this).offset().left});
            })
            $('#switchWithAdvance').on('click', function() {
                if ($(this).is(':checked')) {
                  $(this).parents('.switch').next('.d-none').removeClass('d-none').addClass('d-block')
                } else {
                    $(this).parents('.switch').next('.d-block').removeClass('d-block').addClass('d-none')
                }
            })
            var lastScrollTop = 0;
            $('.scrollTable').on('click', function() {
                step = 200;
                var w = $('.tableWithScroll').width();
                var t = $('.tableWithScroll .main-table').innerWidth();
                var offset = $('.tableWithScroll .main-table').offset();
                console.log(t); 
                $(".tableWithScroll").stop().animate({ scrollLeft: '+='+ step }, 1000);
                // console.log(t);
                // console.log(offset.left + t);
                // console.log(lastScrollTop)
                // if (offset.left < lastScrollTop) {
                //     $(".tableWithScroll").stop().animate({ scrollLeft: '+='+ step }, 1000);
                // } else {
                //     $(".tableWithScroll").stop().animate({ scrollLeft: '-='+ step }, 1000);
                // }
                lastScrollTop += offset.left;
                console.log(lastScrollTop + t)
            })
            $('#switchMezzanine').on('click', function() {
                if ($(this).is(':checked')) {
                  $(this).parents('.switch').next('.d-none').removeClass('d-none').addClass('d-block')
                } else {
                    $(this).parents('.switch').next('.d-block').removeClass('d-block').addClass('d-none')
                }
            })
            $('#switchDispose').on('click', function() {
                if ($(this).is(':checked')) {
                  $(this).parents('.form-switch').next('.d-none').removeClass('d-none').addClass('d-block')
                } else {
                    $(this).parents('.form-switch').next('.d-block').removeClass('d-block').addClass('d-none')
                }
            })
            $('#switchDisposeHangar').on('click', function() {
                if ($(this).is(':checked')) {
                  $(this).parents('.switch').next('.d-none').removeClass('d-none').addClass('d-block')
                } else {
                    $(this).parents('.switch').next('.d-block').removeClass('d-block').addClass('d-none')
                }
            });
            $('#selectTypeToChange').on('click',()=> {
                window.location = 'http://127.0.0.1:5500/dist/b202-appartement.html'
            })
            $('#btnInscription').on('click',()=> {
                $('#wrapperInscrpition').show();
                $('#wrapperLogin').hide();
            })
            $('#btnLogin').on('click',()=> {
                $('#wrapperInscrpition').hide();
                $('#wrapperLogin').show();
            })
            $('.wrapperProfil__tabs li').on('click',function(){
                var tab_id = $(this).attr('data-tab');
        
                $('.wrapperProfil__tabs li').removeClass('current');
                $('.wrapperProfil__tab-content').removeClass('current');
        
                $(this).addClass('current');
                $("#"+tab_id).addClass('current');
            })
        }
    };
    $(document).ready(function() {
        $noodraApp.init();
        AOS.init();
        // if ($('#flexSwitchCheckChecked').length > 0 && $('#flexSwitchCheckChecked').is(':checked')) {
        //     $('#flexSwitchCheckChecked').parents('.switch').next('.d-none').removeClass('d-none').addClass('d-block')
        // }
        if ($('#switchWithAdvance').length > 0 && $('#switchWithAdvance').is(':checked')) {
            $('#switchWithAdvance').parents('.switch').next('.d-none').removeClass('d-none').addClass('d-block')
        }
        
        if ($('#switchMezzanine').length > 0 && $('#switchMezzanine').is(':checked')) {
            $('#switchMezzanine').parents('.switch').next('.d-none').removeClass('d-none').addClass('d-block')
        }
        if ($(window).width() < 767) {
            $('.global').prepend($('.header__center'));
            $('.header').append($('#search'));
        }
        // $('.global').hide();

        // setTimeout(() => {
        //     $('.global').show();
        //     $('.showInFirst').hide();
        // }, 4000);
    });
})(jQuery);