'use strict';
$(document).ready(function () {
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

    let overlay = document.getElementsByClassName('overlay');
    let popup = document.getElementsByClassName('popup');
    let popupSuccess = document.getElementsByClassName('success-popup');
    let closeBtn = document.getElementsByClassName('close-btn');

    let navBurger = document.getElementsByClassName('page-header__nav-burger');
    let mainNav = document.getElementsByClassName('main-nav');

    let pageHeader = document.getElementsByClassName('page-header');

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

    if (document.documentElement.clientWidth > 767) {
        $('#first').css('height', document.documentElement.clientHeight);

        let firstYMarker = 1 / 5 * $('#scroll-context').outerHeight();
        let secondYMarker = 2 / 5 * $('#scroll-context').outerHeight();

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

            if ((window.pageYOffset) + 50 >= $('#scroll-context').outerHeight()) {
                $(pageHeader).addClass('white');
            } else {
                $(pageHeader).removeClass('white');
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
                margin:16,
                responsiveClass:true,
                nav: true,
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
    /*team*/
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
    /*/team*/

    /*calculator*/
    let calculatorHeadItem = document.getElementsByClassName('calculator__head-item');
    calculatorHeadItem = Array.prototype.slice.call(calculatorHeadItem);

    let stage1 = document.getElementsByClassName('stage1');
    let stage2 = document.getElementsByClassName('stage2');
    let stage3 = document.getElementsByClassName('stage3');

    let budgetLimit;

    //scroll
    $( function() {
        var handle = $( "#custom-handle" );
        $( "#slider" ).slider({
            min: 0,
            max: 200000,
            create: function() {
                handle.text( $( this ).slider( "value" ) );
            },
            slide: function( event, ui ) {
                handle.text( ui.value );
                budgetLimit = ui.value;
            }
        });
    } );

    //stage1
    let stage1Checkbox1 = document.getElementById('stage1-checkbox-1');
    let stage1Checkbox2 = document.getElementById('stage1-checkbox-2');
    let stage1Checkbox3 = document.getElementById('stage1-checkbox-3');

    let stage1Radio = document.getElementsByClassName('stage1__radio');
    stage1Radio = Array.prototype.slice.call(stage1Radio);

    let services = {
        direct: {
            name: 'Яндекс Директ',
            status: 'нет'
        },
        adwords: {
            name: 'Google Adwords',
            status: 'нет'
        },
        nothing: {
            name: 'Пока не знаю',
            status: 'нет'
        }
    };

    let self = "Не выбрано";

    stage1Radio.forEach(function (item, i) {
       $(item).click(function () {
           self = item.value;
           console.log(self);
       });
    });

    $(stage1Checkbox1).click(function () {
        $(stage1Checkbox3).prop('checked', false);
        services.direct.status = 'да';
        services.nothing.status = 'нет';
        console.log(services);
    });

    $(stage1Checkbox2).click(function () {
        $(stage1Checkbox3).prop('checked', false);
        services.adwords.status = 'да';
        services.nothing.status = 'нет';
        console.log(services);
    });

    $(stage1Checkbox3).click(function () {
        $(stage1Checkbox1).prop('checked', false);
        $(stage1Checkbox2).prop('checked', false);
        services.direct.status = 'нет';
        services.adwords.status = 'нет';
        services.nothing.status = 'да';
        console.log(services);
    });

    $('.stage__btn--next-1').click(function () {
        $(stage1).addClass('visually-hidden');
        $(stage2).removeClass('visually-hidden');
        setTimeout(function () {
            $(calculatorHeadItem).removeClass('active');
            $(calculatorHeadItem[1]).addClass('active');
        }, 300);
    });

    //stage2
    let stageInputCity;
    let stageInputActivity;
    let stageInputSite;

    let budget = 'Готов указать';

    let stage2Radio = document.getElementsByClassName('stage2__radio');
    stage2Radio = Array.prototype.slice.call(stage2Radio);

    stage2Radio.forEach(function(item, i) {
        $(item).click(function () {
           budget = item.value;
           console.log(budget);
           if (!i) {
               $('.stage2__scroll-block').show();
           } else {
               $('.stage2__scroll-block').hide();
           }
        });
    });

    $('.stage__btn--next-2').click(function () {
        $(stage2).addClass('visually-hidden');
        $(stage3).removeClass('visually-hidden');
        stageInputCity = $('#stage-input-city').val();
        stageInputActivity = $('#stage-input-activity').val();
        stageInputSite = $('#stage-input-site').val();
        console.log('limit ' + budgetLimit);
        console.log(stageInputCity + ' ' + stageInputActivity + ' ' + stageInputSite);
        if (services.direct.status === 'да') {
            document.getElementById('stage3-price').innerHTML = '20 000 <span class="rub">Р</span> - 25 000 <span class="rub">Р</span>';
        }
        if (services.adwords.status === 'да' || services.nothing.status === 'да') {
            document.getElementById('stage3-price').innerHTML = '30 000 <span class="rub">Р</span> - 35 000 <span class="rub">Р</span>';
        }

        $('#hidden-input-direct').val(services.direct.name + ': ' + services.direct.status);
        $('#hidden-input-adwords').val(services.adwords.name + ': ' + services.adwords.status);
        $('#hidden-input-nothing').val(services.nothing.name + ': ' + services.nothing.status);
        $('#hidden-input-city').val('Регион(ы), в котором вы работаете' + ': ' + stageInputCity);
        $('#hidden-input-activity').val('Ваша ниша' + ': ' + stageInputActivity);
        $('#hidden-input-site').val('Ссылка на ваш сайт' + ': ' + stageInputSite);
        $('#hidden-input-budget').val('Примерный бюджет на рекламу' + ': ' + budget);
        $('#hidden-input-budget-limit').val('Лимит на бюджет' + ': ' + budgetLimit);

        setTimeout(function () {
            $(calculatorHeadItem).removeClass('active');
            $(calculatorHeadItem[2]).addClass('active');
        }, 300);
    });

    $('.stage__btn--prev-2').click(function () {
        $(stage2).addClass('visually-hidden');
        $(stage1).removeClass('visually-hidden');
        setTimeout(function () {
            $(calculatorHeadItem).removeClass('active');
            $(calculatorHeadItem[0]).addClass('active');
        }, 300);
    });

    //stage3

    $('.stage__btn--prev-3').click(function () {
        $(stage3).addClass('visually-hidden');
        $(stage2).removeClass('visually-hidden');
        setTimeout(function () {
            $(calculatorHeadItem).removeClass('active');
            $(calculatorHeadItem[1]).addClass('active');
        }, 300);
    });
    /*/calculator*/

    /* popupCallbackForm */
    let popupCallbackForm = $('#callback-popup-form');

    let callbackPopupInputName = document.getElementById('callback-popup-input-name');
    let callbackPopupInputPhone = document.getElementById('callback-popup-input-phone');

    popupCallbackForm.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/context/mail.php',
            data: popupCallbackForm.serialize(),
            success: function (data) {
                $(callbackPopupInputName).val('');
                $(callbackPopupInputPhone).val('');
                $(popupCallbackForm).fadeOut(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('context_callback');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
    /* */

    /* supportForm */
    let supportForm = $('#support-form');

    let supportInputName = document.getElementById('support-input-name');
    let supportInputPhone = document.getElementById('support-input-phone');

    supportForm.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/context/mail.php',
            data: supportForm.serialize(),
            success: function (data) {
                $(supportInputName).val('');
                $(supportInputPhone).val('');
                $(overlay).fadeIn(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                }, 290);
                yaCounter49417246.reachGoal('context_callback');
                yaCounter49417246.reachGoal('common');
            }
        });
        ev.preventDefault();
    });
    /* */
});