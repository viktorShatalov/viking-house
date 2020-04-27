jQuery(document).ready(function () {

    // Preloader 

    // function preloader() {
    //     var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    //     var preloader = jQuery('#preloader');
    //     if (!isMobile) {
    //         setTimeout(function () {
    //             preloader.addClass('preloaded');
    //         }, 350);
    //         setTimeout(function () {
    //             preloader.remove();
    //         }, 1500);
    //     } else {
    //         preloader.remove();
    //     }
    // }
    // preloader()

    // not-active menu
    jQuery('a[aria-current="page"]').on('click', function () {
        return false;
    });

    //  mobile-menu

    jQuery('.burger').click(function () {
        jQuery('.burger,.navbar').toggleClass('active');
        jQuery('html,body').toggleClass('lock');
    })

    // tabs+slider

    jQuery('.js-tab-trigger').click(function () {
        var id = jQuery(this).attr('data-tab'),
            content = jQuery('.js-tab-content[data-tab="' + id + '"]');

        jQuery('.js-tab-trigger.active').removeClass('active');
        jQuery(this).addClass('active');

        jQuery('.js-tab-content.active').removeClass('active');
        content.addClass('active');
    });

    // sliders

    jQuery('#tab__slider-1,#tab__slider-2,#tab__slider-3,#slider').slick({
        arrows: false,
        dots: true,
        infinite: false,
        lazyLoad: "progressive",
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: false,
        autoplaySpeed: 2200,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            }
        ]
    });

    jQuery('.reviews__slider').slick({
        arrows: true,
        dots: false,
        infinite: true,
        lazyLoad: "progressive",
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                }
            }
        ]
    });
    // card-product slider
    jQuery('.slider-for,.slider-for_modal').slick({
        arrows: true,
        dots: false,
        infinite: true,
        autoplay: false,
        lazyLoad: "progressive",
        asNavFor: '.slider-nav',
        fade: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                }
            }
        ]
    });


    jQuery('.slider-nav,.slider-nav_modal').slick({
        arrows: true,
        dots: false,
        lazyLoad: "progressive",
        asNavFor: '.slider-for',
        slidesToShow: 3,
        infinite: false,
        autoplay: false,
        focusOnSelect: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: '0',
                }
            }
        ]
    });


    // rangeslider

    let slider = document.getElementById("myRange");
    let outputRange = document.querySelector('.building__area-totall')

    outputRange.innerHTML = slider.value;

    slider.oninput = function () {
        outputRange.innerHTML = this.value;
    }

})
