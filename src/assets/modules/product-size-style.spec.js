import $ from'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import sizeStyle, { DEFAULT_CLASS } from './product-size-style';

chai.use(chaiJquery);

describe('product size style', () => {
  let $dropdown;
  const options = {
    'default': `default`,
    'no-money': 'There never was any money',
    'park-ranger': 'What are you, a fucking park ranger now?',
    'great-plan': `That's a great plan, Walter`,
  };

  beforeEach(() => {
    fixture.set(`
      <select id="dropdown">
        ${Object.keys(options)
          .map(name => `<option value="${name}">${options[name]}</option>`)
          .join('')}
      </select>
    `);
    $dropdown = $(fixture.el).find('#dropdown');
    sizeStyle($dropdown);
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should capture the default value initially', () => {
    expect($dropdown).to.have.value('default').and
      .to.have.class(DEFAULT_CLASS);
  });

  it('should capture non default value initially', () => {
    $dropdown.val('park-ranger');
    sizeStyle($dropdown);
    expect($dropdown).to.have.value('park-ranger');
  });

  it('should change value and not have a default class', () => {
    $dropdown
      .val('no-money')
      .trigger('change');
    expect($dropdown).to.not.have.class(DEFAULT_CLASS);
  });
});