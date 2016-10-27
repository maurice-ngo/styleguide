/**
 * Applies page options set by URL Parameters
 * @module applyParams
 */

/**
 * Parse URL parameters, then apply chosen option(s)
 * @param {Object} option - Object containing information on the option,
 *     including title, template id, template html, and callback
 */
export default function applyParams( option ) {
  const { id, callback } = option;
  const params = splitParams(document.location.search);

  if (params[id] && typeof callback === 'function')
    callback(option);
}

/**
 * Parse URL parameters
 * @param {String} str - String containing selected options (or default to '?')
 * @return {Object} Parameters object
 */
const splitParams = ( str = '?' ) => {
  const params = str.substr(1).split('&');
  let obj = {};

  params.forEach( param => {
    const pair = param.split('=');
    const key = pair[0];
    const value = pair[1] || true;

    obj[key] = value;
  })

  return obj;
}
