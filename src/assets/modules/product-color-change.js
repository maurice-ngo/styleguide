/**
 * Forwards user to new page when changing color dropdown
 * @module colorChange
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'colorChange';
registerJQueryPlugin(PLUGIN_NAME, colorChange);

const DEFAULT_OPTIONS = {
  redirectFunc: val => document.location.href = val,
};

/**
 * Initializes color dropdown changes.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function colorChange(el, options = {}) {
  const ops = Object.assign({}, DEFAULT_OPTIONS, options);
  // run whenever size dropdown changes
  attachChangeListener($(el), options);
};

/**
 * Attaches change event to select dropdown.
 * @param {HTMLElement} dropdown - The select dropdown
 */
const attachChangeListener = (dropdown, { redirectFunc }) => {
  dropdown.change(({ currentTarget }) => {
    // get selected after every change
    let selected = currentTarget.options[currentTarget.selectedIndex];

    // change location.href
    if (selected.value) {
      redirectFunc(selected.value);
    }
  })
};
