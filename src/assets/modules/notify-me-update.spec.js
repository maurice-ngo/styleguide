import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import showNotification, { EL_CLASS as NOTIFICATION_CLASS } from './product-notification-show';
import updateCTA, { CTA_CLASS } from './product-cta-update';
import { getChosen } from './product-size-change';


import updateNotifyMe, {
  chooseCTA,
  notify,
  ctaAddToBag,
  ctaPreorder,
  ctaNotifyMe,
  ctaSpecialOrder,
  notificationInStock,
  notificationPreorderEmail,
  notificationPreorderAvailable,
  notificationUnavailable,
} from './notify-me-update';


describe('notify me update', () => {
  const WRAP_CLASS = 'notify-me';
  const updateChosen = (data, chosenUpdates) => {
    const chosen = Object.assign({}, data.chosen, chosenUpdates);
    return Object.assign({}, data, { chosen });
  };
  let $fixture;
  let $ctaWrap;
  let $notification;
  let data;

  beforeEach( () => {
    fixture.set(`
      <div class="${WRAP_CLASS}">
        <p class="${WRAP_CLASS}__${NOTIFICATION_CLASS}"></p>
        <div class="${WRAP_CLASS}__${CTA_CLASS}"></div>
      </div>
    `);
    $fixture = $(fixture.el);
    $ctaWrap = $fixture.find(`.${WRAP_CLASS}__${CTA_CLASS}`);
    $notification = $fixture.find(`.${WRAP_CLASS}__${NOTIFICATION_CLASS}`);
    data = {
      wrap: $fixture.find(`.${WRAP_CLASS}`)[0],
      wrapBlockClass: WRAP_CLASS,
      chosen: {
        oos: true,
      },
    };
  });

  afterEach(() => fixture.cleanup());

  describe('by default', () => {
    const expected = {
      cta: ctaNotifyMe(),
    };
    it('should show the "Notify Me" CTA', () => {
      updateCTA(data, { chooseCTA });
      expect($ctaWrap).to.have.html(expected.cta);
    });

    it('should not show any Notification', () => {
      showNotification(data, { notify });
      expect($notification.html()).to.be.empty;
    });
  });

  describe('special order page', () => {
    const expected = {
      cta: ctaSpecialOrder(),
    };

    it('should show the "Special Order" CTA', () => {
      $fixture.find(`.${WRAP_CLASS}`).attr('id', 'special-order');

      updateCTA(data, { chooseCTA });
      expect($ctaWrap).to.have.html(expected.cta);
    });
  });

  describe('special order page and chosen size is unavailable', () => {
    const chosen = { unavailable: true };
    const expected = {
      notification: notificationUnavailable(),
    };
    it('should show the "Unavailable" Notification', () => {
      $fixture.find(`.${WRAP_CLASS}`).attr('id', 'special-order');

      showNotification(updateChosen(data, chosen), { notify });
      expect($notification).to.have.html(expected.notification);
    });
  });

  describe('special order page and chosen size is preorder', () => {
    const chosen = {
      preorder: true,
      'delivery-date': 'next week',
    };
    const expected = {
      notification: notificationPreorderAvailable(chosen),
    };
    it('should show the "Preorder Avaiable" Notification', () => {
      $fixture.find(`.${WRAP_CLASS}`).attr('id', 'special-order');

      showNotification(updateChosen(data, chosen), { notify });
      expect($notification).to.have.html(expected.notification);
    });
  });

  describe('chosen size is preorder', () => {
    const chosen = { preorder: true };
    const expected = {
      cta: ctaPreorder(),
      notification: notificationPreorderEmail(),
    };

    it('should show the "Preorder" CTA', () => {
      updateCTA(updateChosen(data, chosen), { chooseCTA });
      expect($ctaWrap).to.have.html(expected.cta);
    });

    it('should show the "Preorder Email" Notification', () => {
      showNotification(updateChosen(data, chosen), { notify });
      expect($notification).to.have.html(expected.notification);
    });
  });

  describe('chosen size is in stock', () => {
    const chosen = { oos: false };
    const expected = {
      cta: ctaAddToBag(),
      notification: notificationInStock(),
    };
    it('should show the "Add To Bag" CTA', () => {
      updateCTA(updateChosen(data, chosen), { chooseCTA });
      expect($ctaWrap).to.have.html(expected.cta);
    });

    it('should show the "In Stock" Notification', () => {
      showNotification(updateChosen(data, chosen), { notify });
      expect($notification).to.have.html(expected.notification);
    });
  });
});
