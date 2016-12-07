/**
 * Updates page for Out Of Stock product
 * @module oosProduct
 */

import $ from 'jquery';

import registerJQueryPlugin from '../lib/register-jquery-plugin';
import updateCTA from './product-cta-update';
import updateDelivery from './product-delivery-update';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'oosProduct';
registerJQueryPlugin(PLUGIN_NAME, oosProduct);

/**
 * Initializes changes for oos product.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function oosProduct(el, options = {}) {
  const $wrap = options.$wrap || $(el).closest('.product');
  const chosen = document.createElement('li');
  chosen.setAttribute('data-oos', 'true')

  updateDelivery($wrap, chosen);
  updateCTA($wrap, chosen);
};
