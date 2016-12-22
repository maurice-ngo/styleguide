import $ from 'jquery';

import './elements.scss';
import './toggle-favorite';
import './fields/inline';

$(document).ready(() => {
  $('.favorite-button').toggleFavorite();
  $('.inline-field').inlineField();
});
