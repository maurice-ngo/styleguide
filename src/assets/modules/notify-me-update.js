import $ from 'jquery';

import { updateChosenData } from '../lib/create-product-data';
import showNotification from './product-notification-show';
import updateCTA from './product-cta-update';
import { getChosen } from './product-size-change';

import ctaAddToBag from '../../materials/modules/cta-buttons/add-to-bag.html';
import ctaPreorder from '../../materials/modules/cta-buttons/preorder.html';
import ctaNotifyMe from '../../materials/modules/cta-buttons/notify-me.html';
import ctaSpecialOrder from '../../materials/modules/cta-buttons/special-order.html';
import notificationInStock from '../../materials/modules/product-notifications/in-stock.html';
import notificationPreorderEmail from '../../materials/modules/product-notifications/preorder-email.html';
import notificationPreorderAvailable from '../../materials/modules/product-notifications/preorder-available.html';
import notificationUnavailable from '../../materials/modules/product-notifications/unavailable.html';

export { ctaAddToBag, ctaPreorder, ctaNotifyMe, ctaSpecialOrder, notificationInStock, notificationPreorderEmail, notificationPreorderAvailable, notificationUnavailable };

/**
 * Callback function to update the Notify Me section.
 * @param {Object} data - Object containing relevant data about the product
 */
export default function updateNotifyMe( data ) {
  const chosen = getChosen(data.sizeEl);
  updateChosenData(data, chosen);

  showNotification(data, { notify });
  updateCTA(data, { chooseCTA });
}

/**
 * Choose the CTA based on attributes.
 * @param {HTMLElement} wrap - The closest wrap from the select
 */
export const chooseCTA = ({ wrap, chosen = {} }) => {
  const { oos, preorder } = chosen;

  // if preorder available
  if (preorder) {
    return ctaPreorder();
  }
  // item is in stock now, show "add to bag"
  if (!oos) {
    return ctaAddToBag();
  }
  // default for special order page
  if (wrap.id === 'special-order') {
    return ctaSpecialOrder();
  }
  // default for all other pages
  return ctaNotifyMe();
};

/**
 * Choose template for notification.
 * @param {Object} chosen - Selected option of select dropdown
 * @return {String} Handlebars template from import above
 */
export const notify = ({ wrap, chosen }) => {
  const { oos, preorder, 'delivery-date': deliveryDate, unavailable } = chosen;

  // if data-attr, show notification
  if (wrap.id === 'special-order') {
    if (preorder) {
      return notificationPreorderAvailable({'delivery-date': deliveryDate});
    }
    if (unavailable) {
      return notificationUnavailable();
    }
  }
  if (preorder) {
    return notificationPreorderEmail();
  }
  if (!oos) {
    return notificationInStock();
  }

  return;
};
