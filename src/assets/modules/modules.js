import $ from 'jquery';
import 'slick-carousel';

import './modules.scss';
import './accordion';
import './toggle-display';
import './product-size-change';
import './product-add-to-bag';
import './product-color-change';
import './product-oos';
import './ui-tabs';
import updateNotifyMe from './notify-me-update';
import './modal';

$(document).ready(() => {
  $('.js-accordion').accordion();
  $('.ui-tabs').tabs();
  $('.js-toggle-display').toggleDisplay();
  $(".js-modal").modal();

  const $product = $('.product');

  $product.find('.image-carousel').slick({
    lazyLoad: 'progressive',
    dots: true,
    dotsClass: 'image-carousel__dots',
    appendDots: '.product__image',
    arrows: false,
    infinite: false,
  });

  $product.find('.product-size__select, .product-size__one').sizeChange().trigger('change');
  $product.find('.product-color__select').colorChange();
  $product.find('.product__cta button[type="submit"]').addToBag();
  $product.find('.product-size__oos').oosProduct();

  const notifyMeClass = 'notify-me';

  $(`.${notifyMeClass}`).find('.product-size__select, .product-size__one')
    .sizeChange({ wrapBlockClass: notifyMeClass, update: updateNotifyMe })
    .trigger('change');
});
