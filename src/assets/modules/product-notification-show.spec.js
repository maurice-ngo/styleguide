import $ from'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import showNotification, {
  WRAP_ID,
} from './product-notification-show';
import sizeTemplate from '../../materials/modules/product-options/size.html';

import finalSale from '../../materials/modules/product-notifications/final-sale.html';
import sampleDefect from '../../materials/modules/product-notifications/final-sale-sample-defect.html';
import oneLeft from '../../materials/modules/product-notifications/one-left.html';
import preorder from '../../materials/modules/product-notifications/preorder.html';

chai.use(chaiJquery);

describe('product notification show', () => {
  const renderSizeTemplate = (data = {}) => {
    fixture.set(`
      <div id="${WRAP_ID}"></div>
      ${sizeTemplate(data)}
    `);

    return $(fixture.el).find('.product-option');
  };

  afterEach(() => fixture.cleanup());

  it('should remove any existing elements from the wrap', () => {
    fixture.set(`<div id="${WRAP_ID}">things</div>`);
    showNotification($('<option/>')[0]);
    expect($(`#${WRAP_ID}`).html()).to.be.empty;
  });

  it('should render the various option values', () => {
    const table = [
      {
        input: 'sample-defect',
        expected: sampleDefect,
      },
      {
        input: 'final-sale',
        expected: finalSale,
      },
      {
        input: 'one-left',
        expected: oneLeft,
      },
      {
        input: 'preorder',
        expected: preorder,
      }
    ];

    table.forEach(tt => {
      const value = 'some-value';
      const pdp = {
        sizes: [{
          value,
          [tt.input]: true,
        }]
      };
      const $productOption = renderSizeTemplate({ pdp });
      showNotification($productOption.find(`option[value="${value}"]`)[0]);
      expect($(`#${WRAP_ID}`)).to.have.html(tt.expected());
    });
  });
});
