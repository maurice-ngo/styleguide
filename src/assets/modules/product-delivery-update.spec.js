import $ from'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import deliveryUpdate, {
  ERROR_CLASS,
  DELIVERY_DATE_ATTR,
  PREORDER_ATTR,
  SIZE_CLASS,
  SELECT_CLASS,
  INFO_EL,
} from './product-delivery-update';

chai.use(chaiJquery);

describe('product delivery update', () => {
  let $productOption;
  let $delivery;
  const defaultText = 'That rug really tied the room together.';
  const options = {
    'nice-marmot': {
      text: 'Nice Marmot',
      dd: true,
    },
    'your-opinion': {
      text: `That's like you know, your opinion, man.`,
      dd: true,
      preorder: true,
    },
    'peed': {
      text: 'He peed on my rug!'
    }
  };
  const triggerChange = name => {
    $productOption
      .val(name)
      .trigger('change');

    return [ $delivery.find('span'), options[name].text ];
  };

  beforeEach(() => {
    fixture.set(`
      <form>
        <label class="${SIZE_CLASS}">
          Quotes
          <select id="product-option" class="${SELECT_CLASS}">
            ${Object.keys(options).map(name => {
              const opt = options[name];
              return `
                <option
                  value="${name}"
                  ${opt.dd ? `${DELIVERY_DATE_ATTR}="${opt.text}"` : ''}
                  ${opt.preorder ? `${PREORDER_ATTR}="true"` : ''}>
                  ${opt.text}
                </option>
              `;
            }).join('')}
          </select>
        </label>
        <p class="delivery">The dude says: <${INFO_EL}>${defaultText}</${INFO_EL}></p>
      </form>
    `);

    const $fixture = $(fixture.el);
    $delivery = $fixture.find(`.delivery`);
    $productOption = $fixture.find('#product-option');
    deliveryUpdate($delivery);
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should use the default text when no delivery date has been provided', () => {
    const [ $info ] = triggerChange('peed');
    expect($info).to.have.text(defaultText);
  });

  it('should change the delivery text', () => {
    const [ $info, text ] = triggerChange('nice-marmot');
    expect($info).to.have.text(text);
  });

  it('should change the delivery text and apply an error', () => {
    const [ $info, text ] = triggerChange('your-opinion');
    expect($info).to.have.text(text);
    expect($delivery).to.have.class(ERROR_CLASS);
  });
});
