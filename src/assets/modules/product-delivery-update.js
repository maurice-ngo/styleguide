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
export default function updateDelivery({ wrap, chosen = {} }) {
  // get the delivery text
  const delivery = $(wrap).find(DELIVERY_CLASS);
  // estimated delivery text
  const dateSpan = delivery.children(INFO_EL);
  // cache the default dext
  const defaultText = dateSpan.text();

  const { oos, preorder, 'delivery-date': deliveryDate } = chosen;

  // toggle hide for oos products
  delivery.toggleClass('u-hide', oos);

  if (!oos) {
    // update date span
    dateSpan.text(deliveryDate || defaultText);
    // toggle style for preorder
    delivery.toggleClass('u-error', preorder);
  }
};
