'use strict';
$(document).ready(function () {
    $('#first').css('height', document.documentElement.clientHeight);

    let firstYMarker = 1 / 4 * $('#scroll-context').outerHeight();
    let secondYMarker = 2 / 4 * $('#scroll-context').outerHeight();

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
        } else if (window.pageYOffset > firstYMarker && window.pageYOffset <= secondYMarker) {
            cardslider.changeCardTo(1);
        } else if (window.pageYOffset > secondYMarker) {
            cardslider.changeCardTo(2);
        }
    });
});