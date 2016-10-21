import $ from 'jquery';

import runPage from './scripts/mock/run-page'

$(document).ready(() => {
  runPage(window.pageName);
});
