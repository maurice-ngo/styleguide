import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import sizeTemplate from '../../materials/modules/product-options/size.html';
import estimatedDeliveryTemplate from '../../materials/modules/product-estimated-delivery.html';

import deliveryUpdate, {
  INFO_EL,
  DELIVERY_CLASS,
} from './product-delivery-update';

chai.use(chaiJquery);

describe('product delivery update', () => {
  let $product;
  let data;
  const ORIGINAL_DATE = 'cool';
  const NEW_DATE = 'beans';

  beforeEach(() => {
    $product = $(fixture.set(`
      <div class="product">
      ${estimatedDeliveryTemplate()}
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

  it('should should use the default delivery date', () => {
    deliveryUpdate(data);
    const $delivery = $product.find(DELIVERY_CLASS);
    const $info = $delivery.find(INFO_EL);
    expect($info).to.have.text(ORIGINAL_DATE);
  });

  it('should should use a selected delivery date', () => {
    data.chosen['delivery-date'] = NEW_DATE;
    deliveryUpdate(data);
    const $info = $product.find(DELIVERY_CLASS).find(INFO_EL);
    expect($info).to.have.text(NEW_DATE);
  });
});
