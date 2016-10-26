/**
 * Click event attached to 'add to bag' submit button
 * Checks the form, submits, and shows confirmation
 * @module addToBag
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';
import addedConfirmation, { displayConfirmation } from './product-added-confirmation';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'addToBag';
registerJQueryPlugin(PLUGIN_NAME, addToBag);

export const SIZE_SELECTOR = '.product-option--size .product-option__select';

/**
 * Initializes color dropdown changes.
 * @param {HTMLElement} el - The submit button we're attaching to
 */
export default function addToBag(el) {
  // create & add confirmation modal once up front
  const confirmation = addedConfirmation();

  // attach handler to el
  attachSubmitHandler(el, confirmation);
}


/**
 * Adds 'submit' listener to parent 'form'.
 * @param {HTMLElement} btn - The element that was clicked, inside the form
 * @param {HTMLElement} confirmation - The confirmation modal to show
 */
const attachSubmitHandler = (btn, confirmation) => {
  // when the form submits, show the modal
  const form = $(btn).closest('form');
  const $confirmation = $(confirmation);

  form.submit(e => {
    e.preventDefault();

    // check that size is chosen
    const chosen = checkSize(form);

    if (chosen) // display the confirmation modal
      displayConfirmation(confirmation, chosen);
  });
};

/**
 * Checks that size is chosen.
 * @param {jQueryElement} form - The form being submitted
 */
const checkSize = form => {
  const size = form.find(SIZE_SELECTOR)[0];
  const tagName = size.tagName;

  if (tagName === 'INPUT') // size is INPUT whenever there is only 1 size
    return size;

  if (tagName === 'SELECT') {
    if (size.selectedIndex) { // size is chosen from SELECT
      return size.options[size.selectedIndex];
    } else { // SELECT is still on default option
      $(size).focus();
      return 0;
    }
  }

  return false; // something went wrong?
};
