/**
 * Shows 'product added confirmation' modal when 'add to bag' is clicked
 * @module addedConfirmation
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'addedConfirmation';
registerJQueryPlugin(PLUGIN_NAME, addedConfirmation);

export const TEMPLATE_ID = 'product-added-confirmation';
export const TARGET_WRAP_ID = 'content';
export const CONCEAL_CLASS = 'u-conceal';

/**
 * Initializes color dropdown changes.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function addedConfirmation(el) {
    const modal = createModal();
    attachSubmitListener(el, modal);
};

/**
 * Creates & attaches modal.
 * @return {HTMLElement} Immutable modal element
 */
const createModal = () => {
  // create the modal now, so we don't recreate on every submit
  let modal = document.createElement('DIV');

  modal.className = 'modal ' + CONCEAL_CLASS;
  modal.innerHTML = document.getElementById(TEMPLATE_ID).innerHTML;
  // to override the default modal display: none
  modal.style.display = 'block';

  attachClickListener($(modal));

  return document.getElementById(TARGET_WRAP_ID).appendChild(modal);
  // (unfortunately, waiting to append this when needed [in the form submit below] ruins our transition effect)
};

/**
 * Click listener to close confirmation modal
 * @param {jQuery} el - The confirmation modal to show
 */
const attachClickListener = (el) => {
  el.click(evt => {
    let target = $(evt.toElement);

    // conceal if click is on the background or the 'continue' link
    if (target.hasClass('modal') || target.hasClass('modal__continue')) {
      evt.preventDefault();
      // conceal modal again
      el.addClass(CONCEAL_CLASS);
    }
  });
}

/**
 * Adds 'submit' listener to parent 'form'.
 * @param {HTMLElement} target - The element that was clicked, inside the form
 * @param {HTMLElement} confirmation - The confirmation modal to show
 */
const attachSubmitListener = (target, confirmation) => {
  // when the form submits, show the modal
  let form = $(target).closest('form');

  form.submit(function(e) {
    e.preventDefault();

    // reveal confirmation modal
    $(confirmation).removeClass(CONCEAL_CLASS);
  });
};
