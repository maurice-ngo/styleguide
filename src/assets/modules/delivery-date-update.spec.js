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

  it('should use the default delivery date', () => {
    const $delivery = updateDeliveryDate(data);
    expect($delivery).to.have.html(template(data));
  });

  it('should use a selected delivery date', () => {
    data.chosen['delivery-date'] = NEW_DATE;
    const $delivery = updateDeliveryDate(data);
    expect($delivery).to.have.html(template(data));
  });

  it('should empty delivery date for "out of stock"', () => {
    data.chosen['oos'] = true;
    const $delivery = updateDeliveryDate(data);
    expect($delivery.text()).to.be.empty;
  });

  it('should empty delivery date for "preorder"', () => {
    data.chosen['preorder'] = true;
    const $delivery = updateDeliveryDate(data);
    expect($delivery.text()).to.be.empty;
  });
});
