import $ from 'jquery';
import './modules.scss';
import './accordion';

require('./accordion')
require('./product-delivery-update')
require('./product-size-style')
require('./product-color-change')

$(document).ready(() => {
  $('.js-accordion').accordion();
  $('.product-delivery').deliveryUpdate();
  $('.product-option--color .product-option__select').colorChange();
});
