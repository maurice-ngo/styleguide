import $ from 'jquery';

import finalSale from '../../materials/modules/product-notifications/final-sale.html';
import sampleDefect from '../../materials/modules/product-notifications/final-sale-sample-defect.html';
import oneLeft from '../../materials/modules/product-notifications/one-left.html';
import preorder from '../../materials/modules/product-notifications/preorder.html';

export { finalSale, sampleDefect, oneLeft, preorder };
export const EL_CLASS = 'notification';

/**
 * Show notification based on chosen option.
 * @param {HTMLElement} wrap - The closest wrap from the select
 * @param {String} wrapBlockClass - The BEM block class of the wrap
 * @param {Object} chosen - Information on the selected size
 * @return {jQueryElement} product__notification element
 */
export default function showNotification({ wrap, wrapBlockClass, chosen }) {
  const $el = $(wrap).find(`.${wrapBlockClass}__${EL_CLASS}`);
  if (!$el.length) {
    throw new Error(`Did not find $el: ".${wrapBlockClass}__${EL_CLASS}"`);
  }

  $el.empty();

  const notification = notify(chosen);

  // show template
  if (notification) {
    $el.html(notification);
  }

  return $el;
}

/**
 * Choose template for notification.
 * @param {Object} option - Selected option of select dropdown
 * @return {String} Handlebars template from import above
 */
const notify = (option) => {
  // if data-attr, show notification
  if (option['sample-defect'])
    return sampleDefect();
  else if (option['final-sale'])
    return finalSale();
  else if (option['one-left'])
    return oneLeft();
  else if (option.preorder)
    return preorder({'delivery-date': option['delivery-date']});
};
