'use strict';
$(document).ready(function () {
    $('#first').css('height', document.documentElement.clientHeight);
    $('#second').css('height', document.documentElement.clientHeight);
    $('#third').css('height', document.documentElement.clientHeight);

    let firstYMarker = 1 / 4 * $('#scroll-context').outerHeight();
    let secondYMarker = 2 / 4 * $('#scroll-context').outerHeight();

    $(window).scroll(function () {
        if ((window.pageYOffset + document.documentElement.clientHeight) >= $('#scroll-context').outerHeight()) {
            console.log('more');
            $('#first').removeClass('fixed');
            $('#second').removeClass('fixed');
            $('#third').removeClass('fixed');
        } else {
            console.log('less');
            $('#first').addClass('fixed');
            $('#second').addClass('fixed');
            $('#third').addClass('fixed');
        }

        if (window.pageYOffset <= firstYMarker) {
            $('#first').fadeIn(300);
            $('#second').fadeOut(300);
            $('#third').fadeOut(300);
        } else if (window.pageYOffset > firstYMarker && window.pageYOffset <= secondYMarker) {
            $('#first').fadeOut(300);
            $('#second').fadeIn(300);
            $('#third').fadeOut(300);
        } else if (window.pageYOffset > secondYMarker) {
            $('#first').fadeOut(300);
            $('#second').fadeOut(300);
            $('#third').fadeIn(300);
        }
    });
});