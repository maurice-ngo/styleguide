/**
 * Updates the "unavailable" option href
 * @module linkUnavailable
 */

import $ from 'jquery';

import template from '../../materials/modules/product-options/unavailable.html'

export const VALUE = 'unavailable';

/**
 * Updates unavailable option
 * @param {Object} data - Object representing product info
 */
export default function updateUnavailable( data ) {
  const { oneSize, sizeEl } = data;

  // STOP if only one size (not a dropdown)
  if (oneSize) { return; }

  // remove unavailable
  $(sizeEl)
    .find(`option[value="${VALUE}"]`)
    .remove();

  // add unavailable with proper data-href
  const href = getHref(data);

  if (href) {
    sizeEl.insertAdjacentHTML('beforeend', template({ href: href }));
  }
}

/**
 * Gets the proper href for the conditions
 * @param {Object} data - Object representing product info
 * @return {String} The href to add to the option
 */
const getHref = data => {
  const { chosen, allInStock } = data;
  const { isOnSale } = chosen;

  // determine href based on whether all sizes are on sale
  let href = isOnSale ? './back-in-stock.html' : './cant-find-your-size.html';

  // override href whenever all sizes are in stock
  if (allInStock) {
    href = isOnSale ? '' : './special-order.html';
  }

  return href;
};
