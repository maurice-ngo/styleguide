import $ from 'jquery';

import './elements.scss';
import './toggle-favorite';
import './fields/capturer';
import './fields/validator';

$(document).ready(() => {
  $('.favorite-button').toggleFavorite();

  $('.inline-field').capturer();
  $('.choice-field').capturer({
    block: 'choice-field',
    fieldElement: 'select',
  });

  $(document.querySelectorAll('[data-validate]')).validator();
});
