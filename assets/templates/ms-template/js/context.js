'use strict';
$(document).ready(function () {

    let overlay = document.getElementsByClassName('overlay');
    let popup = document.getElementsByClassName('popup');
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
            }
        });
    } );
    /*/calculator*/
});