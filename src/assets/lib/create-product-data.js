/**
 * Creates an object including all relevant data for a product
 * Also allows for updates when a new option is chosen
 * @module createProductData
 */

import $ from 'jquery';

const PRICE_ATTR = 'data-price';
const REGULAR_PRICE_ATTR = 'data-regular-price';
const DEFAULT_OPTIONS = {
  wrapBlockClass: 'product',
};

/**
 * Creates a javascript object containing product data
 * @param {jQueryElement} sizeEl - The size element (select, input, etc)
 * @param {String} options.wrapBlockClass - Class of wrap HTML Element
 # @return {Object} Contains relevant data to a product
 */
export default function createProductData(sizeEl, opts = {}) {
  const { wrapBlockClass } = Object.assign({}, DEFAULT_OPTIONS, opts);
  const $wrap = $(sizeEl).closest(`.${wrapBlockClass}`);

  // whether input or select, find the chosen element
  const { options, selectedIndex } = sizeEl;
  const chosen = options ? options[selectedIndex] : sizeEl;
  const defaultOption = options ? options[0] : chosen;
  const regularPrice = defaultOption.getAttribute(REGULAR_PRICE_ATTR) || defaultOption.getAttribute(PRICE_ATTR);

  // instantiate object, adding properties that apply to the whole dropdown
  const product = {
    // DOM references
    wrap: $wrap[0],
    wrapBlockClass,
    sizeEl,
    // product info
    regularPrice,
    chosen: {},
    // useful booleans
    oneSize: !options,
    allInStock: options ? !any(options, hasAttr, 'data-oos') : !hasAttr(chosen, 'data-oos'),
    allPreorder: options ? all(options, hasAttr, 'data-preorder') : hasAttr(chosen, 'data-preorder'),
    allOnSale: options ? all(options, isOnSale, regularPrice) : isOnSale(chosen, regularPrice),
  };

  updateChosenData(product, chosen);

  return product;
};

/**
 * Updates product data object whenever chosen option is changed
 * @param {Object} product - The product's data object
 * @param {HTMLElement} chosen - The chosen option
 */
export const updateChosenData = (product, chosen) => {
  const { regularPrice } = product;
  const price = getAttr(chosen, 'price') || regularPrice;
  product.chosen = {
    el: chosen,
    'delivery-date': getAttr(chosen, 'delivery-date'),
    'sample-defect': getAttr(chosen, 'sample-defect'),
    'final-sale': getAttr(chosen, 'final-sale'),
    'one-left': getAttr(chosen, 'one-left'),
    preorder: getAttr(chosen, 'preorder'),
    oos: getAttr(chosen, 'oos'),
    price,
    isOnSale: parseFloat(price) < parseFloat(regularPrice),
    value: chosen.value || '',
  };
};

/**
 * Helper function to determine if an option has an attr
 * @param {HTMLElement} option - The select option element
 * @param {String} attr - The attribute we're checking for
 */
const hasAttr = (option, attr) => {
  return !!(option.getAttribute(attr)
         && option.getAttribute(attr) !== 'false')
};

/**
 * Helper function to determine if any options have an attr
 * @param {HTMLElements} options - List of select options
 * @param {Function} comparison - Callback function to evaluate the comparison
 * @param {String} attr - The attribute we're comparing
 * @return {Boolean} Whether comparison was successful on any options
 */
const any = (options, comparison, attr) => {
  let len = options.length;

  while (len--) {
    const option = options[len];
    if (option.value !== 'unavailable'
     && comparison(option, attr)) {
      return true;
    }
  }
  return false;
};

/**
 * Helper function to determine if all options have an attr
 * @param {HTMLElements} options - List of select options
 * @param {Function} comparison - Callback function to evaluate the comparison
 * @param {String} attr - The attribute we're comparing
 * @return {Boolean} Whether comparison was successful on all options
 */
const all = (options, comparison, attr) => {
  let len = options.length;

  while (len--) {
    const option = options[len];
    if (option.value !== 'unavailable'
     && !comparison(option, attr)) {
      return false;
    }
  }
  return true;
};

/**
 * Helper function to determine if option is on sale
 * @param {HTMLElement} option - Option for which we're comparing price
 * @param {String} regularPrice - The item's regular price
 * @return {Boolean} Whether price is less than regualarPrice
 */
const isOnSale = (option, regularPrice) => {
  const price = option.getAttribute(PRICE_ATTR);

  return parseFloat(price) < parseFloat(regularPrice);
};

/**
 * Helper function to get product data attributes
 * @param {HTMLElement} option - The select option element
 * @param {String} attr - The attribute we're checking for
 * @return {String|Boolean} The attribute value (or existence)
 */
const getAttr = (option, attr) => {
  const val = option.getAttribute(`data-${attr}`) || false;
  return (val && val !== 'false') ? (val === 'true') || val || true : false;
};
