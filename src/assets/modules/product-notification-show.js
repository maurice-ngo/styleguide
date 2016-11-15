/**
 * Updates price displayed when stock id changes
 * @module showNotification
 */

import $ from 'jquery';

import finalSale from '../../materials/modules/product-notifications/final-sale.html';
import sampleDefect from '../../materials/modules/product-notifications/final-sale-sample-defect.html';
import oneLeft from '../../materials/modules/product-notifications/one-left.html';
import preorder from '../../materials/modules/product-notifications/preorder.html';

export const WRAP_ID = 'product-notifications';

/**
 * Update price based on selected value.
 * @param {HTMLElement} chosen - Selected option of select dropdown
 */
export default function showNotification(chosen) {
  const $wrap = $(document.getElementById(WRAP_ID));
  // clean up existing notification
  $wrap.empty();

  // show template
  $wrap.html(notify(chosen));
}

/**
 * Choose template for notification.
 * @param {HTMLElement} option - Selected option of select dropdown
 * @return {String} Handlebars template from import above
 */
const notify = (option) => {
  // if data-attr, show notification
  if (check('sample-defect'))
    return sampleDefect;
  else if (check('final-sale'))
    return finalSale;
  else if (check('one-left'))
    return oneLeft;
  else if (check('preorder'))
    return preorder;

  function check(attr) {
    return !!option.getAttribute('data-' + attr)
      && option.getAttribute('data-' + attr) === 'true';
  }
}
