/**
 * Updates CTA when stock id changes
 * @module updateCTA
 */

import $ from 'jquery';

import ctaAddToBag from '../../materials/modules/cta-buttons/add-to-bag.html'
import ctaPreorder from '../../materials/modules/cta-buttons/preorder.html'
import ctaNotifyMeSpecial from '../../materials/modules/cta-buttons/notify-me-special.html'
import ctaNotifyMe from '../../materials/modules/cta-buttons/notify-me.html'

export const CTA_SELECTOR = '.product__cta';
const DEFAULT_OPTIONS = {
  chooseCTA,
};

/**
 * Update CTA based on selected value.
 * @param {HTMLElement} wrap - The .product wrap
 * @param {Object} chosen - Selected product size, including relevant data
 * @param {Boolean} oos - Whether the chosen size is out of stock
 * @param {Boolean} preorder - Whether the chosen size is preorder only
 * @param {Boolean} allOnSale - Whether all sizes are on sale
 */
export default function updateCTA({ wrap, chosen, allOnSale }, options = {}) {
  const { oos, preorder } = chosen;
  const { chooseCTA } = Object.assign({}, DEFAULT_OPTIONS, options);

  $(wrap).find(CTA_SELECTOR).html(chooseCTA(oos, allOnSale, preorder));
};

/**
 * Choose the CTA based on attributes.
 * @param {Boolean} oos - Whether the chosen size is out of stock
 * @param {Boolean} preorder - Whether the chosen size is preorder only
 * @param {Boolean} allOnSale - Whether all sizes are on sale
 */
function chooseCTA(oos, allOnSale, preorder) {
  return oos ? allOnSale ? ctaNotifyMe : ctaNotifyMeSpecial
         : preorder ? ctaPreorder : ctaAddToBag;
}
