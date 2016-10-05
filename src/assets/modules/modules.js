import $ from 'jquery';
import './modules.scss';
import './accordion';

require('./accordion')
require('./product-delivery')
require('./product-size-style')
require('./product-color-change')

$(document).ready(() => {
  $('.js-accordion').accordion();
  $('.product-option--color .product-option__select').colorChange();
});
