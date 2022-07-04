import $ from 'jquery';
import Swiper, {Navigation, Pagination, Autoplay} from 'swiper';
import lozad from "lozad";
import 'jquery-validation';
import 'inputmask';

//lazyload
$(function () {
    const observer = lozad();
    observer.observe();
});

//swiper
const swiper = new Swiper('#carousel-swiper', {
    effect: 'slide',
    fadeEffect: {
        crossFade: true
    },
    modules: [Navigation, Pagination, Autoplay],
    loop: false,
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
        999: {
            slidesPerView: 1,
        },
    },
    navigation: {
        nextEl: '.carousel-button-next',
        prevEl: '.carousel-button-prev',
        clickable: true,
    },
    pagination: {
        el: '.carousel-slider-pagination',
        type: 'bullets',
        clickable: true,
    },
});

//show content
function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click',function(e) {
            e.preventDefault();
            $('.tab-content-item-wrapper').eq(i).toggleClass('show');
        })
    })
};

toggleSlide('.more-link');
toggleSlide('.more-link-back');

//tabs
$(function() {
    $('ul.tab-header').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.catalog').find('div.tab-content').removeClass('active').eq($(this).index()).addClass('active');
    });
});

//modals
$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('fast');
});

$('.modal_close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
});


$('.button-buy-catalog').each(function (i) {
    $(this).on('click', function() {
        $('#order .modal_description').text($('.tab-content-title').eq(i).text());
        $('.overlay, #order').fadeIn('fast');
    });
})

//form
function validateForm(form) {
    $(form).validate( {
        rules: {
            f_name: "required",
            f_phone: "required",
            f_email: {
                required: true,
                email: true
            }
        },
        messages: {
            f_name: "Введите корректное имя",
            f_phone: "Введите корректный номер телефона",
            f_email: {
                required: "Поле обязательно",
                email: "Введите свой реальный email"
            }
        },
    });
}

validateForm('#consultation-form');
validateForm('#consultation form');
validateForm('#order form');

//validate inputs
$('input[name=f_phone]').inputmask( {
    mask: '+7 999-999-99-99',
    showMaskOnHover: false
});

$('input[name=f_email]').inputmask( {
    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    showMaskOnHover: false
});

