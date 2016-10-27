/**
 * Functionality specifically related to PDP
 * @module pdp
 */

import Option from './option'

/**
 * List of functions to run for page setup
 */
export default function pdp() {
  new Option('Wedding Badge', 'badges.wedding', addBadge);
  new Option('Product Badge', 'badges.product', addBadge);
  new Option('Out of Stock', 'product-options.out-of-stock', updateSize);
  new Option('One Color', 'product-options.one-color', updateColor);
  new Option('One Size', 'product-options.one-size', updateSize);

  changeColorValues();
}

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
function addBadge( ) {
  const target = document.querySelector('.product__image');

  // add badge
  target.insertAdjacentHTML('beforeend', this.html);
}

/**
 * Callback to upate color dropdown, based on selected option
 */
function updateColor( ) {
  updateProductOption('color', this.html);
}

/**
 * Callback to upate size dropdown, based on selected option
 */
function updateSize( ) {
  updateProductOption('size', this.html);
}

/**
 * Helper function to update size & color product options
 */
function updateProductOption( element, template ) {
  var option = document.getElementsByClassName('product-option--' + element)[0];

  // replace the existing product option
  option.outerHTML = template;
}
