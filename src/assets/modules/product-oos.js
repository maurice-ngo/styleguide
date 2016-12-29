/**
 * Updates page for Out Of Stock product
 * @module oosProduct
 */

import $ from 'jquery';
import result from 'lodash/result';

import registerJQueryPlugin from '../lib/register-jquery-plugin';
import updateCTA from './product-cta-update';
import updateDeliveryDate from './delivery-date-update';

// TODO: move this over to pdp constants
export const PRICE_ATTR = 'price';
export const REGULAR_PRICE_ATTR = 'regular-price';
export const WRAP_CLASS = 'product';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'oosProduct';
registerJQueryPlugin(PLUGIN_NAME, oosProduct);

const PRODUCT_OOS_OPTIONS = {
  $wrap: el => $(el).closest(`.${WRAP_CLASS}`),
  updateDeliveryDate,
  updateCTA,
};

/**
 * Initializes changes for oos product.
 * @see PRODUCT_OOS_OPTIONS
 * @param {HTMLElement} el - The select dropdown we're attaching to
 * @param {Object} [options={}] - Additional configuration
 */
export default function oosProduct(el, options = {}) {
  const opts = Object.assign({}, PRODUCT_OOS_OPTIONS, options);
  const { updateDeliveryDate, updateCTA } = opts;
  const wrap = result(opts, '$wrap')[0];

  const data = {
    wrap,
    wrapBlockClass: WRAP_CLASS,
    chosen: {
      oos: true,
    },
    allOnSale: isOnSale(el),
  };

  updateDeliveryDate(data);
  updateCTA(data);
};

/**
 * Helper function to determine if option is on sale
 * @param {Object|HTMLElement} item - Item for which we're comparing price
 * @return {Boolean} Whether price is less than regualarPrice
 */
const isOnSale = (item) => {
  const price = item.getAttribute(`data-${PRICE_ATTR}`);
  const regular = item.getAttribute(`data-${REGULAR_PRICE_ATTR}`);

  if (!price || !regular)
    return false;

  return parseFloat(price) < parseFloat(regular);
};
