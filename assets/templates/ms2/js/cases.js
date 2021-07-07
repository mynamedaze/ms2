'use strict';
$(document).ready(function () {
    let pageHeaderCases = document.getElementsByClassName('page-header--cases');

    $(window).scroll(function () {
        if ((window.pageYOffset) >= 200) {
            $(pageHeaderCases).addClass('white');
        } else {
            $(pageHeaderCases).removeClass('white');
        }
    });

    let casesItemButton = document.getElementsByClassName('cases__item-button');
    casesItemButton = Array.prototype.slice.call(casesItemButton);
    let caseName = document.getElementById('same-case-popup-case');

    let sameCasePopup = document.getElementsByClassName('same-case-popup');

    casesItemButton.forEach(function (item, index) {
       $(item).click(function () {
           $('.overlay').fadeIn(300);
           $(caseName).val($(item).val());
           setTimeout(function () {
               $(sameCasePopup).fadeIn(300);
           }, 300);
       });
    });

    let sameCasePopupForm = $('#same-case-popup-form');

    sameCasePopupForm.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/cases/ms2-mail.php',
            data: popupCallbackForm.serialize(),
            success: function (data) {
                $(callbackPopupInputName).val('');
                $(callbackPopupInputPhone).val('');
                $(popupCallback).fadeOut(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('context_callback');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
});