/**
 * Functionality specifically related to PDP
 * @module notify-me
 */

import $ from 'jquery'

import addOption from './add-option-link'
import applyParams from './apply-params'

/**
 * List of functions to run for page setup
 */
export default function notifyMe() {
  const page = getPage();

  // add option links to mock page footer
  addOption('One Size', 'product-options.one-size');
  if (page === 'special-order.html') {
    addOption('Special Order Unavailable', 'product-options.one-size&unavailable');
  }

  // apply new templates
  applyParams('product-options.one-size', updateSize);

  // apply variations to those templates
  applyParams('unavailable', updateToUnavailable);

  // apply mock hacks
  setupSizes();
}

/**
 * Make assumptions about what sizes are in dropdown based on what page we on
 * That's because you can only get to each page based on certain sizes being available
 * So here we update the sizes based on the page
 */
const setupSizes = () => {
  const $sizeEls = $('.notify-me').find('.product-size__select, .product-size__one');
  let len = $sizeEls.length;

  while (len--) {
    const el = $sizeEls[len];
    const chosen = el.options ? el.options[0] : el;
    chosen.setAttribute('data-oos', 'true');
  }
};

/**
 * Helper function to get the page we're on
 */
const getPage = () => document.location.pathname.replace('/site/','');

/**
 * Callback to upate size dropdown, based on selected option
 */
function updateToUnavailable() {
  const $sizeEls = $('.notify-me').find('.product-size__select, .product-size__one');
  let len = $sizeEls.length;

  while (len--) {
    const el = $sizeEls[len];
    const chosen = el.options ? el.options[0] : el;
    chosen.setAttribute('data-unavailable', 'true');
  }
}

/**
 * Callback to upate size dropdown, based on selected option
 */
function updateSize( opt ) {
  var el = document.getElementsByClassName('product-size')[0];

  // replace the existing product option
  el.outerHTML = opt.html;
}
