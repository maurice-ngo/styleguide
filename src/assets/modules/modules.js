import $ from 'jquery';

import './modules.scss';
import './accordion';
import './product-size-change';
import './product-added-confirmation';
import './product-color-change';
import './product-oos';

$(document).ready(() => {
  $('.js-accordion').accordion();
  $('.product-option--size .product-option__select').sizeChange();
  $('.product-option--color .product-option__select').colorChange();
  $('.btn--add-to-bag').addedConfirmation();
  $('.product-option--oos').oosProduct();
});
