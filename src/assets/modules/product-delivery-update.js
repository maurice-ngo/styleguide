/**
 * Updates 'estimated delivery' text to reflect size chosen
 * @module deliveryUpdate
 */

import $ from 'jquery';

export const ERROR_CLASS = 'u-error';
export const HIDE_CLASS = 'u-hide';
export const DELIVERY_DATE_ATTR = 'data-delivery-date';
export const PREORDER_ATTR = 'data-preorder';
export const OOS_ATTR = 'data-oos';
export const DELIVERY_CLASS = '.product-delivery';
export const INFO_EL = 'span';

/**
 * Initializes 'estimated delivery' text changes.
 * @param {jQueryElement} wrap - The closest '.product' wrap from the select
 * @param {HTMLElement} chosen - Selected option of select dropdown
 */
export default function updateDelivery(wrap, chosen) {
  // get the delivery text
  const delivery = wrap.find(DELIVERY_CLASS);
  // estimated delivery text
  const dateSpan = delivery.children(INFO_EL);
  // cache the default dext
  const defaultText = dateSpan.text();
  // update date span
  dateSpan.text(chosen.getAttribute(DELIVERY_DATE_ATTR) || defaultText);
  // make preorder delivery-date red
  delivery.toggleClass(ERROR_CLASS, chosen.getAttribute(PREORDER_ATTR) === 'true');
  // remove for oos products
  delivery.toggleClass(HIDE_CLASS, chosen.getAttribute(OOS_ATTR) === 'true');
};
