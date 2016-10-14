/**
 * Updates 'estimated delivery' text to reflect size chosen
 * @module deliveryUpdate
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';

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
const findDropdown = (el) => {
  let form = el.closest('form');
  return form.find('.product-option--size .product-option__select');
};

/**
 * Attaches change event to select dropdown.
 * @param {HTMLElement} dropdown - The select dropdown
 * @param {HTMLElement} delivery - The element containing the delivery text
 */
const attachChangeListener = (dropdown, delivery) => {
  // estimated delivery text
  const dateSpan = delivery.children('span');
  // cache the default dext
  const defaultText = dateSpan.text();

  dropdown.change(({currentTarget}) => {
    // get selected after every change
    let selected = currentTarget.options[currentTarget.selectedIndex];

    // update date span
    dateSpan.text(selected.getAttribute('data-delivery-date') || defaultText);
    // make preorder delivery-date red
    delivery.toggleClass('u-error', selected.getAttribute('data-preorder') === 'true');
  });
};
