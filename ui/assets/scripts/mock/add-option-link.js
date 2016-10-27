/**
 * Add a link to the 'page options' section
 * @module addOptionLink
 */

export const UL_ID = 'mock-page-options';
const list = document.getElementById(UL_ID);

/**
 * Create & append link
 * @param {String} title - the link's text to display
 * @param {String} id - correlates to the id of the template/partial,
 *   used to apply corresponding options to the page
 */
export default function addOptionLink({ title, id }) {
  const li = document.createElement('li');

  li.innerHTML = `<a href="?${id}">{title}</a>`;
  list.appendChild(li);
}
