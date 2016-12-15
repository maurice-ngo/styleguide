import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import toggleFavorite, { ACTIVE_CLASS } from './toggle-favorite';

chai.use(chaiJquery);

describe('Toggle Favorite', () => {
  let $button;

  beforeEach(() => {
    fixture.setBase('src/materials/elements/favorite-buttons');
    fixture.load('default.html');
    $button = $(fixture.el).find('button');

    toggleFavorite($button[0]);
  });

  it('should add an active class when button has been clicked', () => {
    $button.trigger('click');
    expect($button).to.have.class(ACTIVE_CLASS);
  });

  it('should remove an active class when an active button has been clicked', () => {
    $button.addClass(ACTIVE_CLASS)
    $button.trigger('click');
    expect($button).to.not.have.class(ACTIVE_CLASS);
  });
});
