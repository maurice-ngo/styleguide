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
    dots: true,
    dotsClass: 'product__image--carousel__dots',
    appendDots: '.product__image',
    arrows: false
  });
  $('.js-accordion').accordion();
  $('.product__option--size .product__option-select').sizeChange();
  $('.product__option--color .product__option-select').colorChange();
  $('.btn--add-to-bag').addToBag();
  $('.product-option--oos').oosProduct();
});
