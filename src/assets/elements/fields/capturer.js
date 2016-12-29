import registerJQueryPlugin from '../../lib/register-jquery-plugin';

/**
 * Defines default options for things
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
  block: 'inline-field',
  fieldElement: 'input',
  labelElement: 'label',
  filledModifier: 'filled',
  invalidModifier: 'invalid',
  selectedModifier: 'selected',
};

const PLUGIN_NAME = 'capturer';

registerJQueryPlugin(PLUGIN_NAME, inlineField);

/**
 * Responsible for taking in a field and applying classNames so that the
 * corresponding CSS is able to style it based on the state. The styling
 * corresponds to having an input appear as having inline properties or in
 * other words, have the label inside the input. Take the following HTML
 * structure:
 *
 * @example
 * <div class="inline-field">
 *   <label for="name" class="inline-field__label">Name</label>
 *   <input id="name" class="inline-field__input" type="email">
 * </div>
 *
 * Now given this structure, the following events/conditions will be applied:
 * - when a focus event occurs on the input, a selected className is applied
 * to every associated element as a modifier.
 * - when a blur event occurs and there is a value, a filled modifier is
 * applied
 * - when a blur event occurs and the element is found invalid (based on
 * attributes set on the input), the invalid modifier is applied
 *
 * The thing to note here. Any level of validation is handled on an element
 * level. Therefore, if there is a type email, it'll apply the rules coming
 * from the browser. The same goes for when a pattern has been provided.
 *
 * The motivation for this code comes from the limitation of CSS and not being
 * able to traverse up the DOM and an input not allowing a before or after
 * pseudo class. Otherwise, this would be a pure CSS solution.
 * @param {HTMLElement} el - An element receiving inline treatment
 * @param {Object} [options={}] - Configurable options
 */
export default function inlineField(el, options={}) {
  const {
    block,
    fieldElement,
    labelElement,
    filledModifier,
    invalidModifier,
    selectedModifier,
  } = Object.assign({}, DEFAULT_OPTIONS, options);
  const fieldNode = el.querySelector(`.${block}__${fieldElement}`);
  const labelNode = el.querySelector(`.${block}__${labelElement}`);
  const els = [
    {
      node: el,
    },
    {
      element: fieldElement,
      node: fieldNode,
    },
    {
      element: labelElement,
      node: labelNode,
    }
  ];

  fieldNode.addEventListener('focus', () => {
    addClassNames(block, els, selectedModifier);
    removeClassNames(block, els, filledModifier, invalidModifier);
    fieldNode.setCustomValidity('');
  });

  fieldNode.addEventListener('blur', e => {
    removeClassNames(block, els, selectedModifier, filledModifier, invalidModifier);

    if (el.querySelector(':invalid') === fieldNode) {
      addClassNames(block, els, invalidModifier);
    }

    if (e.target.value) {
      addClassNames(block, els, filledModifier);
    }
  });

  fieldNode.addEventListener('invalid', e => {
    addClassNames(block, els, invalidModifier);
  });
}

/**
 * Simple helper which adds a className to any HTML elements or "nodes".
 * @param {string} block - The block name
 * @param {Array} nodes - An array containing objects of element name and node.
 * @param {...string} modifiers - Modifier names
 */
const addClassNames = (block, nodes, ...modifiers) => {
  updateClassNames('add', block, nodes, ...modifiers);
};

/**
 * Simple helper which removes a className to any HTML elements or "nodes".
 * @param {string} block - The block name
 * @param {Array} nodes - An array containing objects of element name and node.
 * @param {...string} modifiers - Modifier names
 */
const removeClassNames = (block, nodes, ...modifiers) => {
  updateClassNames('remove', block, nodes, ...modifiers);
};

/**
 * Based on the operation, will apply a classList operation on a list of
 * elements or "nodes". They are referred to as nodes instead of elements to
 * not be confused with an element in BEM, which is used as a reference.
 * @param {string} operation - The operation to perform, i.e. add or remove
 * @param {string} block - The block name
 * @param {Array} nodes - An array containing objects of element name and node.
 * @param {...string} modifiers - Modifier names
 */
const updateClassNames = (operation, block, nodes, ...modifiers) => {
  nodes.forEach(({ element, node }) => {
    const classNames = buildClassNames(block, element, ...modifiers);
    node.classList[operation](...classNames);
  });
};

/**
 * Builds out a set of modifier classNames in BEM fashion.
 * @param {string} block - The block name
 * @param {string} element - The element name
 * @param {...string} modifiers - Modifier names
 */
const buildClassNames = (block, element, ...modifiers) => {
  return modifiers.map(modifier => {
    let className = `${block}`;

    if (!!element) {
      className += `__${element}`;
    }

    return `${className}--${modifier}`;
  });
};
