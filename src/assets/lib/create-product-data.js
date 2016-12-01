/**
 * Creates an object including all relevant data for a product
 * Also allows for updates when a new option is chosen
 * @module createProductData
 */

import { PRODUCT_BLOCK_CLASS, SIZE_ELEMENT_CLASS, SELECT_ELEMENT_CLASS } from '../modules/product-size-change';
import { PRICE_ATTR, REGULAR_PRICE_ATTR } from '../modules/product-price-update';

/**
 * Creates a javascript object containing product data
 * @param {jQueryElement} $wrap - The .product wrap
 # @return {Object} Contains relevant data to a product
 */
export default function createProductData($wrap) {
  const sizeEl = $wrap.find(`.${SIZE_ELEMENT_CLASS} .${SELECT_ELEMENT_CLASS}`)[0];

  // whether input or select, find the chosen element
  const { options, selectedIndex } = sizeEl;
  const chosen = options ? options[selectedIndex] : sizeEl;
  const defaultOption = options ? options[0] : chosen;
  const regularPrice = defaultOption.getAttribute(REGULAR_PRICE_ATTR) || defaultOption.getAttribute(PRICE_ATTR);

  // instantiate object, adding properties that apply to the whole dropdown
  const product = {
    // DOM references
    wrap: $wrap[0],
    sizeEl: sizeEl,
    // product info
    regularPrice: regularPrice,
    // useful booleans
    oneSize: !options,
    allInStock: options ? !any(hasAttr, 'data-oos') : !hasAttr(chosen, 'data-oos'),
    allPreorder: options ? all(hasAttr, 'data-preorder') : hasAttr(chosen, 'data-preorder'),
  };

  product.allOnSale = options ? all(isOnSale, regularPrice) : isOnSale(chosen, regularPrice);
  updateChosenData(product, chosen);

  return product;

  // Helper function to determine if an option has an attr
  function hasAttr(option, attr) {
    return !!(option.getAttribute(attr)
           && option.getAttribute(attr) !== 'false')
  }

  // helper function to determine if any options have an attr
  function any(comparison, attr) {
    let len = options.length;

    while (len--) {
      const option = options[len];
      if (option.value !== 'unavailable'
       && comparison(option, attr)) {
        return true;
      }
    }
    return false;
  }

  // helper function to determine if all options have an attr
  function all(comparison, attr) {
    let len = options.length;

    while (len--) {
      const option = options[len];
      if (option.value !== 'unavailable'
       && !comparison(option, attr)) {
        return false;
      }
    }
    return true;
  }
};

// helper function to determine if option is on sale
function isOnSale(el, regularPrice) {
  const price = el['price'] || el.getAttribute(PRICE_ATTR);

  return !!(parseFloat(price) < parseFloat(regularPrice));
}

/**
 * Updates product data object whenever chosen option is changed
 * @param {Object} product - The product's data object
 * @param {HTMLElement} chosen - The chosen option
 */
export const updateChosenData = (product, chosen) => {
  const data = {
    el: chosen,
  };

  // add individual properties for chosen
  addData('delivery-date');
  addData('sample-defect');
  addData('final-sale');
  addData('one-left');
  addData('preorder');
  addData('oos');
  addData('price');

  // add 'on sale' booleans
  data.isOnSale = isOnSale(chosen, product.regularPrice);

  product.chosen = data;

  // helper function to get product data attributes
  function addData(attr) {
    const val = chosen.getAttribute(`data-${attr}`) || false;
    data[attr] = (val && val !== 'false') ? (val === 'true') || val || true : false;
  }
};
