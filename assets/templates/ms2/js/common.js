'use strict';
$(document).ready(function () {

    let overlay = document.getElementsByClassName('overlay');
    let popup = document.getElementsByClassName('popup');
    let popupSuccess = document.getElementsByClassName('success-popup');
    let closeBtn = document.getElementsByClassName('close-btn');

    let navBurger = document.getElementsByClassName('page-header__nav-burger');
    let mainNav = document.getElementsByClassName('main-nav');

    let callbackBtn = document.getElementsByClassName('callback-btn');
    let popupCallback = document.getElementsByClassName('callback-popup');

    $(callbackBtn).click(function () {
        $(overlay).fadeIn(300);
        setTimeout(function () {
            $(popupCallback).fadeIn(300);
        }, 300);
    });
    $('.main-nav__callback-btn').click(function () {
        $(mainNav).removeClass('active');
    });

    $(overlay).click(function () {
        $(popup).fadeOut(300);
        $(mainNav).removeClass('active');
        setTimeout(function () {
            $(overlay).fadeOut(300);
        }, 300);
    });

    $(closeBtn).click(function () {
        $(popup).fadeOut(300);
        $(mainNav).removeClass('active');
        setTimeout(function () {
            $(overlay).fadeOut(300);
        }, 100);
    });

    /*nav burger mobile*/

    $(navBurger).click(function () {
        $(overlay).fadeIn(300);
        $(mainNav).addClass('active');
    });
    /*/nav burger mobile*/

    /*fixed menu*/
    let pageHeaderCommon = document.getElementsByClassName('page-header--common');
    let intro = document.getElementsByClassName('intro');

    $(window).scroll(function () {
        if ((window.pageYOffset + 50) >= $(intro).outerHeight()) {
            $(pageHeaderCommon).addClass('white');
        } else {
            $(pageHeaderCommon).removeClass('white');
        }

    });
    /*/fixed menu*/

    /*validate phone*/
    let validatePhone = document.getElementsByClassName('validate-phone');
    validatePhone = Array.prototype.slice.call(validatePhone);
    validatePhone.forEach(function (item, index) {
        $(item).inputmask("+X (999) 999-9999", {
            definitions: {
                "X": {
                    validator: "[7-9]",
                }
            },
            oncomplete: function(){
                $(this).val('+7' + $(this).val().substring(2));
            }
        });
    });
    /*/validate phone*/

    /* popupCallbackForm */
    let popupCallbackForm = $('#callback-popup-form');

    let callbackPopupInputName = document.getElementById('callback-popup-input-name');
    let callbackPopupInputPhone = document.getElementById('callback-popup-input-phone');

    popupCallbackForm.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/context/ms2-mail.php',
            data: popupCallbackForm.serialize(),
            success: function (data) {
                $(callbackPopupInputName).val('');
                $(callbackPopupInputPhone).val('');
                $(popupCallback).fadeOut(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('popup_callback');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
    /* */
    /* aside-consult-desktop*/
    let asideConsultDesktop = $('#aside-consult-form-desktop');

    let asideConsultNameDesktop = document.getElementById('aside-consult-name-desktop');
    let asideConsultPhoneDesktop = document.getElementById('aside-consult-phone-desktop');

    asideConsultDesktop.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/context/ms2-mail.php',
            data: asideConsultDesktop.serialize(),
            success: function (data) {
                $(asideConsultNameDesktop).val('');
                $(asideConsultPhoneDesktop).val('');
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('aside-consult_callback');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
    /* */
    /* aside-consult-desktop*/
    let asideConsultTablet = $('#aside-consult-form-tablet');

    let asideConsultNameTablet = document.getElementById('aside-consult-name-tablet');
    let asideConsultPhoneTablet = document.getElementById('aside-consult-phone-tablet');

    asideConsultTablet.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/context/ms2-mail.php',
            data: asideConsultTablet.serialize(),
            success: function (data) {
                $(asideConsultNameTablet).val('');
                $(asideConsultPhoneTablet).val('');
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('aside-consult_callback');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
    /* */
    /*team*/
    if ($('.team')) {
        let contextTeamCarousel;
        if (document.documentElement.clientWidth < 768) {
            contextTeamCarousel = $('.team__list').owlCarousel(
                {
                    loop:false,
                    dots: false,
                    nav: true,
                    autoWidth: true,
                    items: 4,
                    responsiveClass:true
                }
            );
        }

        $( window ).resize(function() {
            if (document.documentElement.clientWidth < 768) {
                contextTeamCarousel = $('.team__list').owlCarousel(
                    {
                        loop:false,
                        dots: false,
                        nav: true,
                        autoWidth: true,
                        items: 4,
                        responsiveClass:true
                    }
                );
            } else {
                contextTeamCarousel.trigger('destroy.owl.carousel');
            }
        });
    }
    /*/team*/
    /*feedback*/
    if ($('.feedback')) {
        let feedbackPopup = document.getElementsByClassName('feedback__popup');

        let feedbackMoreButton = document.getElementsByClassName('feedback__more-button');
        feedbackMoreButton = Array.prototype.slice.call(feedbackMoreButton);

        let feedbackItemPopup = document.getElementsByClassName('feedback__item--popup');
        feedbackItemPopup = Array.prototype.slice.call(feedbackItemPopup);

        feedbackMoreButton.forEach(function (item,index) {
            $(item).click(function () {
                $(feedbackItemPopup).hide();
                $(feedbackItemPopup[index]).show();
                $(feedbackPopup).css("display", "flex")
                    .hide()
                    .fadeIn();
                $(overlay).fadeIn(300);
                setTimeout(function () {
                    $(feedbackPopup).fadeIn(300);
                }, 300);
            });
        });
    }
    /*/feedback*/
});