/**
 * Updates CTA text when stock id changes
 * @module updateCTA
 */

import $ from 'jquery';

import { ON_SALE_CLASS } from './product-price-update';
import ctaAddToBag from '../../materials/modules/cta-buttons/add-to-bag.html'
import ctaPreorder from '../../materials/modules/cta-buttons/preorder.html'
import ctaNotifyMeSpecial from '../../materials/modules/cta-buttons/notify-me-special.html'
import ctaNotifyMe from '../../materials/modules/cta-buttons/notify-me.html'

export const CTA_CLASS = '.product__cta';
export let cta = {
  oos: ctaNotifyMe,
  preorder: ctaPreorder,
  default: ctaAddToBag,
};

/**
 * Update CTA text based on selected value.
 * @param {jQueryElement} $wrap - The closest '.product' wrap from the select
 * @param {HTMLElement} chosen - Selected option of select dropdown
 */
export default function updateCTA($wrap, chosen) {
  // get the cta
  const cta = $wrap.find(CTA_CLASS);

  if ($wrap.hasClass(ON_SALE_CLASS))
    cta.oos = ctaNotifyMeSpecial;

  // update cta text
  cta.html(update(chosen, $wrap));
};

/**
 * Get the text based on chosen
 * @param {HTMLElement} chosen - Selected option of select dropdown
 * @return {String} Text to display on CTA btn
 */
const update = (option, $wrap) => {
  // if data-attr, show notification
  if (check('oos'))
    return true ? ctaNotifyMeSpecial : ctaNotifyMe;
  else if (check('preorder'))
    return ctaPreorder;
  else
    return ctaAddToBag;

  /**
   * Checks for the existence of data-attribute, and returns truthiness
   * @param {String} attr - Data attribute
   * @return {Boolean} If the attribute is true
   */
  function check(attr) {
    return !!option.getAttribute('data-' + attr)
      && option.getAttribute('data-' + attr) === 'true';
  }
}
