import $ from'jquery';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import colorChange from './product-color-change';

describe('color change', () => {
  let $fixture;
  let $dropdown;
  let redirectFunc;

  before(() => {
    fixture.setBase('src/materials/modules');
  });

  beforeEach(() => {
    fixture.set(`
      <select name="lebowski" id="lebowski-select">
        <option value="the-dude">The Dude</option>
        <option value="walter">Walter</option>
        <option value="">Donny</option>
      </select>
    `);
    $fixture = $(fixture.el);
    $dropdown = $fixture.find('#lebowski-select');
    redirectFunc = sinon.spy();

    colorChange($dropdown[0], { redirectFunc })
  });

  afterEach(() => {
    redirectFunc.reset();
    fixture.cleanup();
  });

  it('should do a redirect upon selecting from the dropdown', () => {
    const val = 'the-dude';
    $dropdown
      .val(val)
      .trigger('change');

    expect(redirectFunc).to.have.been.calledWith(val);
  });

  it('should not do a redirect upon selecting from the dropdown with no value', () => {
    $dropdown
      .val("")
      .trigger('change');

    expect(redirectFunc).to.not.have.been.called;
  });
});
