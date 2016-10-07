import $ from 'jquery';
import './modules.scss';
import './accordion';

require('./accordion')
require('./product-size-style')
require('./product-delivery-update')
require('./product-added-confirmation')
require('./product-color-change')

$(document).ready(() => {
  $('.js-accordion').accordion();
  $('.product-option--size .product-option__select').sizeStyle();
  $('.product-delivery').deliveryUpdate();
  $('.product-option--color .product-option__select').colorChange();
  $('.btn--add-to-bag').addedConfirmation();
});
