'use strict';
$(document).ready(function () {
    let pageHeaderBlog = document.getElementsByClassName('page-header--blog');

    $(window).scroll(function () {
        if ((window.pageYOffset) >= 200) {
            $(pageHeaderBlog).addClass('white');
        } else {
            $(pageHeaderBlog).removeClass('white');
        }
    });

    let asideNavItem = $('.aside-nav__list li');
    asideNavItem = Array.prototype.slice.call(asideNavItem);
    console.log(asideNavItem);
    asideNavItem.forEach(function (item) {
        $(item).click(function (event) {
            event.stopPropagation();
            event.target.classList.toggle("active");
        });
    });
});