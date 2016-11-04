/**
 * Functionality specifically related to PDP
 * @module pdp
 */

import $ from 'jquery'

import addOption from './option'

/**
 * List of functions to run for page setup
 */
export default function pdp() {
  addOption('Wedding Badge', 'badges.wedding', addBadge);
  addOption('Product Badge', 'badges.product', addBadge);
  addOption('Out of Stock', 'product-options.out-of-stock', updateSize);
  addOption('One Color', 'product-options.one-color', updateColor);
  addOption('One Size', 'product-options.one-size', updateSize);

  changeColorValues();
  muteLinks(document.getElementsByClassName('product-recs__link'));
}

/**
 * This is a mock page, and other product pages don't exist, so this hack...
 */
const muteLinks = links => {
  const uri = document.location.href;
  let i = links.length;

  while (i--) {
    links[i].setAttribute('href', uri);
  }
};

/**
 * This is a mock page, and other color pages don't exist, so this hack...
 */
const changeColorValues = () => {
  const select = document.getElementById('color');
  const options = select.getElementsByTagName('option');
  let opt, len = options.length;

  while (len--) {
    opt = options[len];
    opt.setAttribute('data-value', opt.getAttribute('value'));
    opt.setAttribute('value', document.location.href);
  }
};

/**
 * Callback to add badge template to product images when option is selected
 */
function addBadge( opt ) {
  const target = document.querySelector('.product__image');

  // add badge
  target.insertAdjacentHTML('beforeend', opt.html);
}

/**
 * Callback to upate color dropdown, based on selected option
 */
function updateColor( opt ) {
  updateProductOption('color', opt.html);
}

/**
 * Callback to upate size dropdown, based on selected option
 */
function updateSize( opt ) {
  updateProductOption('size', opt.html);
}

/**
 * Helper function to update size & color product options
 */
function updateProductOption( element, template ) {
  var option = document.getElementsByClassName('product-option--' + element)[0];

  // replace the existing product option
  option.outerHTML = template;
}
