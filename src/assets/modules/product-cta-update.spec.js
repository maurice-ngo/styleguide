import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import updateCTA, { CTA_SELECTOR } from './product-cta-update';
import { PRODUCT_BLOCK_CLASS } from './product-size-change';

import productTemplate from '../../materials/modules/product.html';

chai.use(chaiJquery);

describe('product cta update', () => {
  let $fixture;
  let product;
  const NEW_HTML = '<span>this is some new html</span>';
  const options = {
    chooseCTA: () => {
      return NEW_HTML;
    },
  };

  beforeEach(() => {
    fixture.set(productTemplate({}));
    $fixture = $(fixture.el);
    product = $fixture.find(`.${PRODUCT_BLOCK_CLASS}`);
  });

  afterEach(() => fixture.cleanup());

  it('should find the CTA wrap', () => {
    expect($(CTA_SELECTOR)).to.have.length.above(0);
  });

  it('should update the CTA wrap.html' , () => {
    const data = {
      wrap: product,
      allOnSale: false,
      chosen: {
        oos: false,
        preorder: false,
      },
    };
    updateCTA(data, options);
    const ctaWrap = $(CTA_SELECTOR);
    expect(ctaWrap.html()).to.equal(NEW_HTML);
  });
});
