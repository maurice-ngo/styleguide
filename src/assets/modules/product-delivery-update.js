/**
 * Updates 'estimated delivery' text to reflect size chosen
 * @module deliveryUpdate
 */

import $ from 'jquery';

export const DELIVERY_CLASS = '.product-delivery';
export const INFO_EL = 'span';

/**
 * Initializes 'estimated delivery' text changes.
 * @param {HTMLElement} wrap - The closest '.product' wrap from the select
 * @param {Object} chosen - Information on the selected size
 */
export default function updateDelivery({ wrap, chosen = {}, allOnSale }) {
  // get the delivery text
  const delivery = $(wrap).find(DELIVERY_CLASS);
  // estimated delivery text
  const dateSpan = delivery.children(INFO_EL);
  // cache the default dext
  const defaultText = dateSpan.text();
  // check for oos
  const isOOS = chosen.oos;

  // remove for oos products
  delivery.toggleClass('u-hide', isOOS);

  if (!isOOS) {
    // update date span
    dateSpan.text(chosen['delivery-date'] || defaultText);
    // make preorder delivery-date red
    delivery.toggleClass('u-error', chosen.preorder === 'true');
  }
};
