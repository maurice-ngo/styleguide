/**
 * Toggles the 'default' class on dropdowns that force a change from default
 * @module sizeStyle
 */

import $ from 'jquery';

export const DEFAULT_CLASS = 'default';

/**
 * Toggle style of dropdown based on selected value.
 * @param {HTMLElement} sizeEl - The current target interacted with
 * @param {HTMLElement} chosen - Selected option
 */
export default function sizeStyle({ sizeEl, chosen }) {
  // get the selected option
  const { value = '' } = chosen;

  // toggleClass based on selected.value
  $(sizeEl).toggleClass(DEFAULT_CLASS, value === 'default');
};
