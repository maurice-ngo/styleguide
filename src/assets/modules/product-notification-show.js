/**
 * Updates price displayed when stock id changes
 * @module showNotification
 */

import $ from 'jquery';

import finalSale from '../../materials/modules/product-notifications/final-sale.html';
import sampleDefect from '../../materials/modules/product-notifications/final-sale-sample-defect.html';
import oneLeft from '../../materials/modules/product-notifications/one-left.html';
import preorder from '../../materials/modules/product-notifications/preorder.html';

export const NOTIFICATION_CLASS = 'product__notification';

/**
 * Update price based on selected value.
 * @param {Object} product - The product's data object
 */
export default function showNotification({ wrap, chosen }) {
  const $el = $(wrap).find(`.${NOTIFICATION_CLASS}`);

  // clean up existing notification
  $el.empty();

  // show template
  $el.html(notify(chosen));
}

/**
 * Choose template for notification.
 * @param {Object} option - Selected option of select dropdown
 * @return {String} Handlebars template from import above
 */
const notify = (option) => {
  // if data-attr, show notification
  if (option['sample-defect'])
    return sampleDefect;
  else if (option['final-sale'])
    return finalSale;
  else if (option['one-left'])
    return oneLeft;
  else if (option.preorder)
    return preorder;
};
