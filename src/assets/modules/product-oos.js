/**
 * Updates page for Out Of Stock product
 * @module oosProduct
 */

import $ from 'jquery';

import registerJQueryPlugin from '../lib/register-jquery-plugin';
import updateCTA from './product-cta-update';
import updateDeliveryDate from './delivery-date-update';
import { PRICE_ATTR, REGULAR_PRICE_ATTR } from '../modules/product-price-update';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'oosProduct';
registerJQueryPlugin(PLUGIN_NAME, oosProduct);

const WRAP_CLASS = 'product';

/**
 * Initializes changes for oos product.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function oosProduct(el, options = {}) {
  const $wrap = options.$wrap || $(el).closest(`.${WRAP_CLASS}`);
  const data = {
    wrap: $wrap[0],
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
  const price = item.getAttribute(PRICE_ATTR);
  const regular = item.getAttribute(REGULAR_PRICE_ATTR);

  if (!price || !regular)
    return false;

  return parseFloat(price) < parseFloat(regularPrice);
};
