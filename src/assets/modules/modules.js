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

  $product.find('.product__image--carousel').slick({
    lazyLoad: 'progressive',
    dots: true,
    dotsClass: 'product__image--carousel__dots',
    appendDots: '.product__image',
    arrows: false
  });
  $product.find('product__option--size .product__option-select').sizeChange();
  $product.find('product__option--color .product__option-select').colorChange();
  $product.find('product__cta button[type="submit"]').addToBag();
  $product.find('product-option--oos').oosProduct({ $wrap: $product });
});
