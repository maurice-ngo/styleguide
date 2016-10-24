/**
 * Updates CTA text when stock id changes
 * @module updateCTA
 */

import $ from'jquery';

export const PREORDER = 'Preorder This Item';
export const OOS = 'Notify Me / Special Order';

/**
 * Update CTA text based on selected value.
 * @param {jQueryElement} wrap - The closest '.product' wrap from the select
 * @param {HTMLElement} chosen - Selected option of select dropdown
 */
export default function updateCTA(wrap, chosen) {
  // get the cta
  const btn = wrap.find('button[type="submit"]');

  // update cta text
  btn.text(update(chosen));
};

const update = (option) => {
  // if data-attr, show notification
  if (check('oos'))
    return OOS;
  else if (check('preorder'))
    return PREORDER;

  function check(attr) {
    return option.getAttribute('data-' + attr)
      && option.getAttribute('data-' + attr) === 'true';
  }
}
