import $ from 'jquery';
import './modules.scss';
import './accordion';

require('./accordion')
require('./estimated-delivery')
require('./size-dropdown-color')
require('./product-color-change')

$(document).ready(() => {
  $('.js-accordion').accordion();
  $('.product-option--color .product-option__select').colorChange();
});
