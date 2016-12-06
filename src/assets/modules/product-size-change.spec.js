import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import sizeChange, { PRODUCT_BLOCK_CLASS, SIZE_ELEMENT_CLASS, SELECT_ELEMENT_CLASS } from './product-size-change';

chai.use(chaiJquery);

describe('product size change', () => {
  let $fixture;

  beforeEach(() => {
    $fixture = $(fixture.set(`
      <div class="${PRODUCT_BLOCK_CLASS}">
        <div class="${SIZE_ELEMENT_CLASS}">
          <select class="${SELECT_ELEMENT_CLASS}">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
    `));
  });

  afterEach(() => fixture.cleanup());

  it('should fire off a change event with the proper DOM structure', () => {
    const $size = $fixture.find(`.${SIZE_ELEMENT_CLASS} .${SELECT_ELEMENT_CLASS}`);
    sizeChange($size, { update: () => {} });
    $size.find('option[value="1"]').trigger('change');
  });
});
