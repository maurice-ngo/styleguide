import $ from 'jquery';
import chai, { expect } from 'chai';

import updateUnavailable, { VALUE } from './product-unavailable-update';

describe('product unavailable link', () => {
  let $fixture;
  let $sizeEl;
  let data;
  const ATTR = 'data-href';
  const ORIGINAL = 'turk';

  beforeEach(() => {
    fixture.set(`
      <select id="scrubs">
        <option value="default">JD</option>
      </select>
    `);
    $fixture = $(fixture.el);
    $sizeEl = $fixture.find('#scrubs');
    data = {
      sizeEl: $sizeEl[0],
      chosen: {},
    };
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should update the unavailable link with the new href', () => {
    updateUnavailable(data);
    const href = $sizeEl.find(`option[value="${VALUE}"]`).attr(ATTR);
    expect(href).to.not.equal(ORIGINAL);
  });

  it('should remove the unavailable link when all are in stock, and chosen is on sale', () => {
    data.allInStock = true;
    data.chosen.isOnSale = true;
    updateUnavailable(data);
    const option = $sizeEl.find(`option[value="${VALUE}"]`);
    expect(option).to.have.lengthOf(0);
  });
});
