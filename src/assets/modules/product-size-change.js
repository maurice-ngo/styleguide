/**
 * Attaches change event listener to size dropdown, firing necessary updates
 * (typically attached to '.product-option--size .product-option__select')
 * @module sizeChange
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';
import toggleStyle from './product-size-style';
import updatePrice from './product-price-update';
import showNotification from './product-notification-show';
import updateCTA from './product-cta-update';
import updateDelivery from './product-delivery-update';
import createProductData, { updateChosenData } from '../lib/create-product-data';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'sizeChange';
registerJQueryPlugin(PLUGIN_NAME, sizeChange);

export const PRODUCT_BLOCK_CLASS = 'product';
export const SIZE_ELEMENT_CLASS = `${PRODUCT_BLOCK_CLASS}__option--size`;
export const SELECT_ELEMENT_CLASS = `${PRODUCT_BLOCK_CLASS}__option-select`;

/**
 * Initializes size changes.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function sizeChange(el) {
  // local jQuery reference to el
  const $dropdown = $(el);
  const $wrap = $dropdown.closest(`.${PRODUCT_BLOCK_CLASS}`);
  const data = createProductData($wrap);

  attachChangeListener(data);
  runOnce($dropdown);
};

/**
 * Attaches change event to select dropdown.
 * @param {Object} data - Object containing relevant data about the product
 */
const attachChangeListener = data => $(data.sizeEl).change( evt => {
  const { wrap, sizeEl } = data;
  const $wrap = $(wrap);

  // whether input or select, find the chosen element
  const { options, selectedIndex } = sizeEl;
  const chosen = options ? options[selectedIndex] : sizeEl;

  // run updates
  updatePrice($wrap, PRODUCT_BLOCK_CLASS, chosen, sizeEl);
  showNotification(chosen);
  updateCTA($wrap, chosen);
  updateDelivery($wrap, chosen);

  // only for select dropdown
  if (options) {
    toggleStyle(sizeEl, chosen);
  }
});


/**
 * Runs once to update on page load.
 * @param {jQueryElement} dropdown - The select dropdown
 */
const runOnce = dropdown => dropdown.change();
