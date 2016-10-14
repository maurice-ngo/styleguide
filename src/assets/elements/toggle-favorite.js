/**
 * Toggles the 'active' class modifier on favorite buttons when clicking
 * @module toggleFavorite
 */

import $ from 'jquery';

import registerJQueryPlugin from '../lib/register-jquery-plugin';

export const PLUGIN_NAME = 'toggleFavorite';
export const ACTIVE_CLASS = 'favorite-button--active';

// Expose the function as a jQuery plugin for ease of use
registerJQueryPlugin(PLUGIN_NAME, toggleFavorite);

/**
 * Sets up click event toggle for favorite heart button.
 * @param {HTMLElement} el - Elements matching the selector (likely .favorite-button)
 */
export default function toggleFavorite(el = {}) {
  const $el = $(el);

  $el.on( 'click', () => toggleActive($el) );
};

// Toggle the active class
const toggleActive = ($el) => {
  $el.toggleClass(ACTIVE_CLASS);
};
