import $ from 'jquery';

import './elements.scss';
import './toggle-favorite';
import './fields/inline';
import './fields/validator';

$(document).ready(() => {
  $('.favorite-button').toggleFavorite();
  $('.inline-field').inlineField();
  $(document.querySelectorAll('[data-validate]')).validator();
});
