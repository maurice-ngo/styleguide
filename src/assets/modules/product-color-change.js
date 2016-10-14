/**
 * Forwards user to new page when changing color dropdown
 * @module colorChange
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'colorChange';
registerJQueryPlugin(PLUGIN_NAME, colorChange);

/**
 * Initializes color dropdown changes.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function colorChange(el) {
  // run whenever size dropdown changes
  attachChangeListener($(el));
};

/**
 * Attaches change event to select dropdown.
 * @param {HTMLElement} dropdown - The select dropdown
 */
const attachChangeListener = (dropdown) => {
  dropdown.change(({currentTarget}) => {
    // get selected after every change
    let selected = currentTarget.options[currentTarget.selectedIndex];

    // change location.href
    if (selected.value)
      document.location.href = selected.value;
  })
};
