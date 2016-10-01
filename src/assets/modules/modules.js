import $ from 'jquery';
import './modules.scss';
import './accordion';

require('./accordion')
require('./estimated-delivery')
require('./size-dropdown-color')

$(document).ready(() => {
  $('.js-accordion').accordion();
});
