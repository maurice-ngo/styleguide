/**
 * Updates price displayed when stock id changes
 * @module updatePrice
 */

import $ from'jquery';

import regularTemplate from '../../materials/modules/price/01-regular.html'
import saleTemplate from '../../materials/modules/price/02-on-sale.html'

export const REGULAR_PRICE_ATTR = 'data-regular-price';
export const PRICE_ATTR = 'data-price';

/**
 * Update price based on selected value.
 * @param {jQueryElement} wrap - The closest '.product' wrap from the select
 * @param {HTMLElement} chosen - Selected option of select dropdown
 * @param {HTMLElements} options - List of options in select dropdown
 */
export default function updatePrice(wrap, chosen, options) {
  // get the price element
  const priceEl = wrap.find('.price');
  // set up data for handlebars template
  const price = chosen.getAttribute(PRICE_ATTR);
  const defaultOption = options ? options[0] : chosen;
  const regularPrice = defaultOption.getAttribute(REGULAR_PRICE_ATTR) || defaultOption.getAttribute(PRICE_ATTR);
  let data = {
    'pdp': {
      'price': price,
      'regular-price': regularPrice
    }
  }

  if (!price) { // if no price, use regular price
    data.pdp.price = regularPrice;
    priceEl.html(regularTemplate(data));
  } else if (parseFloat(price) < parseFloat(regularPrice)) { // if on sale, use price
    priceEl.html(saleTemplate(data));
  } else { // if price is the same or higher than regular price, use price
    priceEl.html(regularTemplate(data));
  }
};
