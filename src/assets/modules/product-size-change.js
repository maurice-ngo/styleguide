/**
 * Attaches change event listener to size dropdown, firing necessary updates
 * (typically attached to '.product-option--size .product-option__select')
 * @module sizeChange
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';
import toggleStyle from './product-size-style';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'sizeChange';
registerJQueryPlugin(PLUGIN_NAME, sizeChange);

/**
 * List of all updates made on change.
 * @param {HTMLElement} evt - The select dropdown we're attaching to
 */
const runUpdates = (evt) => {
  toggleStyle(evt);
};

/**
 * Initializes size changes.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function sizeChange(el) {
  // local jQuery reference to el
  const dropdown = $(el);

  attachChangeListener(dropdown);
  runOnce(dropdown);
};

/**
 * Attaches change event to select dropdown.
 * @param {HTMLElement} dropdown - The select dropdown
 */
const attachChangeListener = dropdown => dropdown.change(evt => runUpdates(evt));

/**
 * Runs once to update on page load.
 * @param {HTMLElement} dropdown - The select dropdown
 */
const runOnce = dropdown => dropdown.change();
