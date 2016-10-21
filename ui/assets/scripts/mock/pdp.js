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
  const target = document.querySelector('.product-image-carousel');

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

/*
// callback to update price
function updatePrice(id) {
var price = document.getElementsByClassName('price')[0];

price.outerHTML = document.getElementById(id).innerHTML;
}


// callback to add product notification template to html
function addProductNotification(id) {
var btn = document.getElementsByClassName('btn--add-to-bag')[0];
var msg = document.getElementById(id).innerHTML;

// add notification
btn.insertAdjacentHTML('beforebegin', msg);
}

function overrideCTAButton(el) {
function updateCTAText(text) {
return function() {
el.textContent = text;
};
}

mock.applyParams({
'product-notifications.preorder': updateCTAText('Preorder This Item'),
'product-options.out-of-stock': updateCTAText('Notify Me / Special Order')
});
}

function overrideDeliveryOptions(el) {
mock.applyParams({
'product-notifications.preorder': function() {
el.classList.add('u-error');
},
'product-options.out-of-stock': function() {
el.parentNode.removeChild(el);
}
});
}

function overridePrice(el) {
function replacePriceWithTemplate(templateSelector) {
return function() {
var priceEl = document.createElement('div');
priceEl.innerHTML = document.querySelector(templateSelector).innerHTML;
el.parentNode.replaceChild(priceEl.firstChild.nextSibling, el);
};
}

mock.applyParams({
'badges.final-sale': replacePriceWithTemplate('#price-on-sale'),
'product-notifications.final-sale': replacePriceWithTemplate('#price-on-sale'),
'product-notifications.final-sale-sample-defect': replacePriceWithTemplate('#price-on-sale')
});
}

function overrideSize(selectEl) {
function setOptionByIndex(i) {
return function() {
var evt = new Event('change');
selectEl.selectedIndex = i;
selectEl.dispatchEvent(evt);
};
}

mock.applyParams({
'product-options.one-color': setOptionByIndex(1),
'product-notifications.final-sale-sample-defect': setOptionByIndex(1)
});
}

overrideDeliveryOptions(document.querySelector('.product-delivery'));
overrideCTAButton(document.querySelector('.btn--add-to-bag'));
overridePrice(document.querySelector('.price'));
overrideSize(document.querySelector('#size'));
*/
