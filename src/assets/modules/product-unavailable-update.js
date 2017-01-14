/**
 * Updates the "unavailable" option href
 * @module linkUnavailable
 */

import $ from 'jquery';

export const VALUE = 'unavailable';
export const template = href => {
  return `<option value="${VALUE}" data-href="${href}">Can't find your size?</option>`;
};

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
    sizeEl.insertAdjacentHTML('beforeend', template(href));
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

  // when all sizes are in stock
  if (allInStock) {
    return isOnSale ? '' : './special-order.html';
  }

  // default href based on whether all sizes are on sale
  return isOnSale ? './back-in-stock.html' : './cant-find-your-size.html';
};
