/**
 * Class to create a new page option
 * @module option
 */

import addLink from './add-option-link'
import applyParams from './apply-params'
import getTemplate from './get-template'

/**
 * Find template and return the HTML
 * @param {String} title - the link's text to display
 * @param {String} id - id of the template (correlates to the handlebars partial)
 * @param {Function} callback - function to run when applying params
 */
export default function addOption( title, id, callback ) {
  const opt = {
    title: title,
    id: id,
    callback: callback,
    html: getTemplate(id),
  };

  // adds link to 'page options' list
  addLink(opt);
  // applies option to page when chosen
  applyParams(opt);
}
