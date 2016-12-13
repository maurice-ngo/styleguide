import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import updateDeliveryDate, {
  LABEL,
  DELIVERY_DATE_CLASS,
} from './delivery-date-update';

chai.use(chaiJquery);

describe('product delivery update', () => {
  let $product;
  let data;
  const ORIGINAL_DATE = 'cool';
  const NEW_DATE = 'beans';

  beforeEach(() => {
    $product = $(fixture.set(`
      <div class="product">
        <p class="${DELIVERY_DATE_CLASS}"></p>
      </div>
    `));

    data = {
      wrap: $product[0],
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
    expect($delivery).to.have.text(LABEL + ORIGINAL_DATE);
  });

  it('should use a selected delivery date', () => {
    data.chosen['delivery-date'] = NEW_DATE;
    const $delivery = updateDeliveryDate(data);
    expect($delivery).to.have.text(LABEL + NEW_DATE);
  });

  it('should empty delivery date for "out of stock"', () => {
    data.chosen['oos'] = true;
    const $delivery = updateDeliveryDate(data);
    expect($delivery.text()).to.be.empty;
  });

  it('should empty delivery date for "preorder"', () => {
    data.chosen['oos'] = true;
    const $delivery = updateDeliveryDate(data);
    expect($delivery.text()).to.be.empty;
  });
});
