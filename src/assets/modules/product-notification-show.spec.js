import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import showNotification, { NOTIFICATION_CLASS } from './product-notification-show';
import { updateChosenData } from '../lib/create-product-data';

import productTemplate from '../../materials/modules/product.html';
import finalSale from '../../materials/modules/product-notifications/final-sale.html';
import sampleDefect from '../../materials/modules/product-notifications/final-sale-sample-defect.html';
import oneLeft from '../../materials/modules/product-notifications/one-left.html';
import preorder from '../../materials/modules/product-notifications/preorder.html';

chai.use(chaiJquery);

describe('product notification show', () => {
  let product;

  beforeEach(() => {
    product = {
      wrap: fixture.el,
      chosen: {},
    }
  });

  afterEach(() => fixture.cleanup());

  it('should confirm the notification wrap is there', () => {
    fixture.set(productTemplate({}));
    expect($(`.${NOTIFICATION_CLASS}`)).to.have.length.above(0);
  });

  it('should remove any existing elements from the wrap', () => {
    fixture.set(productTemplate({}));
    showNotification(product);
    expect($(`.${NOTIFICATION_CLASS}`).html()).to.be.empty;
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
      fixture.set(productTemplate({ pdp }));
      updateChosenData(product, $(fixture.el).find(`option[value="${value}"]`)[0])
      showNotification(product);
      expect($(`.${NOTIFICATION_CLASS}`)).to.have.html(tt.expected());
    });
  });
});
