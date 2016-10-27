import $ from'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import sizeChange from './product-size-change';

chai.use(chaiJquery);

describe('product size change', () => {
  let $dropdown;
  const options = {
    'default': `default`,
    'no-money': 'There never was any money',
    'park-ranger': 'What are you, a fucking park ranger now?',
    'great-plan': `That's a great plan, Walter`,
  };
  let runUpdates;

  beforeEach(() => {
    fixture.set(`
      <select id="dropdown">
        ${Object.keys(options)
          .map(name => `<option value="${name}">${options[name]}</option>`)
          .join('')}
      </select>
    `);
    $dropdown = $(fixture.el).find('#dropdown');
    runUpdates = sinon.spy();

    sizeChange($dropdown);
  });

  afterEach(() => {
    runUpdates.reset();
    fixture.cleanup();
  });

  it('should run updates upon selecting from the dropdown', () => {
    const dropdown = $dropdown[0];
    $dropdown.trigger('change');

    expect(runUpdates).to.have.been.calledWith(dropdown, dropdown.options, dropdown.selectedIndex);
  });

});
