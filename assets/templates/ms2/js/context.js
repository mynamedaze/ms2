'use strict';
$(document).ready(function () {

    let pageHeaderPrimary = document.getElementsByClassName('page-header--primary');

    let stage2DiscountPercent = document.getElementById('stage2-discount-percent');

    let scrollContext = document.getElementById('scroll-context');

    if (document.documentElement.clientWidth > 767) {
        $('#first').css('height', document.documentElement.clientHeight);

        let firstYMarker = 1 / 10 * $(scrollContext).outerHeight();
        let secondYMarker = 2.5/ 10 * $(scrollContext).outerHeight();

        let introItems = document.getElementsByClassName('intro__item');
        introItems = Array.prototype.slice.call(introItems);

        var cardslider = $('.my-cardslider').cardslider({
            nav: false,
            loop: false,
            dots: false,
            direction:'up'
        }).data('cardslider');



        $('#scroll-context').css('height', document.documentElement.clientHeight * 1.8);
        $(window).scroll(function () {
            if ((window.pageYOffset + document.documentElement.clientHeight) >= $(scrollContext).outerHeight()) {
                console.log('more');
                $('#first').removeClass('fixed');
            } else {
                console.log('less');
                $('#first').addClass('fixed');
            }

            if ((window.pageYOffset) + 50 >= $(scrollContext).outerHeight()) {
                $(pageHeaderPrimary).addClass('white');
            } else {
                $(pageHeaderPrimary).removeClass('white');
            }

            if (window.pageYOffset <= firstYMarker) {
                cardslider.changeCardTo(0);
                $(introItems[1]).hide();
                $(introItems[2]).hide();
                $(introItems[0]).show();
            } else if (window.pageYOffset > firstYMarker && window.pageYOffset <= secondYMarker) {
                cardslider.changeCardTo(1);
                $(introItems[0]).hide();
                $(introItems[2]).hide();
                $(introItems[1]).show();
            } else if (window.pageYOffset > secondYMarker) {
                cardslider.changeCardTo(2);
                $(introItems[0]).hide();
                $(introItems[1]).hide();
                $(introItems[2]).show();
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

    /*calculator*/
    let calculatorHeadItem = document.getElementsByClassName('calculator__head-item');
    calculatorHeadItem = Array.prototype.slice.call(calculatorHeadItem);

    let stage1 = document.getElementsByClassName('stage1');
    let stage2 = document.getElementsByClassName('stage2');
    let stage3 = document.getElementsByClassName('stage3');
    let stageFinal = document.getElementsByClassName('stage-final');

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
                if (ui.value < 70000) {
                    $('.stage2__discount-sticker').addClass('disable');
                }
                if (ui.value >= 70000 && ui.value < 100000) {
                    $('.stage2__discount-sticker').removeClass('disable');
                    stage2DiscountPercent.textContent = '10';
                }
                if (ui.value >= 100000 && ui.value < 150000) {
                    $('.stage2__discount-sticker').removeClass('disable');
                    stage2DiscountPercent.textContent = '15';
                }
                if (ui.value >= 150000) {
                    $('.stage2__discount-sticker').removeClass('disable');
                    stage2DiscountPercent.textContent = '20';
                }
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

    let stage3Form = $('#stage3-form');

    let stageInputName = document.getElementById('stage-input-name');
    let stageInputPhone = document.getElementById('stage-input-phone');

    stage3Form.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/context/ms2-mail-calculator.php',
            data: stage3Form.serialize(),
            success: function (data) {
                $(stageInputName).val('');
                $(stageInputPhone).val('');
                $(stage3).addClass('visually-hidden');
                $(stageFinal).removeClass('visually-hidden');
                yaCounter49417246.reachGoal('context_calculator');
                yaCounter49417246.reachGoal('common');
                setTimeout(function () {
                    $(calculatorHeadItem).removeClass('active');
                    $(calculatorHeadItem[3]).addClass('active');
                }, 300);
            }
        });
        ev.preventDefault();
    });
    /*/calculator*/

    /* supportForm */
    let supportForm = $('#support-form');

    let supportInputName = document.getElementById('support-input-name');
    let supportInputPhone = document.getElementById('support-input-phone');

    supportForm.submit(function (ev) {
        $.ajax({
            type: 'POST',
            url: '/assets/mailphp/context/ms2-mail.php',
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