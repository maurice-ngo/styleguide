/**
 * Attaches change event listener to size dropdown, firing necessary updates
 * (typically attached to '.product-option--size .product-option__select')
 * @module sizeChange
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';
import sizeStyle from './product-size-style';
import updatePrice from './product-price-update';
import showNotification from './product-notification-show';
import updateCTA from './product-cta-update';
import updateDelivery from './product-delivery-update';
import redirectHref from '../lib/redirect-href';
import updateUnavailable from './product-unavailable-update';
import createProductData, { updateChosenData } from '../lib/create-product-data';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'sizeChange';
registerJQueryPlugin(PLUGIN_NAME, sizeChange);

export const PRODUCT_BLOCK_CLASS = 'product';
export const SIZE_ELEMENT_CLASS = `${PRODUCT_BLOCK_CLASS}__option--size`;
export const SELECT_ELEMENT_CLASS = `${PRODUCT_BLOCK_CLASS}__option-select`;
export const SIZE_SELECTOR = `.${SIZE_ELEMENT_CLASS} .${SELECT_ELEMENT_CLASS}`

const DEFAULT_OPTIONS = {
  update: runUpdates,
};

/**
 * Initializes size changes.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function sizeChange(el, options) {
  const { update } = Object.assign({}, DEFAULT_OPTIONS, options);
  // local jQuery reference to el
  const $dropdown = $(el);
  const $wrap = $dropdown.closest(`.${PRODUCT_BLOCK_CLASS}`);
  const data = createProductData($wrap);

  attachChangeListener(data, update);
  runOnce($dropdown);
};

/**
 * Attaches change event to select dropdown.
 * @param {Object} data - Object containing relevant data about the product
 * @param {Function} update - Function to update the page
 */
const attachChangeListener = (data, update) => $(data.sizeEl).change( evt => {
  update(data)
});

/**
 * Runs once to update on page load.
 * @param {jQueryElement} dropdown - The select dropdown
 */
const runOnce = dropdown => dropdown.change();

/**
 * Attaches change event to select dropdown.
 * @param {Object} data - Object containing relevant data about the product
 */
function runUpdates( data ) {
  const { wrap, sizeEl } = data;
  const $wrap = $(wrap);

  // whether input or select, find the chosen element
  const { options, selectedIndex } = sizeEl;
  const chosen = options ? options[selectedIndex] : sizeEl;

  updateChosenData(data, chosen);

  // run updates
  redirectHref(chosen);
  updatePrice($wrap, PRODUCT_BLOCK_CLASS, chosen, sizeEl);
  showNotification(data);
  updateCTA(data);
  updateDelivery($wrap, chosen);
  updateUnavailable(data);

  // only for select dropdown
  if (options) {
    sizeStyle(data);
  }
};
