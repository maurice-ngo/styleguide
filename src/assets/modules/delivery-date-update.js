/**
 * Updates 'delivery-date' text to reflect size chosen
 * @module updateDeliveryDate
 */

import $ from 'jquery';

export const DELIVERY_DATE_CLASS = 'delivery-date';
export const LABEL = 'Estimated Delivery: ';

/**
 * Initializes 'estimated delivery' text changes.
 * @param {HTMLElement} wrap - The closest wrap from the select
 * @param {Object} chosen - Information on the selected size
 * @return {jQueryElement} delivery-date element
 */
export default function updateDeliveryDate({ wrap, chosen = {} }) {
  const { oos, preorder, 'delivery-date': deliveryDate } = chosen;
  const hide = oos || preorder || !deliveryDate;
  if (!deliveryDate) {
    throw new Error('Chosen does not include deliveryDate')
  }

  const $el = $(wrap).find(`.${DELIVERY_DATE_CLASS}`);
  if (!$el.length) {
    throw new Error(`Did not find $el: ".${DELIVERY_DATE_CLASS}"`)
  }

  // remove shown delivery-date text
  $el.empty();

  // hide for oos & preorder
  $el.toggleClass('u-hide', hide);

  // update text
  if (!hide) {
    $el.text(LABEL + deliveryDate);
  }

  return $el;
};
