/**
 * Updates price displayed when stock id changes
 * @module updatePrice
 */

import $ from 'jquery';

import { PRODUCT_BLOCK_CLASS } from './product-size-change';
import regularTemplate from '../../materials/modules/price/01-regular.html'
import saleTemplate from '../../materials/modules/price/02-on-sale.html'
import smallTemplate from '../../materials/modules/price/small.html'
import smallSaleTemplate from '../../materials/modules/price/small-on-sale.html'

export const TEMPLATES = {
  medium: {
    regular: regularTemplate,
    sale: saleTemplate,
  },
  small: {
    regular: smallTemplate,
    sale: smallSaleTemplate,
  }
};

/**
 * Update price based on selected value.
 * @param {HTMLElement} wrap - Product wrap
 * @param {String} wrapBlockClass - The BEM block class of the wrap
 * @param {Object} chosen - Object representing data from selected option of select dropdown (or input for 1 size)
 * @param {String} templateStyle - Style of template to be used (TEMPLATES object defined above)
 */
export default function updatePrice({ wrap, wrapBlockClass, regularPrice, chosen = {} }, templateStyle = 'medium') {
  const { price, isOnSale } = chosen;
  // get the price element
  const $priceEl = $(wrap).find(`.${wrapBlockClass}__price`);
  // set up data for handlebars template
  const data = {
    pdp: {
      price,
      'regular-price': regularPrice
    }
  };
  const template = isOnSale ? TEMPLATES[templateStyle].sale : TEMPLATES[templateStyle].regular;

  $priceEl.html(template(data));
};
