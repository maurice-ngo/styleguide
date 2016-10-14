/**
 * Updates 'estimated delivery' text to reflect size chosen
 * @module deliveryUpdate
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';

export const ERROR_CLASS = 'u-error';
export const DELIVERY_DATE_ATTR = 'data-delivery-date';
export const PREORDER_ATTR = 'data-preorder';
export const SIZE_CLASS = 'product-option--size';
export const SELECT_CLASS = 'product-option__select';
export const INFO_EL = 'span';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'deliveryUpdate';
registerJQueryPlugin(PLUGIN_NAME, deliveryUpdate);

/**
 * Initializes 'estimated delivery' text changes.
 * @param {HTMLElement} el - The element containing the text
 */
export default function deliveryUpdate(el) {
  // local jQuery reference to el
  const delivery = $(el);

  // find the correct size dropdown
  const sizeDropdown = findDropdown(delivery);

  // run whenever size dropdown changes
  attachChangeListener(sizeDropdown, delivery);
};

/**
 * Finds specified dropdown within a shared parent form.
 * @param {HTMLElement} el - The element containing the text
 * @return {HTMLElement} Immutable reference to size dropdown
 */
const findDropdown = el => {
  const form = el.closest('form');
  return form.find(`.${SIZE_CLASS} .${SELECT_CLASS}`);
};

/**
 * Attaches change event to select dropdown.
 * @param {HTMLElement} dropdown - The select dropdown
 * @param {HTMLElement} delivery - The element containing the delivery text
 */
const attachChangeListener = (dropdown, delivery) => {
  // estimated delivery text
  const dateSpan = delivery.children(INFO_EL);
  // cache the default dext
  const defaultText = dateSpan.text();

  dropdown.change(({ currentTarget: { options, selectedIndex } }) => {
    // get selected after every change
    const selected = options[selectedIndex];

    // update date span
    dateSpan.text(selected.getAttribute(DELIVERY_DATE_ATTR) || defaultText);
    // make preorder delivery-date red
    delivery.toggleClass(ERROR_CLASS, selected.getAttribute(PREORDER_ATTR) === 'true');
  });
};
