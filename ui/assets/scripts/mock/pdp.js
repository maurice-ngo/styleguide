/**
 * Functionality specifically related to PDP
 * @module pdp
 */

import $ from 'jquery'

import addOption from './add-option-link'
import applyParams from './apply-params'

/**
 * List of functions to run for page setup
 */
export default function pdp() {
  // add option links to mock page footer
  addOption('Wedding Badge', 'badges.wedding');
  addOption('Product Badge', 'badges.product');
  addOption('Out of Stock', 'product-options.out-of-stock');
  addOption('Out of Stock, On Sale', 'product-options.out-of-stock&on-sale');
  addOption('One Color', 'product-options.one-color');
  addOption('One Size', 'product-options.one-size');

  // apply new templates
  applyParams('badges.wedding', addBadge);
  applyParams('badges.product', addBadge);
  applyParams('product-options.out-of-stock', updateSize);
  applyParams('product-options.one-color', updateColor);
  applyParams('product-options.one-size', updateSize);

  // apply variations to those templates
  applyParams('on-sale', updatePriceToSale);

  // apply mock hacks
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
  let len = options.length;

  while (len--) {
    const opt = options[len];
    opt.setAttribute('data-href-original', opt.getAttribute('data-href'));
    opt.setAttribute('data-href', document.location.href);
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
 * Callback to upate price to sale
 */
function updatePriceToSale( opt ) {
  const oneSize = document.querySelector('span.product-option__select--one');
  const price = oneSize.getAttribute('data-price');
  const salePrice = parseFloat(price)/2 + '';

  // update price to sale
  oneSize.setAttribute('data-regular-price', price);
  oneSize.setAttribute('data-price', salePrice);
}

/**
 * Helper function to update size & color product options
 */
function updateProductOption( element, template ) {
  var option = document.getElementsByClassName('product-option--' + element)[0];

  // replace the existing product option
  option.outerHTML = template;
}
