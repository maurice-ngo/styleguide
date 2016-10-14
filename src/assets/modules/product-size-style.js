/**
 * Toggles the 'default' class on dropdowns that force a change from default
 * (typically attached to '.product-option--size .product-option__select')
 * @module sizeStyle
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'sizeStyle';
registerJQueryPlugin(PLUGIN_NAME, sizeStyle);

export const DEFAULT_CLASS = 'default';

/**
 * Initializes size style changes.
 * @param {HTMLElement} el - The select dropdown we're attaching to
 */
export default function sizeStyle(el) {
  // local jQuery reference to el
  const dropdown = $(el);

  attachChangeListener(dropdown);
  runOnce(dropdown);
};

/**
 * Attaches change event to select dropdown.
 * @param {HTMLElement} dropdown - The select dropdown
 */
const attachChangeListener = dropdown => {
  dropdown.change(evt => toggleStyle(evt));
};

/**
 * Toggle style of dropdown based on selected value.
 * @param {HTMLElement} currentTarget - The current target interacted with
 */
const toggleStyle = ({ currentTarget }) => {
  const { options, selectedIndex } = currentTarget;
  // get the selected option
  const { value } = options[selectedIndex];

  // toggleClass based on selected.value
  $(currentTarget).toggleClass(DEFAULT_CLASS, value === 'default');
};

/**
 * Runs once to update on page load.
 * @param {HTMLElement} dropdown - The select dropdown
 */
const runOnce = dropdown => dropdown.change();
