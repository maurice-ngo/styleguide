import $ from 'jquery';
import 'slick-carousel';

import './modules.scss';
import './accordion';
import './product-size-change';
import './product-add-to-bag';
import './product-color-change';
import './product-oos';

$(document).ready(() => {
  $('.product__image--carousel').slick({
    lazyLoad: 'progressive',
    // lazyLoad: 'ondemand', // could save bandwidth, but seems buggy
    dots: true,
    dotsClass: 'product__image--carousel__dots',
    appendDots: '.product__image',
    arrows: false
  });
  $('.js-accordion').accordion();
  $('.product-option--size .product-option__select').sizeChange();
  $('.product-option--color .product-option__select').colorChange();
  $('.btn--add-to-bag').addToBag();
  $('.product-option--oos').oosProduct();
  $('.revolve-me__carousel').slick({
    lazyLoad: 'progressive',
    //adaptiveHeight: true,
    variableWidth: true,
    arrows: false
  });
});
