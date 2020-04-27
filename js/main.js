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


    // calculator

    void function () {
        "use strict";
        const state = {
            "type_of": {
                "type_of_1": 8800,
                "type_of_2": 8000,
                "type_of_3": 8500
            },
            "number_of_storeys": {
                "number_of_storeys_1": 0,
                "number_of_storeys_2": 1000,
            },
            "foundation": {
                "foundation_1": 0,
                "foundation_2": 1500
            },
            "wall__thickness": {
                "p100mm": 0,
                "p150mm": 1000,
                "p200mm": 2000,
            },
            "finish": {
                "without_finish": 0,
                "full_construction": 2500,
            },
            "workers__home": {
                "has": 0,
                "doesnt_have": 18000,
                "not_multiply": true,
            },
        };

        let inputs = document.getElementsByTagName("input");

        Array.from(inputs).forEach(input => {
            input.addEventListener('input', calculate);
        });

        function calculate() {
            let currentInput;
            let multipliedValue = 0;
            let notMultipliedValue = 0;
            const myRangeValue = Number(document.querySelector('#myRange').value);
            document.querySelector('.building__area-total').textContent = myRangeValue;
            const totalPriceNode = document.querySelector('#totalPrice');
            let totalPrice = 0;
            for (let typeOfJobs in state) {
                for (let parameterOfEveryJob in state[typeOfJobs]) {
                    if (parameterOfEveryJob === 'not_multiply') {
                        continue;
                    }
                    currentInput = document.querySelector(`#${parameterOfEveryJob}`);
                    if (!currentInput && parameterOfEveryJob !== "not_multiply") {
                        console.log('id в инпуте: ' + parameterOfEveryJob + ' не найден!');
                        continue;
                    }

                    if (currentInput.type === 'radio' && currentInput.checked) {
                        if (state[typeOfJobs]["not_multiply"] && state[typeOfJobs]["not_multiply"] === true) {
                            notMultipliedValue += state[typeOfJobs][parameterOfEveryJob];
                        } else {
                            multipliedValue += state[typeOfJobs][parameterOfEveryJob];
                        }
                    }
                }
            }
            totalPrice = multipliedValue * myRangeValue + notMultipliedValue;
            totalPriceNode.textContent = `${totalPrice}`;
        }

        calculate();

    }();


})
