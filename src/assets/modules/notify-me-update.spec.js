import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

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
  let data;

  beforeEach( () => {
    fixture.set(`<div class="${WRAP_CLASS}"></div>`);
    $fixture = $(fixture.el);
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
    it('should show the "Notify Me" CTA', () => {
      const expected = ctaNotifyMe(data);
      expect(chooseCTA(data)).to.equal(expected);
    });

    it('should not show any Notification', () => {
      expect(notify(data)).to.be.empty;
    });
  });

  describe('special order page', () => {
    const setSpecialOrder = $fixture => {
      $fixture.find(`.${WRAP_CLASS}`).attr('id', 'special-order');
    };

    it('should show the "Special Order" CTA', () => {
      const expected = ctaSpecialOrder();
      setSpecialOrder($fixture);

      expect(chooseCTA(data)).to.equal(expected);
    });

    it('should show the "Unavailable" Notification when chosen size is unavailable', () => {
      const chosen = { unavailable: true };
      const expected = notificationUnavailable();
      setSpecialOrder($fixture);

      expect(notify(updateChosen(data, chosen))).to.equal(expected);
    });

    it('should show the "Preorder Avaiable" Notification when chosen size is preorder', () => {
      const chosen = {
        preorder: true,
        'delivery-date': 'next week',
      };
      const expected = notificationPreorderAvailable(chosen);
      setSpecialOrder($fixture);

      expect(notify(updateChosen(data, chosen))).to.equal(expected);
    });
  });

  describe('chosen size is preorder', () => {
    const chosen = { preorder: true };
    const expected = {
      cta: ctaPreorder(),
      notification: notificationPreorderEmail(),
    };

    it('should show the "Preorder" CTA', () => {
      const expected = ctaPreorder();

      expect(chooseCTA(updateChosen(data, chosen))).to.equal(expected);
    });

    it('should show the "Preorder Email" Notification', () => {
      const expected = notificationPreorderEmail();

      expect(notify(updateChosen(data, chosen))).to.equal(expected);
    });
  });

  describe('chosen size is in stock', () => {
    const chosen = { oos: false };

    it('should show the "Add To Bag" CTA', () => {
      const expected = ctaAddToBag();

      expect(chooseCTA(updateChosen(data, chosen))).to.equal(expected);
    });

    it('should show the "In Stock" Notification', () => {
      const expected = notificationInStock();

      expect(notify(updateChosen(data, chosen))).to.equal(expected);
    });
  });
});
