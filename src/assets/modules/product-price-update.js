/**
 * Updates price displayed when stock id changes
 * @module updatePrice
 */

import $ from'jquery';

import regularTemplate from '../../materials/modules/price/01-regular.html'
import saleTemplate from '../../materials/modules/price/02-on-sale.html'

export const PRICE_ATTR = 'data-price';

/**
 * Update price based on selected value.
 * @param {HTMLElement} select - The current target interacted with
 * @param {HTMLElements} options - List of options within currentTarget
 * @param {Number} selectedIndex - Which option is selected
 */
export default function updatePrice(select, options, selectedIndex) {
  // get the price element
  const priceEl = $(select).closest('.product').find('.price');
  // set up data for handlebars template
  const price = options[selectedIndex].getAttribute(PRICE_ATTR);
  const regularPrice = options[0].getAttribute(PRICE_ATTR);
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
