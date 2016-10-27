import './lib.scss';
import 'slick-carousel';

import $ from 'jquery';

window.jQuery = $;

$('document').ready(function () {
  $('.product__image--carousel').slick({
    lazyLoad: 'progressive',
    // lazyLoad: 'ondemand', // could save bandwidth, but seems buggy
    dots: true,
    dotsClass: 'product__image--carousel__dots',
    appendDots: '.product__image',
    arrows: false
  });
});
