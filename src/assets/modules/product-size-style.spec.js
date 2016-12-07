import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import sizeStyle, { DEFAULT_CLASS } from './product-size-style';

chai.use(chaiJquery);

describe.only('product size style', () => {
  let $dropdown;
  let sizeEl;

  beforeEach(() => {
    fixture.set(`
      <select>
        <option value="default">default</option>
        <option value="other">other</option>
      </select>
    `);
    $dropdown = $(fixture.el).find('select');
    sizeEl = $dropdown[0];
  });

  afterEach(() => fixture.cleanup());

  it('should initially have a default value', () => {
    const value = $dropdown.val();
    sizeStyle({ sizeEl, chosen: { value }})
    expect($dropdown).to.have.value('default');
  });

  it('should initially have a default class', () => {
    const value = $dropdown.val();
    sizeStyle({ sizeEl, chosen: { value }})
    expect($dropdown).to.have.class(DEFAULT_CLASS);
  });

  it('should change the value not have a default value', () => {
    $dropdown.val('other');
    const value = $dropdown.val();
    sizeStyle({ sizeEl, chosen: { value }})
    expect($dropdown).to.have.value('other');
  });

  it('should change the value and not have a default class', () => {
    $dropdown.val('other');
    const value = $dropdown.val();
    sizeStyle({ sizeEl, chosen: { value }})
    expect($dropdown).to.not.have.class(DEFAULT_CLASS);
  });
});
