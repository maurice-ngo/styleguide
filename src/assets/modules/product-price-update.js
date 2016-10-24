/**
 * Updates price displayed when stock id changes
 * @module updatePrice
 */

import $ from'jquery';

import regularTemplate from '../../materials/modules/price/01-regular.html'
import saleTemplate from '../../materials/modules/price/02-on-sale.html'

export const REGULAR_PRICE = 'data-regular-price';
export const PRICE = 'data-price';

/**
 * Update price based on selected value.
 * @param {HTMLElement} select - The current target interacted with
 * @param {HTMLElements} options - List of options within currentTarget
 * @param {Number} selectedIndex - Which option is selected
 */
export default function updatePrice(select, options, selectedIndex) {
  // get the selected option
  const price = options[selectedIndex].getAttribute();
  const regularPrice = options[0].getAttribute(REGULAR_PRICE);
  const priceEl = $(select).closest('.product').find('.price');
  const data = {
    'pdp': {
      'price': price,
      'regular-price': regularPrice
    }
  }

  if (!regularPrice)
    return console.log('data-regular-price missing from default option');

  // update price to either sale or regularPrice
  if (!price)
    priceEl.html(regularTemplate(data));
  else if (parseFloat(price) < parseFloat(regularPrice))
    priceEl.html(saleTemplate(data));
  else
    priceEl.html(regularTemplate(data));
};
