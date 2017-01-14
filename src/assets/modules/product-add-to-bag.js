/**
 * Click event attached to 'add to bag' submit button
 * Checks the form, submits, and shows confirmation
 * @module addToBag
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';
import addedConfirmation, { displayConfirmation } from './product-added-confirmation';
import { SIZE_ELEMENT_CLASS } from './product-size-change';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'addToBag';
registerJQueryPlugin(PLUGIN_NAME, addToBag);

/**
 * Initializes color dropdown changes.
 * @param {HTMLElement} el - The submit button we're attaching to
 */
export default function addToBag(el) {
  // create & add confirmation modal once up front
  const confirmation = addedConfirmation();

  if (!confirmation) {
    // if no modal is returned,
    // throw an error (and form will submit as god intended)
    throw new Error(`No template (#${TEMPLATE_ID}) was found`);
  }
  else {
    // attach handler to el
    attachSubmitHandler(el, confirmation);
  }
}

/**
 * Adds 'submit' listener to parent 'form'.
 * @param {HTMLElement} btn - The element that was clicked, inside the form
 * @param {HTMLElement} confirmation - The confirmation modal to show
 */
const attachSubmitHandler = (btn, confirmation) => {
  const form = $(btn).closest('form');
  // TODO: pdp constants
  const sizeEl = form.find(`.${SIZE_ELEMENT_CLASS}, .product-size__one`)[0];

  // when the form submits, show the modal
  form.submit(e => {
    e.preventDefault();

    const { options, selectedIndex } = sizeEl;
    const chosen = options ? options[selectedIndex] : sizeEl;

    // if default option is still chosen
    if (sizeEl.value === 'default') {
      $(sizeEl).focus();
      return;
    }

    // display the confirmation modal
    displayConfirmation(confirmation, chosen, sizeEl);
  });
};
