/**
 * Toggles the 'default' class on dropdowns that force a change from default
 * @module sizeStyle
 */

import $ from'jquery';

export const DEFAULT_CLASS = 'default';

/**
 * Toggle style of dropdown based on selected value.
 * @param {HTMLElement} currentTarget - The current target interacted with
 */
export default function toggleStyle({ currentTarget }) {
  const { options, selectedIndex } = currentTarget;

  if (options) {
    // get the selected option
    const { value = '' } = options[selectedIndex];

    // toggleClass based on selected.value
    $(currentTarget).toggleClass(DEFAULT_CLASS, value === 'default');
  }
};
