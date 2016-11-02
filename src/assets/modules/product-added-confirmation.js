/**
 * Sets up confirmation modal
 * @module addedConfirmation
 */

import $ from 'jquery';

import updatePrice from './product-price-update';
import infoTemplate from '../../materials/modules/product-title-small.html'

export const TEMPLATE_ID = 'product-added-confirmation';
export const CONCEAL_CLASS = 'u-conceal';
export const MODAL_CLASS = 'modal';
export const MODAL_CONTINUE_CLASS = 'modal__continue';
export const MODAL_BLOCK_CLASS = 'modal--added-confirmation';
export const PRODUCT_BLOCK_CLASS = 'product';
export const PRODUCT_IMG_CLASS = `${PRODUCT_BLOCK_CLASS}__image--carousel__image`;
export const PRODUCT_NAME_CLASS = `${PRODUCT_BLOCK_CLASS}__name`;
export const PRODUCT_BRAND_CLASS = `${PRODUCT_BLOCK_CLASS}__brand`;

const DEFAULT_OPTIONS = {
  container: document.body,
};

/**
 * Creates confirmation modal, adds click handler, and appends immediately
 * @param {HTMLElement} el - The select dropdown we're attaching to
 * @return {HTMLElement} Immutable modal element
 */
export default function addedConfirmation(options = {}) {
  const { container } = Object.assign({}, DEFAULT_OPTIONS, options);
  const modal = create();

  applyClickClose(modal);
  append(modal, container);

  return modal;
}

/**
 * External method to display confirmation modal.
 * @param {HTMLElement} modal - The confirmation modal to show
 * @param {HTMLElement} chosen - Selected option of select dropdown (or input for 1 size)
 * @param {HTMLElement} sizeEl - Size select element (or input for 1 size)
 */
export const displayConfirmation = (modal, chosen, sizeEl) => {
  const $modal = $(modal);
  const $product = $(`.${PRODUCT_BLOCK_CLASS}`);

  // update image
  updateImage($product, $modal);
  // update title
  updateInfo($product, $modal);
  // update price
  updatePrice($modal, MODAL_BLOCK_CLASS, chosen, sizeEl, 'small');

  reveal(modal);
}

/**
 * Updates image within modal
 @param {jQueryElement} product - Product wrapper where we can find info
 @param {jQueryElement} modal - Modal whose content we are updating
 */
const updateImage = (product, modal) => {
  const productImage = product.find(`.${PRODUCT_IMG_CLASS}`)[1];
  debugger;
  // slick pushes the last img to first, so use index 1
  const img = modal.find(`.${MODAL_BLOCK_CLASS}__image`)[0];

  img.alt = productImage.alt;
  img.src = productImage.src;
};

/**
 * Updates info within modal
 @param {jQueryElement} product - Product wrapper where we can find info
 @param {jQueryElement} modal - Modal whose content we are updating
 */
const updateInfo = (product, modal) => {
  const name = product.find(`.${PRODUCT_NAME_CLASS}`);
  const brand = product.find(`.${PRODUCT_BRAND_CLASS} a`);
  const data = {
    pdp: {
      name: name.text(),
      brand: brand.text(),
      brandLink: brand.attr('href'),
    }
  }
  const $info = modal.find(`.${MODAL_BLOCK_CLASS}__info`);

  $info.html(infoTemplate(data));
};

/**
 * Creates div.modal.
 * @return {HTMLElement} Immutable modal element
 */
const create = () => {
  // create the modal now, so we don't recreate on every submit
  let div = document.createElement('DIV');

  div.className = `${MODAL_CLASS} ${CONCEAL_CLASS}`;
  div.innerHTML = document.getElementById(TEMPLATE_ID).innerHTML;
  div.style.display = 'block'; // to override the default modal display: none

  return div;
};

/**
 * Appends el to target.
 * @param {HTMLElement} el - The confirmation modal to show
 */
const append = (el, container) => {
  // (unfortunately, waiting to append this when needed [in the form submit] ruins our transition effect)
  container.appendChild(el);
};

/**
 * Click listener to close confirmation modal
 * @param {HTMLElement} el - The confirmation modal to show
 */
const applyClickClose = el => {
  $(el).click(evt => {
    const $target = $(evt.target);

    // conceal if click is on the background or the 'continue' link
    if ($target.hasClass(MODAL_CLASS) || $target.hasClass(MODAL_CONTINUE_CLASS)) {
      evt.preventDefault();
      conceal(el);
    }
  });
};

/**
 * Method to conceal modal.
 * @param {HTMLElement} el - The confirmation modal to show
 */
const conceal = el => {
  // reveal confirmation modal
  $(el).addClass(CONCEAL_CLASS);
};
/**
 * Method to reveal modal.
 * @param {HTMLElement} el - The confirmation modal to show
 */
const reveal = el => {
  // reveal confirmation modal
  $(el).removeClass(CONCEAL_CLASS);
};
