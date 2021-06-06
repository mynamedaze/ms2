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

    let asideNavItem = document.getElementsByClassName('aside-nav__item');
    asideNavItem = Array.prototype.slice.call(asideNavItem);
    console.log(asideNavItem);
    asideNavItem.forEach(function (item) {
        $(item).click(function (event) {
            event.stopPropagation();
            event.target.classList.toggle("active");
        });
    });
});