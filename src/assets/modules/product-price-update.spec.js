import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import updatePrice, {
  PRICE_ATTR,
  REGULAR_PRICE_ATTR,
  ON_SALE_CLASS,
} from './product-price-update';
import regularTemplate from '../../materials/modules/price/01-regular.html'
import saleTemplate from '../../materials/modules/price/02-on-sale.html'
import smallTemplate from '../../materials/modules/price/small.html'
import smallSaleTemplate from '../../materials/modules/price/small-on-sale.html'

chai.use(chaiJquery);

describe('product price update', () => {
  let $wrap;
  let data;
  let pdp;
  const WRAP_BLOCK_CLASS = 'wrap';
  const SIZE_ELEMENT_CLASS = 'sizeEl';
  const PRICE_SELECTOR_NAME = `${WRAP_BLOCK_CLASS}__price`;
  const REGULAR_PRICE = '20';
  const PRICE = '10';

  beforeEach(() => {
    fixture.set(`
      <div class="${WRAP_BLOCK_CLASS}">
        <div class="${PRICE_SELECTOR_NAME}"></div>
      </div>
    `);
    $wrap = $(fixture.el).find(`.${WRAP_BLOCK_CLASS}`);
    data = {
      wrap: $wrap[0],
      wrapBlockClass: WRAP_BLOCK_CLASS,
      regularPrice: REGULAR_PRICE,
      chosen: {
        price: false,
        isOnSale: false,
      }
    };
    pdp = {
      price: PRICE,
      'regular-price': REGULAR_PRICE,
    };
  });

  afterEach(() => fixture.cleanup());

  it('should show an item on sale with a medium template style', () => {
    const template = saleTemplate;
    const style = 'medium';

    data.chosen.price = pdp.price;
    data.chosen.isOnSale = data.chosen.price < pdp['regular-price'];
    updatePrice(data, style);

    expect($wrap.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(template({ pdp }));
  });

  it('should show an item on sale with a small template style', () => {
    const template = smallSaleTemplate;
    const style = 'small';

    data.chosen.price = pdp.price;
    data.chosen.isOnSale = data.chosen.price < pdp['regular-price'];
    updatePrice(data, style);

    expect($wrap.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(template({ pdp }));
  });

  it('should show an item not on sale with a small template', () => {
    const template = smallTemplate;
    const style = 'small';
    pdp.price = pdp['regular-price'];

    data.chosen.price = pdp.price;
    data.chosen.isOnSale = data.chosen.price < pdp['regular-price'];
    updatePrice(data, style);

    expect($wrap.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(template({ pdp }));
  });

  it('should show an item not on sale with a medium template', () => {
    const template = regularTemplate;
    const style = 'medium';
    pdp.price = pdp['regular-price'];

    data.chosen.price = pdp.price;
    data.chosen.isOnSale = data.chosen.price < pdp['regular-price'];
    updatePrice(data, style);

    expect($wrap.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(template({ pdp }));
  });
});
