/**
 * Toggles the 'default' class on dropdowns that force a change from default
 * @module sizeStyle
 */

import $ from'jquery';

export const DEFAULT_CLASS = 'default';

/**
 * Toggle style of dropdown based on selected value.
 * @param {HTMLElement} select - The current target interacted with
 * @param {HTMLElements} options - List of options within currentTarget
 * @param {Number} selectedIndex - Which option is selected
 */
export default function toggleStyle(select, options, selectedIndex) {
  // get the selected option
  const { value = '' } = options[selectedIndex];

  // toggleClass based on selected.value
  $(select).toggleClass(DEFAULT_CLASS, value === 'default');
};
