import $ from 'jquery';
import 'slick-carousel';

import './modules.scss';
import './accordion';
import './product-size-change';
import './product-add-to-bag';
import './product-color-change';
import './product-oos';

$(document).ready(() => {
  $('.js-accordion').accordion();

  const $product = $('.product');

  $product.find('.image-carousel').slick({
    lazyLoad: 'progressive',
    dots: true,
    dotsClass: 'image-carousel__dots',
    appendDots: '.product__image',
    arrows: false,
    infinite: false,
  });
  $product.find('.product-size__select', '.product-size_one').sizeChange().trigger('change');
  $product.find('.product-color__select').colorChange();
  $product.find('.product__cta button[type="submit"]').addToBag();
  $product.find('.product-size__oos').oosProduct({ $wrap: this });
});
