'use strict';
$(document).ready(function () {

    let examplesShowMoreBtn = document.getElementsByClassName('examples__show-more-btn');

    $(examplesShowMoreBtn).click(function () {
       $('.examples__item').show();
    });

    if (document.documentElement.clientWidth > 767) {

        function getCoords(elem) { // кроме IE8-
            var box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };

        }

        let storyItem = document.getElementsByClassName('story__item');
        storyItem = Array.prototype.slice.call(storyItem);

        let scrollSite = document.getElementById('scroll-site');
        let story = document.getElementById('story');
        let storyCoordsTop = getCoords(scrollSite);
        storyCoordsTop = storyCoordsTop.top
        console.log(storyCoordsTop);
        $(scrollSite).css('height', document.documentElement.clientHeight * 6);
        $(story).css('height', document.documentElement.clientHeight);
        let storyCoordsBottom = storyCoordsTop + $(scrollSite).outerHeight()
        console.log(storyCoordsBottom);

        if (window.pageYOffset < storyCoordsTop) {
            console.log('start');
            $(story).removeClass('middle');
            $(story).removeClass('end');
        } else if (window.pageYOffset >= storyCoordsTop && window.pageYOffset < storyCoordsBottom) {
            console.log('middle');
            $(story).removeClass('end');
            $(story).addClass('middle');
        } else {
            console.log('end');
            $(story).removeClass('middle');
            $(story).addClass('end');
        }

            $(window).scroll(function () {
            console.log(window.pageYOffset);
            if (window.pageYOffset < storyCoordsTop) {
                console.log('start');
                $(story).removeClass('middle');
                $(story).removeClass('end');
            } else if (window.pageYOffset >= storyCoordsTop && window.pageYOffset + document.documentElement.clientHeight < storyCoordsBottom) {
                console.log('middle');
                $(story).removeClass('end');
                $(story).addClass('middle');
            } else {
                console.log('end');
                $(story).removeClass('middle');
                $(story).addClass('end');
            }

            if (window.pageYOffset >= storyCoordsTop && window.pageYOffset < (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.15)) {
                console.log('first marker');
                $(storyItem).removeClass('active');
                $(storyItem[0]).addClass('active');
            }
            if (window.pageYOffset >= (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.15) && window.pageYOffset < (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.3)) {
                console.log('second marker');
                $(storyItem).removeClass('active');
                $(storyItem[1]).addClass('active');
            }
            if (window.pageYOffset >= (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.3) && window.pageYOffset < (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.45)) {
                console.log('third marker');
                $(storyItem).removeClass('active');
                $(storyItem[2]).addClass('active');
            }
            if (window.pageYOffset >= (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.45) && window.pageYOffset < (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.6)) {
                console.log('fourth marker');
                $(storyItem).removeClass('active');
                $(storyItem[3]).addClass('active');
            }
            if (window.pageYOffset >= (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.6) && window.pageYOffset < (storyCoordsTop + (storyCoordsBottom - storyCoordsTop) * 0.75)) {
                console.log('fifth marker');
                $(storyItem).removeClass('active');
                $(storyItem[4]).addClass('active');
            }
        });
    }

    let simpleForm1 = $('#simple-form-1');

    simpleForm1.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/site/ms2-site-discuss.php',
            data: simpleForm1.serialize(),
            success: function (data) {
                $('#simple-form-name-input-1').val('');
                $('#simple-form-phone-input-1').val('');
                $(overlay).fadeIn(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('site_discuss');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });

    let simpleForm2 = $('#simple-form-2');

    simpleForm2.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/site/ms2-site-order.php',
            data: simpleForm2.serialize(),
            success: function (data) {
                $('#simple-form-name-input-2').val('');
                $('#simple-form-phone-input-2').val('');
                $(overlay).fadeIn(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('site_order');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
});