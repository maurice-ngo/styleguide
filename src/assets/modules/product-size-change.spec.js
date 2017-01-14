import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import sinonChai from 'sinon-chai';

import sizeChange, { PRODUCT_BLOCK_CLASS, SIZE_ELEMENT_CLASS } from './product-size-change';

chai.use(chaiJquery);
chai.use(sinonChai);

describe('product size change', () => {
  let $fixture;

  beforeEach(() => {
    $fixture = $(fixture.set(`
      <div class="${PRODUCT_BLOCK_CLASS}">
        <select class="${SIZE_ELEMENT_CLASS}">
          <option value="1" data-regular-price="10">1</option>
          <option value="2" data-price="5">2</option>
        </select>
      </div>
    `));
  });

  afterEach(() => fixture.cleanup());

  it('should fire off a change event with the proper DOM structure', () => {
    const update = sinon.spy();
    const $size = $fixture.find(`.${SIZE_ELEMENT_CLASS}`);
    sizeChange($size[0], { update });
    $size.val('2').trigger('change');
    expect(update).to.have.been.calledOnce;
    update.reset();
  });
});
