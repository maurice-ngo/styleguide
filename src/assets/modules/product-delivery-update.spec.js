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
  const templateData = {
    'delivery-date': 'never',
    'regular-price': 'things?',
    sizes: [
      { 'delivery-date': 'foo', value: 'yo', price: 'sweet' },
    ]
  };

  beforeEach(() => {
    $product = $(fixture.set(`
      <div class="product">
      ${sizeTemplate({ pdp: templateData })}
      ${estimatedDeliveryTemplate()}
      </div>
    `));
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should should use the default delivery date', () => {
    deliveryUpdate($product, $product.find('option[value="default"]')[0]);
    const $delivery = $product.find(DELIVERY_CLASS);
    const $info = $delivery.find(INFO_EL);
    expect($info).to.have.text(templateData['delivery-date']);
  });

  it('should should use a selected delivery date', () => {
    const [size] = templateData.sizes;
    deliveryUpdate($product, $product.find(`[value="${size.value}"]`)[0]);
    const $info = $product.find(DELIVERY_CLASS).find(INFO_EL);
    expect($info).to.have.text(size['delivery-date']);
  });
});
