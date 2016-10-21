/**
 * Gets HTML template from the page
 * @module getTemplate
 */

/**
 * Find template and return the HTML
 * @param {String} id - id of the template (correlates to the handlebars partial)
 * @return {HTML} innerHTML of template
 */
export default function getTemplate(id) {
  return document.getElementById(id).innerHTML;
}
