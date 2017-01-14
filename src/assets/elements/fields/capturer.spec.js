import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import $ from 'jquery';

import inlineField from './capturer';
import inputText from '../../../partials/input-text.html';
import { triggerEvent } from '../../test/helpers/events';

chai.use(chaiJquery);

describe('Nested Field', () => {
  const create = (options={}) => {
    const fieldClassName = 'lebowski';
    const labelClassName = 'lebowski__label';
    const inputClassName = 'lebowski__input';
    const selected = 'selected';
    const filled = 'filled';
    const invalid = 'invalid';

    const opts = Object.assign({
      id: 'dude',
      label: 'The dude abides',
      pattern: 'https?://.+',
      fieldClassName,
      labelClassName,
      inputClassName,
      selected,
      filled,
      invalid,
    }, options);

    const html = inputText(opts);
    const $el = $(fixture.set(html));

    inlineField($el[0], {
      block: 'lebowski',
      inputElement: 'input',
      labelElement: 'label',
    });

    return Object.assign({}, opts, {
      $el,
      $label: $el.find(`.${labelClassName}`),
      $input: $el.find(`.${inputClassName}`),
    });
  };

  const addClassNames = ({ $el, $input, $label, fieldClassName, labelClassName, inputClassName }, ...modifiers) => {
    modifiers.forEach(modifier => {
      $el.addClass(`${fieldClassName}--${modifier}`);
      $input.addClass(`${inputClassName}--${modifier}`);
      $label.addClass(`${labelClassName}--${modifier}`);
    });
  };

  const assertHasClassNames = ({ $el, $input, $label, fieldClassName, labelClassName, inputClassName }, ...modifiers) => {
    modifiers.forEach(modifier => {
      expect($el).to.have.class(`${fieldClassName}--${modifier}`);
      expect($input).to.have.class(`${inputClassName}--${modifier}`);
      expect($label).to.have.class(`${labelClassName}--${modifier}`);
    });
  };

  const assertNoClassNames = ({ $el, $input, $label, fieldClassName, labelClassName, inputClassName }, ...modifiers) => {
    modifiers.forEach(modifier => {
      expect($el).to.not.have.class(`${fieldClassName}--${modifier}`);
      expect($input).to.not.have.class(`${inputClassName}--${modifier}`);
      expect($label).to.not.have.class(`${labelClassName}--${modifier}`);
    });
  };

  afterEach(() => fixture.cleanup());

  it('should fire off a focus event', () => {
    const obj = create();
    const { $input, selected, filled, invalid } = obj;

    addClassNames(obj, filled, invalid);

    triggerEvent($input, 'focus');

    assertHasClassNames(obj, selected);
    assertNoClassNames(obj, filled, invalid);
  });

  it('should provide a valid value when performing a blur', () => {
    const obj = create();
    const { $input, selected, filled, invalid } = obj;

    $input.val('http://lebowski.me');
    triggerEvent($input, 'focus', 'blur');

    assertHasClassNames(obj, filled);
    assertNoClassNames(obj, selected, invalid);
  });

  it('should provide a invalid value when performing a blur', () => {
    const obj = create();
    const { $input, selected, filled, invalid } = obj;

    $input.val('lebowski.me');
    triggerEvent($input, 'focus', 'blur');

    assertHasClassNames(obj, invalid, filled);
    assertNoClassNames(obj, selected);
  });
});
