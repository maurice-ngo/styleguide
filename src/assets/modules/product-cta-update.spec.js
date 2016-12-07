import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import { PRODUCT_BLOCK_CLASS } from './product-size-change';
import updateCTA, {
  CTA_WRAP_CLASS,
  ctaAddToBag,
  ctaPreorder,
  ctaNotifyMeSpecial,
  ctaNotifyMe,
} from './product-cta-update';

chai.use(chaiJquery);

describe('product cta update', () => {
  let $fixture;
  let $ctaWrap;
  let data;

  beforeEach(() => {
    fixture.set(`
      <div class="${PRODUCT_BLOCK_CLASS}">
        <div class="${CTA_WRAP_CLASS}"></div>
      </div>
    `);
    $fixture = $(fixture.el);
    $ctaWrap = $fixture.find(`.${CTA_WRAP_CLASS}`);
    data = {
      wrap: $fixture.find(`.${PRODUCT_BLOCK_CLASS}`)[0],
      chosen: {},
    };
  });

  afterEach(() => fixture.cleanup());

  it('should not throw an error when the CTA wrap exists', () => {
    expect(() => updateCTA(data)).to.not.throw(Error);
  });

  it('should throw an error when the CTA wrap does not exist', () => {
    $(data.wrap).empty()[0];
    expect(() => updateCTA(data)).to.throw(Error);
  });

  it('should show the ADD TO BAG CTA by default', () => {
    const ctaTemplate = ctaAddToBag();
    updateCTA(data);
    expect($ctaWrap).to.have.html(ctaTemplate);
  });

  it('should show the NOTIFY ME CTA when the chosen size is out of stock and all stock is on sale', () => {
    const ctaTemplate = ctaNotifyMe();
    data.allOnSale = true;
    data.chosen.oos = true;
    updateCTA(data);
    expect($ctaWrap).to.have.html(ctaTemplate);
  });

  it('should show the NOTIFY ME / SPECIAL ORDER CTA when the chosen size is out of stock and all stock is not on sale', () => {
    const ctaTemplate = ctaNotifyMeSpecial();
    data.chosen.oos = true;
    updateCTA(data);
    expect($ctaWrap).to.have.html(ctaTemplate);
  });

  it('should show the PREORDER CTA when the chosen size is on preorder', () => {
    const ctaTemplate = ctaPreorder();
    data.chosen.preorder = true;
    updateCTA(data);
    expect($ctaWrap).to.have.html(ctaTemplate);
  });
});
