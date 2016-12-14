
import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import updateDeliveryDate, {
  LABEL,
  EL_CLASS,
  template,
} from './delivery-date-update';

chai.use(chaiJquery);

describe('product delivery update', () => {
  let $product;
  let data;
  const WRAP_CLASS = 'product';
  const ORIGINAL_DATE = 'cool';
  const NEW_DATE = 'beans';

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
        'delivery-date': ORIGINAL_DATE,
      },
    };
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it(`should not throw an error when "data.chosen['delivery-date']" is set`, () => {
    data.chosen['delivery-date'] = ORIGINAL_DATE;
    expect(() => updateDeliveryDate(data)).to.not.throw(Error);
  });

  it(`should throw error when "data.chosen['delivery-date']" is not set`, () => {
    data.chosen['delivery-date'] = false;
    expect(() => updateDeliveryDate(data)).to.throw(Error);
  });

  it(`should not throw an error when the element is found ".${WRAP_CLASS}__${EL_CLASS}"`, () => {
    expect(() => updateDeliveryDate(data)).to.not.throw(Error);
  });

  it(`should throw error when the element is not found ".${WRAP_CLASS}__${EL_CLASS}"`, () => {
    $product.empty();
    expect(() => updateDeliveryDate(data)).to.throw(Error);
  });

  it('should use the default delivery date', () => {
    const $delivery = updateDeliveryDate(data);
    expect($delivery).to.have.html(template(data.chosen));
  });

  it('should use a selected delivery date', () => {
    data.chosen['delivery-date'] = NEW_DATE;
    const $delivery = updateDeliveryDate(data);
    expect($delivery).to.have.html(template(data.chosen));
  });

  it('should empty delivery date for "out of stock"', () => {
    data.chosen.oos = true;
    const $delivery = updateDeliveryDate(data);
    expect($delivery.text()).to.be.empty;
  });

  it('should empty delivery date for "preorder"', () => {
    data.chosen.preorder = true;
    const $delivery = updateDeliveryDate(data);
    expect($delivery.text()).to.be.empty;
  });
});
