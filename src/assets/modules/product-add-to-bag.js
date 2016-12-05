/**
 * Click event attached to 'add to bag' submit button
 * Checks the form, submits, and shows confirmation
 * @module addToBag
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';
import addedConfirmation, { displayConfirmation } from './product-added-confirmation';
import { SIZE_SELECTOR } from './product-size-change';

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

  if (!template) {
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
  const sizeEl = form.find(SIZE_SELECTOR)[0];
  const $confirmation = $(confirmation);

  // when the form submits, show the modal
  form.submit(e => {
    e.preventDefault();

    // check that size is chosen
    const chosen = check(sizeEl);

    if (chosen) // display the confirmation modal
      displayConfirmation(confirmation, chosen, sizeEl);
  });
};

/**
 * Checks that size is chosen.
 * @param {jQueryElement} el - The size select/input
 * @return {HTMLElement} Element that's been chosen
 */
const check = el => {
  if (!el) // did not find SIZE_SELECTOR within the form
    return;

  const tagName = el.tagName;

  if (tagName === 'INPUT') // el is INPUT whenever there is only 1 size
    return el;

  if (tagName === 'SELECT' && el.selectedIndex) // el is chosen from SELECT
    return el.options[el.selectedIndex];

  $(el).focus(); // this is not working on desktop (crossing fingers for mobile)
  return; // SELECT is still on default option
};
