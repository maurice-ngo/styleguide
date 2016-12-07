import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import sizeStyle, { DEFAULT_CLASS } from './product-size-style';
import sizeChange, { PRODUCT_BLOCK_CLASS, SIZE_ELEMENT_CLASS, SELECT_ELEMENT_CLASS } from './product-size-change';

chai.use(chaiJquery);

describe('product size style', () => {
  let $dropdown;
  const options = {
    'default': `default`,
    'no-money': 'There never was any money',
    'park-ranger': 'What are you, a fucking park ranger now?',
    'great-plan': `That's a great plan, Walter`,
  };
  const changeOptions = {
    update: sizeStyle,
  }

  beforeEach(() => {
    fixture.set(`
      <div class="${PRODUCT_BLOCK_CLASS}">
        <div class="${SIZE_ELEMENT_CLASS}">
          <select class="${SELECT_ELEMENT_CLASS}">
            ${Object.keys(options)
              .map(name => `<option value="${name}">${options[name]}</option>`)
              .join('')}
          </select>
        </div>
      </div>
    `);
    $dropdown = $(fixture.el).find(`.${SIZE_ELEMENT_CLASS} .${SELECT_ELEMENT_CLASS}`);
  });

  afterEach(() => fixture.cleanup());

  it('should capture the default value initially', () => {
    sizeChange($dropdown[0], changeOptions);
    $dropdown.trigger('change');
    expect($dropdown).to.have.value('default').and
      .to.have.class(DEFAULT_CLASS);
  });

  it('should capture non default value initially', () => {
    $dropdown.val('park-ranger');
    sizeChange($dropdown[0], changeOptions);
    $dropdown.trigger('change');
    expect($dropdown).to.have.value('park-ranger');
  });

  it('should change value and not have a default class', () => {
    $dropdown.val('no-money')
    sizeChange($dropdown[0], changeOptions);
    $dropdown.trigger('change');
    expect($dropdown).to.not.have.class(DEFAULT_CLASS);
  });
});
