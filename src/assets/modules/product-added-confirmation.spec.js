import $ from'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

chai.use(chaiJquery);

import addedConfirmation, {
  MODAL_CLASS,
  MODAL_CONTINUE_CLASS,
  TEMPLATE_ID,
  TARGET_WRAP_ID,
  CONCEAL_CLASS,
} from './product-added-confirmation';

describe('product added confirmation', () => {
  let $fixture;
  let $el;
  let $target;

  beforeEach(() => {
    fixture.set(`
      <form id="some-form"><div id="form-content">in a form</div></form>
      <div id="${TARGET_WRAP_ID}"></div>
      <div id="${TEMPLATE_ID}">
        <button class="${MODAL_CONTINUE_CLASS}">Continue</button>
      </div>
    `);
    $fixture = $(fixture.el);
    $el = $fixture.find('#form-content');
    $target = $fixture.find(`#${TARGET_WRAP_ID}`);
    addedConfirmation($el[0]);
  });

  afterEach(() => {
    fixture.cleanup();
  });

  describe('in the modal', () => {
    it('should insert the modal', () => {
      const $modal = $target.find('.modal');
      expect($modal).to.exist
        .and.to.have.class(CONCEAL_CLASS)
        .and.to.have.css('display', 'block');
    });

    it('should add the conceal class when modal class has been interacted with', () => {
      const $modal = $target.find('.modal');
      $modal
        .removeClass(CONCEAL_CLASS)
        .trigger('click');

      expect($modal).to.have.class(CONCEAL_CLASS);
    });

    it('should add the conceal class when modal continue class has been interacted with', () => {
      const $modal = $target.find('.modal');
      const target = $target.find(`.${MODAL_CONTINUE_CLASS}`);
      $modal
        .removeClass(CONCEAL_CLASS)
        .trigger('click', { target });

      expect($modal).to.have.class(CONCEAL_CLASS);
    });
  });

  describe('when submitting the form', () => {
    it('should remove the conceal class', () => {
      $fixture.find('#some-form').trigger('submit');
      const $modal = $target.find('.modal');
      expect($modal).to.not.have.class(CONCEAL_CLASS);
    });
  });
});
