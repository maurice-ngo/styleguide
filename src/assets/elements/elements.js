import $ from 'jquery';

import './elements.scss';
import './toggle-favorite'

$(document).ready(() => {
  $('.favorite-button').toggleFavorite();
});
