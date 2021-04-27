'use strict';
$(document).ready(function () {
    if (document.documentElement.clientWidth > 767) {
        $('#first').css('height', document.documentElement.clientHeight);

        let firstYMarker = 1 / 4 * $('#scroll-context').outerHeight();
        let secondYMarker = 2 / 4 * $('#scroll-context').outerHeight();

        let introItems = document.getElementsByClassName('intro__item');
        introItems = Array.prototype.slice.call(introItems);

        var cardslider = $('.my-cardslider').cardslider({
            nav: false,
            loop: false,
            dots: false,
            direction:'up'
        }).data('cardslider');

        $(window).scroll(function () {
            if ((window.pageYOffset + document.documentElement.clientHeight) >= $('#scroll-context').outerHeight()) {
                console.log('more');
                $('#first').removeClass('fixed');
            } else {
                console.log('less');
                $('#first').addClass('fixed');
            }

            if (window.pageYOffset <= firstYMarker) {
                cardslider.changeCardTo(0);
                $(introItems[1]).hide();
                $(introItems[2]).hide();
                $(introItems[0]).fadeIn(300);
            } else if (window.pageYOffset > firstYMarker && window.pageYOffset <= secondYMarker) {
                cardslider.changeCardTo(1);
                $(introItems[0]).hide();
                $(introItems[2]).hide();
                $(introItems[1]).fadeIn(300);
            } else if (window.pageYOffset > secondYMarker) {
                cardslider.changeCardTo(2);
                $(introItems[0]).hide();
                $(introItems[1]).hide();
                $(introItems[2]).fadeIn(300);
            }
        });
    }

    if ($('.feedback__list')) {
        let contextFeedbackCarousel = $('.feedback__list').owlCarousel(
            {
                loop:false,
                dots: false,
                margin:10,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1
                    },
                    768:{
                        autoWidth: true,
                        items: 4
                    }
                }
            }
        );
        $('.some-some').click(function () {
            $('.feedback__item').removeClass('disable');
            contextFeedbackCarousel.trigger('refreshed.owl.carousel');
        });
    }
});