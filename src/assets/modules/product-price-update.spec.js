import $ from'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import priceUpdate from './product-price-update';
import sizeChange, { PRICE_ATTR } from './product-size-change';

chai.use(chaiJquery);

describe('product price update', () => {
  let $dropdown;
  const options = {
    'no-money': 234,
    'park-ranger': 12,
  };

  beforeEach(() => {
    fixture.set(`
      <select id="dropdown">
        <option data-price="234">default</option>
        ${Object.keys(options)
          .map(name => `<option value="${name}">${options[name]}</option>`)
          .join('')}
      </select>
    `);
    $dropdown = $(fixture.el).find('#dropdown');
    sizeChange($dropdown);
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should capture the default price initially', () => {
    expect($dropdown).to.have.attribute(PRICE_ATTR);
  });

  it('should capture price on change', () => {
    $dropdown.val('park-ranger');
    sizeChange($dropdown);
    expect($dropdown).to.have.value('12');
  });
});
