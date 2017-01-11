import $ from 'jquery';
import difference from 'lodash/difference';
import uniq from 'lodash/uniq';
import kebabCase from 'lodash/kebabCase';

import registerJQueryPlugin from '../../lib/register-jquery-plugin';

const PLUGIN_NAME = 'validator';
registerJQueryPlugin(PLUGIN_NAME, validator);

/**
 * Defines default options for a validator.
 * @type {Object}
 */
const VALIDATOR_OPTIONS = {
  /**
   * Called when a submission is valid
   * @param {Array} validElements - An array of valid HTML elements
   */
  successCallback: validElements => validElements,
  /**
   * Called when a submission was unsuccessful
   * @param {Array} invalidElements - An array of invalid HTML elements
   */
  errorCallback: invalidElements => invalidElements,
};

/**
 * Defines the data attribute for triggering an element.
 * @type {string}
 */
export const VALIDATE_TRIGGER = 'data-validate-trigger';

/**
 * Validates fields within an element, most likely a form based on what is
 * passed in. The validation of fields is done by a couple of ways:
 *
 * 1. By using browser defaults around validity. For example, if a form element
 * is using a required attribute, has a type that uses built in validation, has
 * a patter attribute, or is controlling validity programmatically by
 * JavaScript.
 * 2. By leveraging data attributes that are coming from within. Think of these
 * attributes as additional configuration that extends the capabilities of
 * validation that isn't supported by the browser.
 * 3. A combination of two.
 *
 * Whether either of these conditions are met, they are finally triggered by
 * either a form submission or a click event applied to an element that
 * contains a data-validate-trigger attribute. This would allow for form
 * submissions to be applied to an element other than a input[type="submit"] or
 * button, in case it's needed. When any form elements are found invalid, a
 * pseudo class of invalid is set and can be styled by CSS.
 *
 * The goal of this work is to leverage as much from within the browser and
 * remove the need for as much custom work as possible.
 * @see validators
 * @see VALIDATOR_OPTIONS
 * @param {HTMLElement} el - An element containing fields used for validating
 * @param {Object} [options={}] - Options used for overriding
 */
export default function validator(el, options = {}) {
  const {
    successCallback,
    errorCallback,
  } = Object.assign({}, VALIDATOR_OPTIONS, options);

  const $el = $(el);
  const $triggers = $el.find(`[${VALIDATE_TRIGGER}]`);

  if ($triggers.length) {
    $triggers.on('click', evt => submitHandler(evt, $el, successCallback, errorCallback));
  }

  $el.on('submit', evt => submitHandler(evt, $el, successCallback, errorCallback));

  forEachFormField($el, formField => {
    formField.addEventListener(resolveRefreshEventType(formField), () => validateField(formField));
  });
}

/**
 * Performs the submit handler used for verifying the fields within an element.
 * @param {Event} evt - DOM event
 * @param {jQuery} $wrapper - The element containing form elements
 * @param {Function} successCallback - Fired off if submission was successful
 * @param {Function} errorCallback - Fired off if submissions was unsuccessful
 */
const submitHandler = (evt, $wrapper, successCallback, errorCallback) => {
  let invalidElements = $wrapper.find(':invalid').not(':hidden').toArray();
  let validElements = [];

  forEachFormField($wrapper, formField => {
    const isInvalid = validateField(formField);
    if (isInvalid) {
      invalidElements = [...invalidElements, formField];
    } else {
      validElements = [...validElements, formField];
    }
  });

  invalidElements = removeExistingInvalidates(invalidElements);

  if (invalidElements.length > 0) {
    evt.preventDefault();
    errorCallback(invalidElements);
  } else {
    successCallback(validElements);
  }
};

/**
 * Validates for form field based on whether it contains a custom data
 * attribute as specified by any validators. It's purpose is to set the proper
 * validity if the field's requirements haven't been met. It will return true
 * if the element was found invalid.
 * @see validators
 * @param {HTMLSelectElement|HTMLInputElement} el - Form element
 * @returns {boolean|undefined} Determines if element is invalid
 */
const validateField = el => {
  const $el = $(el);

  if ($el.is(':hidden')) {
    return false;
  }

  const dataAttrs = $el.data();
  const validatorList = Object.keys(validators);

  for (let i = 0, len = validatorList.length; i < len; i++) {
    const name = validatorList[i];
    const dataVal = dataAttrs[name];

    if (!!dataVal && !!validators[name]) {
      const message = validators[name]($el, dataVal, dataAttrs);
      if (message) {
        el.setCustomValidity(message);
        return true;
      } else {
        el.setCustomValidity('');
      }
    }
  }
};

/**
 * Responsible for cleaning up and ensuring that all invalid elements are
 * actually invalid and normalized.
 * @param {Array} elements - Contains an array of possible invalid elements
 * @returns {Array} Normalized invalidates
 */
const removeExistingInvalidates = elements => {
  const elementsToRemove = elements.filter(element => element.checkValidity());
  const diff = difference(elements, elementsToRemove);
  return uniq(diff);
};

/**
 * Helper that determines all the elements that contain data validator
 * attributes and applies a function to interact with each element.
 * @param {jQuery} $wrapper - Container for the form elements
 * @param {Function} fn - Called and passed along a form element
 */
const forEachFormField = ($wrapper, fn) => {
  const dataSelector = Object
    .keys(validators)
    .map(name => `[data-${kebabCase(name)}]`)
    .join(',');

  $wrapper.find(dataSelector).each(function() {
    fn(this);
  });
};

/**
 * Determines the type of event used for refreshing. In other words, when a
 * field should be checked for validity.
 * @param {HTMLInputElement|HTMLSelectElement} el - An element
 * @returns {string} The type of event used for determining a refresh of a field
 */
const resolveRefreshEventType = el => {
  switch (el.tagName.toLowerCase()) {
    case 'select':
      return 'change';
  }

  return 'blur';
};

/**
 * Defines a number of custom data attributes used for validating.
 * @type {Object}
 */
const validators = {
  /**
   * Ensures that an element is not empty. This is different from a required
   * attribute as the validation occurs on submit by the validator verses
   * natively in the browser.
   *
   * @example
   * <form>
   *   <input type="text" data-validate-not-empty="true" />
   *   <button>Submit</button>
   * </form>
   *
   * @param {jQuery} $el - Elements checked to be not empty
   * @returns {string} Value used for setting custom validity
   */
  validateNotEmpty($el) {
    if (!$el.val()) {
      return $el.attr('placeholder') || $el.attr('name') || 'invalid';
    }
  },

  /**
   * Ensure that an element value is not set to the provided value. When it has
   * been set to the value provided, the element will be set as invalid.
   *
   * @example
   * <form>
   *   <input type="text" data-validate-not="walter" />
   *   <button>Submit</button>
   * </form>
   *
   * @param {jQuery} $el - Elements checked to be not empty
   * @param {string} dataVal - Elements checked to be not empty
   * @returns {string} Value used for setting custom validity
   */
  validateNot($el, dataVal) {
    if ($el.val() === dataVal) {
      return dataVal;
    }
  },
};
