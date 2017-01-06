import $ from 'jquery';

export const DEFAULT_OPTIONS = {
  fieldClassName: 'field',
  hiddenModifier: 'hidden',
}

/**
 * Toggle whether Field is Hidden
 * Also toggles disabled property of the form element,
 * so hidden fields are not validated by the browser
 * @param {HTMLElement} element - Form element
 * @param {boolean} shouldHide - Whether the email field should be hidden
 * @param {object} options - List of options
 * @return {jQueryElement} Field wrapper
 */
export default function toggleHidden(element, shouldHide, options = {}) {
  const { fieldClassName, hiddenModifier } = Object.assign({}, DEFAULT_OPTIONS, options);
  const $element = $(element);
  //console.log(`@ $element`, '{'+typeof $element+'}', $element);
  const $field = $element.closest(`.${fieldClassName}`);
  //console.log(`@ $field`, '{'+typeof $field+'}', $field);

  if (!$field.length) {
    throw new Error('Field not found by toggleHidden()');
  }

  // set :disabled to avoid browser form validation
  $element.prop('disabled', shouldHide);
  $field.toggleClass(`${fieldClassName}--${hiddenModifier}`, shouldHide);

  return $field;
};
