/**
 * Loads images by replacing the src with data attr
 * @module load-images
 */

import $ from 'jquery';

import registerJQueryPlugin from '../lib/register-jquery-plugin';

export const PLUGIN_NAME = 'loadImages';
export const DEFAULT_OPTIONS = {
  selector: 'img',
  attr: 'data-src',
}

// Expose the function as a jQuery plugin for ease of use
registerJQueryPlugin(PLUGIN_NAME, loadImages);

/**
 * Initial function to find and load images
 * @param {HTMLElement} container - Container holding the images
 */
export default function loadImages( container, options = {} ) {
  const { selector, attr } = Object.assign({}, DEFAULT_OPTIONS, options);
  const images = $(container).find(selector);
  const len = images.length;

  for ( let i=0; i < len; i++ ) {
    const img = images[i];
    const src = img.getAttribute(attr);

    if ( src )
      img.setAttribute('src', src);
  }
};
