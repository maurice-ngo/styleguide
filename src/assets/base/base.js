import $ from 'jquery';

import './base.scss';
import loadImages from './load-images';

$(document).ready(() => {
  $('body').attr('ontouchstart', '');
});

$(window).load(() => {
  $('body').loadImages();
});
