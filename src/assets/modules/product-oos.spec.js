import $ from 'jquery';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import oosProduct, {
  WRAP_CLASS,
  PRICE_ATTR,
  REGULAR_PRICE_ATTR,
} from './product-oos';

chai.use(sinonChai);

describe('Product OOS', () => {
  let sandbox;

  const setup = (price, regular) => {
    const $el = $(fixture.set(`
      <div id="container">
        <div id="wrap">I am a wrap</div>
        <span
          id="oos-product"
          data-${REGULAR_PRICE_ATTR}="${price}"
          data-${PRICE_ATTR}="${regular}">Out of Stock</span>
      </div>
    `));

    const updateDeliveryDate = sandbox.spy();
    const updateCTA = sandbox.spy();
    const $wrap = $el.find('#wrap');
    const options = { $wrap, updateDeliveryDate, updateCTA };

    oosProduct($el.find('#oos-product')[0], options);
    return options;
  };

  const dataArgs = ($wrap, allOnSale) => sinon.match({
    allOnSale,
    wrap: $wrap[0],
    wrapBlockClass: WRAP_CLASS,
    chosen: {
      oos: true,
    },
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
    fixture.cleanup();
  });

  it('should be on sale when the price is less than the regular price', () => {
    const { updateDeliveryDate, $wrap } = setup(10.00, 20.00);
    expect(updateDeliveryDate).to.be.calledWith(dataArgs($wrap, false));
  });

  it('should not be on sale when the price is grater than the regular price', () => {
    const { updateDeliveryDate, $wrap } = setup(30.00, 20.00);
    expect(updateDeliveryDate).to.be.calledWith(dataArgs($wrap, true));
  });

  it('should be on sale when at least one price is not provided', () => {
    const table = [
      [],
      [10.00, null],
      [null, 10.00],
    ];

    table.forEach(args => {
      const { updateDeliveryDate, $wrap } = setup(...args);
      expect(updateDeliveryDate).to.be.calledWith(dataArgs($wrap, false));
    });
  });
});
