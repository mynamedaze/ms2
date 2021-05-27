'use strict';
$(document).ready(function () {
    let pageHeaderSecondary = document.getElementsByClassName('page-header--secondary');

    $(window).scroll(function () {
        if ((window.pageYOffset) >= 200) {
            $(pageHeaderSecondary).addClass('white');
        } else {
            $(pageHeaderSecondary).removeClass('white');
        }
    });
});