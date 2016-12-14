import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import showNotification, {
  EL_CLASS,
  finalSale,
  sampleDefect,
  oneLeft,
  preorder,
} from './product-notification-show';

chai.use(chaiJquery);

describe('product notification show', () => {
  let $product;
  let data;
  const WRAP_CLASS = 'product';
  const notifications = [
    {
      attr: 'sample-defect',
      template: sampleDefect,
    }, {
      attr: 'final-sale',
      template: finalSale,
    }, {
      attr: 'one-left',
      template: oneLeft,
    }, {
      attr: 'preorder',
      template: preorder,
    }
  ];

  beforeEach(() => {
    $product = $(fixture.set(`
      <div class="${WRAP_CLASS}">
        <p class="${WRAP_CLASS}__${EL_CLASS}"></p>
      </div>
    `));

    data = {
      wrap: $product[0],
      wrapBlockClass: WRAP_CLASS,
      chosen: {
        'delivery-date': 'my bday',
      },
    }
  });

  afterEach(() => fixture.cleanup());

  it('should confirm the notification wrap is there', () => {
    const $notification = showNotification(data);
    expect($(`.${WRAP_CLASS}__${EL_CLASS}`)).to.have.length.above(0);
  });

  it('should remove any existing elements from the wrap', () => {
    data.chosen['one-left'] = true;
    showNotification(data);
    data.chosen['one-left'] = false;

    const $notification = showNotification(data);
    expect($(`.${WRAP_CLASS}__${EL_CLASS}`).html()).to.be.empty;
  });

  notifications.forEach(notification => {
    it(`should render ${notification.attr} notification with the correct template`, () => {
      data.chosen[notification.attr] = true;
      expect(showNotification(data)).to.have.html(notification.template(data.chosen));
    });
  });
});
