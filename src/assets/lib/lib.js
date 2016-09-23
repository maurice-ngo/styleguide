require('./lib.scss')
require('slick-carousel')

window.jQuery = window.$ = require('jquery');

$('document').ready(function () {
  $('.product-image-carousel').slick({
    lazyLoad: 'progressive',
    // lazyLoad: 'ondemand', // could save bandwidth, but seems buggy
    dots: true,
    dotsClass: 'product-image-carousel__dots',
    arrows: false
  });
});
