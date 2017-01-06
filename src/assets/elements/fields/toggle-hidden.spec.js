import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import input from '../../../partials/input-text.html';
import toggleHidden, { DEFAULT_OPTIONS } from './toggle-hidden'

describe('Toggle Hidden', () => {
  const { fieldClassName, hiddenModifier } = DEFAULT_OPTIONS;
  const hiddenClassName = `${fieldClassName}--${hiddenModifier}`;
  const ELEMENT_ID = 'email';
  let $form;
  let $inputElement;
  let inputElement;

  beforeEach( () => {
    $form = $(fixture.set(`
      <form>
        ${input({ id: ELEMENT_ID, label: "email", fieldClassName })}
      </form>
    `));
    $inputElement = $form.find(`#${ELEMENT_ID}`);
    inputElement = $inputElement[0];
  });

  afterEach(() => fixture.cleanup());

  it('should find a field wrapper', () => {
    expect($inputElement.closest('.field')).to.have.length.above(0);
  });

  describe('When form element should be hidden', () => {
    const shouldHide = true;

    it('should disable the form element', () => {
      toggleHidden(inputElement, shouldHide);
      expect($inputElement).to.be.disabled;
    });

    it('should hide the field wrapper', () => {
      const $field = toggleHidden(inputElement, shouldHide);
      expect($field).to.have.class(hiddenClassName);
    });
  });

  describe('When form element should be visible', () => {
    const shouldHide = false;

    it('should not disable the form element', () => {
      toggleHidden(inputElement, shouldHide);
      expect($inputElement).not.to.be.disabled;
    });

    it('should not hide the field wrapper', () => {
      const $field = toggleHidden(inputElement, shouldHide);
      expect($field).to.not.have.class(hiddenClassName);
    });
  });
});
