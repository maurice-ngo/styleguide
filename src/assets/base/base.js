import $ from 'jquery';

import './base.scss';
import loadImage from './load-image';

$(document).ready(() => {
  $('body').attr('ontouchstart', '');
});

$(window).load(() => {
  $('img').loadImage();
});
