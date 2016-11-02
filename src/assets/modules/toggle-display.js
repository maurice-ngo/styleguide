/**
 * Responsible for creating an toggleContent based on elements existing in the DOM
 * @module toggleContent
 */

import $ from 'jquery';

import registerJQueryPlugin from '../lib/register-jquery-plugin';

export const PLUGIN_NAME = 'toggleDisplay';
export const CLICK_EVENT = 'click';

export const DEFAULTS = {
  speed: 500
};

// Expose the function as a jQuery plugin for ease of use
registerJQueryPlugin(PLUGIN_NAME, toggleDisplay);

/**
 * Initializes an toggleContent based on provided parameters.
 * @param {HTMLElement} el - An element containing the elements for the
 * toggleContent
 * @param {Object} options - Options used for wiring up the toggleContent
 * @see DEFAULTS
 */
export default function toggleDisplay(el, options = {}) {
  const $el = $(el);
  const opts = mergeOptions($el, options)

  applyEventHandlers($el, opts);
};

/**
 * Merges together all the options and the various conditions in which they
 * can be set.
 * @param  {jQuery} $el - The container element
 * @param  {Object} [options={}] - Any options provided upon initialization
 * @return {Object} Immutable version of the options
 */
const mergeOptions = ($el, options = {}) => {
  let opts = Object.assign({}, DEFAULTS, options);
  return opts;
};

/**
 * Applies any sort of event handlers for the toggleContent.
 * @param {jQuery} $el - Containing the elements for the toggleContent
 * @param {Object} options - Options used for wiring up the toggleContent
 * @see DEFAULTS
 */
const applyEventHandlers = ($el, opts = {}) => {

  $el
    .on(CLICK_EVENT, evt => itemClickHandler(evt, $el, opts));
};

/**
 * Handles the click event when a label has been iteracted with.
 * @param {jQuery.Event} evt - A jQuery event
 * @param {HTMLElement} currentTarget - The current target interacted with
 * @param {jQuery} $el - Containing the elements for the toggleContent
 * @param {Object} opts - Options passed along from initialization
 */
const itemClickHandler = ({ currentTarget }, $el, opts) => {
  var toggleThis = $($el.attr('data-toggle-this'));

  if($el.hasClass("is-active")) {
    toggleThis.slideUp();
    $el.removeClass("is-active");
  } else {
    toggleThis.slideDown();
    $el.addClass("is-active");
  }
};

