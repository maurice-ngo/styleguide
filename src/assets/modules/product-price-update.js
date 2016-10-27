/**
 * Updates price displayed when stock id changes
 * @module updatePrice
 */

import $ from'jquery';

import regularTemplate from '../../materials/modules/price/01-regular.html'
import saleTemplate from '../../materials/modules/price/02-on-sale.html'
import smallTemplate from '../../materials/modules/price/small.html'
import smallSaleTemplate from '../../materials/modules/price/small-on-sale.html'

export const REGULAR_PRICE_ATTR = 'data-regular-price';
export const PRICE_ATTR = 'data-price';
export const TEMPLATES = {
  regular: {
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
 * @param {jQueryElement} wrapEl - Product wrap
 * @param {String} wrapBlockClass - The BEM block class of the wrap
 * @param {HTMLElement} chosen - Selected option of select dropdown (or input for 1 size)
 * @param {HTMLElement} sizeEl - Size select element (or input for 1 size)
 * @param {String} templateStyle - Style of template to be used (TEMPLATES object defined above)
 */
export default function updatePrice(wrapEl, wrapBlockClass, chosen, sizeEl, templateStyle = 'regular') {
  // get the price element
  const $price = wrapEl.find(`.${wrapBlockClass}__price`);
  // set up data for handlebars template
  const defaultOption = sizeEl.options ? sizeEl.options[0] : chosen;
  const regularPrice = defaultOption.getAttribute(REGULAR_PRICE_ATTR) || defaultOption.getAttribute(PRICE_ATTR);
  const price = chosen.getAttribute(PRICE_ATTR) || regularPrice;
  const data = {
    pdp: {
      price: price,
      'regular-price': regularPrice
    }
  }
  const template = (parseFloat(price) < parseFloat(regularPrice)) ? TEMPLATES[templateStyle].sale : TEMPLATES[templateStyle].regular;

  $price.html(template(data));
};
