/**
 * Trap focus for accessibility
 * @module trapFocus
 */

import $ from 'jquery';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'trapFocus';
export const DEFAULTS = {
  lastFocus: null
};

/**
 * Initializes modal.
 * @param {HTMLElement} $el - button /element that opens modal
 * @param {Object} options - Options used for wiring up the modal
 * @see DEFAULTS
 */
export default function trapFocus($el, options = {}) {
  const opts = mergeOptions(options);
  const $container = $($el);
  const $lastFocusableElement = getLastFocusableElement($container);

  this.options = opts;
  this.el = $el;

  shiftFocusToContainer($container);
  focusableBody();
  setEventListeners($container, $lastFocusableElement, opts);
}

/**
 * Applies any sort of event handlers for the trapFocus.
 * @param  {jQuery} $el - trapped container
 * @param  {jQuery} $lastFocusableElement
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
const setEventListeners = ($el, $lastFocusableElement, options = {}) => {
  let shifted = false;

  $lastFocusableElement
  .on("focus.trap", evt => disableUserSelect());

  $lastFocusableElement
  .on("blur.trap", evt => returnToContainer($el, shifted));

  $el
  .on("blur.trap", evt => returnToLastFocusableEl($el, shifted));

  // If focus leaves html content and returns to body, refocus container
  $("body").on("focus.trap", evt => returnToContainer($el, false));

  // If shift is pressed
  $(document).on("keydown.trap", evt => {
    if (evt.keyCode == 16) {
      shifted = true;
    }
  });

  // If shift is release
  $(document).on("keyup.trap", evt =>  {
    if (evt.keyCode == 16) {
      shifted = false;
    }
  });
}

/**
 * If tabbing backwards loops back to the last focusable element
 * @param  {jQuery} $el - last focusable element
 * @param  {boolean} shifted - if shift key is press or not
 */
const returnToLastFocusableEl = ($el, shifted) => {
  if(shifted) {
    setTimeout(() => {
      $el.focus();
    });
  }
};


/**
 * If tabbing forward on the last focusable element loops focus back to the container
 * Enable default user selection
 * @param  {jQuery} $el - trapped container
 * @param  {boolean} shifted - if shift key is press or not
 */
const returnToContainer = ($el, shifted) => {
  if(!shifted) {
    $el.focus();
  }
  enableUserSelect();
};

/**
 * Make body focusable
 */
const focusableBody = () => {
  $("body").attr("tabindex", "0");
};

/**
 * Disable user select
 * Prevent user selection on last element
 * this stops voice over on safari to follow text selector
 */
const disableUserSelect = () => {
  $("body").css({"user-select" : "none"});
};

/**
 * Enable user select
 */
const enableUserSelect = () => {
  $("body").css({"user-select" : ""});
};


/**
 * Shift focus to container
 * @param  {jQuery} $el - trapped container
 * @return {jQuery} last focusable element
 */
const shiftFocusToContainer = ($el) => {
  $el.attr("tabindex", "0");
  setTimeout(() => {
    $el.focus();
  });
};

/**
 * Remove all listeners and return to original state
 * @param  {jQuery} $el - trapped container
 * @return {jQuery} last focusable element
 */
const getLastFocusableElement = ($el) => {
  const focusableSelector = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
  return $el.find(focusableSelector).last();
};

/**
 * Remove all listeners and return to original state
 * @param  {jQuery} $el - trapped container
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
const freeFocus = ($el, name) => {
  $("body").attr("tabindex", "");
  var options = $($el).data('plugin_' + name).options;
  var $container = $($($el).data('plugin_' + name).el);
  var $lastFocus = $(options.lastFocus);
  $lastFocus.off("focus.trap");
  $lastFocus.off("blur.trap");
  $container.off("blur.trap");
  $(document).off("keydown.trap");
  $(document).off("keyup.trap");
  if($lastFocus.length) {
    $lastFocus.focus();
  }
};

/**
 * Simple helper function that creates/register a jQuery plugin.
 * @param {string} name - The name of the plugin to reguster
 * @param {jQueryPluginCallback} cb - A callback function
 */
const registerJQueryPlugin = (name, cb) => {
  $.fn[name] = function(options) {
    if(options === "off") {
      freeFocus(this, name);
      return;
    }
    return this.each(function() {
      $.data(this, 'plugin_' + name, new cb(this, options) );
    });
  }
};

registerJQueryPlugin(PLUGIN_NAME, trapFocus);

/**
 * Merges together all the options and the various conditions in which they
 * can be set.
 * @param  {Object} [options={}] - Any options provided upon initialization
 * @return {Object} Immutable version of the options
 */
const mergeOptions = (options = {}) => {
  const opts = Object.assign({}, DEFAULTS, options);
  return opts;
};
