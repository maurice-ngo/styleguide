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
  let $fixture;
  const WRAP_BLOCK_CLASS = 'wrap-block-class';
  const PRICE_SELECTOR_NAME = `${WRAP_BLOCK_CLASS}__price`;

  beforeEach(() => {
    fixture.set(`
      <div id="wrap">
        <div class="${PRICE_SELECTOR_NAME}"></div>
      </div>

      <select id="size">
        <option value="1" ${REGULAR_PRICE_ATTR}="10.00">1</option>
        <option value="2" ${PRICE_ATTR}="20.00">2</option>
      </select>

      <select id="price">
        <option value="8.00" ${PRICE_ATTR}="8.00">8.00</option>
        <option value="20.00" ${PRICE_ATTR}="20.00">20.00</option>
      </select>
    `);
    $fixture = $(fixture.el);
  });

  afterEach(() => fixture.cleanup());

  it('should show an item on sale with a medium template style', () => {
    updatePrice(
      $fixture.find('#wrap'),
      WRAP_BLOCK_CLASS,
      $fixture.find('option[value="8.00"]')[0],
      $fixture.find('#size')[0],
      'medium',
    );

    expect($fixture.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(saleTemplate({
      pdp: {
        price: '8.00',
        'regular-price': '10.00',
      }
    }));
  });

  it('should show an item on sale with a small template style', () => {
    updatePrice(
      $fixture.find('#wrap'),
      WRAP_BLOCK_CLASS,
      $fixture.find('option[value="8.00"]')[0],
      $fixture.find('#size')[0],
      'small'
    );

    expect($fixture.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(smallSaleTemplate({
      pdp: {
        price: '8.00',
        'regular-price': '10.00',
      }
    }));
  });

  it('should show an item not on sale with a small template', () => {
    updatePrice(
      $fixture.find('#wrap'),
      WRAP_BLOCK_CLASS,
      $fixture.find('option[value="20.00"]')[0],
      $fixture.find('#size')[0],
      'small',
    );

    expect($fixture.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(smallTemplate({
      pdp: {
        price: '20.00',
        'regular-price': '20.00',
      }
    }));
  });

  it('should show an item not on sale with a medium template', () => {
    updatePrice(
      $fixture.find('#wrap'),
      WRAP_BLOCK_CLASS,
      $fixture.find('option[value="20.00"]')[0],
      $fixture.find('#size')[0],
      'medium',
    );

    expect($fixture.find(`.${PRICE_SELECTOR_NAME}`)).to.have.html(regularTemplate({
      pdp: {
        price: '20.00',
        'regular-price': '20.00',
      }
    }));
  });

  it('should show an item on sale with a class of on-sale on the wrap', () => {
    const $wrap = $fixture.find('#wrap');

    updatePrice(
      $wrap,
      WRAP_BLOCK_CLASS,
      $fixture.find('option[value="8.00"]')[0],
      $fixture.find('#size')[0],
      'medium',
    );

    expect($wrap).to.have.class(ON_SALE_CLASS);
  });

  it('should show an item not on sale without a class of on-sale on the wrap', () => {
    const $wrap = $fixture.find('#wrap');

    updatePrice(
      $wrap,
      WRAP_BLOCK_CLASS,
      $fixture.find('option[value="20.00"]')[0],
      $fixture.find('#size')[0],
      'medium',
    );

    expect($wrap).to.not.have.class(ON_SALE_CLASS);
  });
});
