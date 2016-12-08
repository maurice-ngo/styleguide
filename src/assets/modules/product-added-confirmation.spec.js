import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import modalTemplate from '../../materials/modules/modals/product-added-confirmation.html';
import productTitleTemplate from '../../materials/modules/product-title-.html';
import productImageCarouselTemplate from '../../materials/modules/image-carousel.html';

chai.use(chaiJquery);

import addedConfirmation, {
  displayConfirmation,
  MODAL_CLASS,
  MODAL_CONTINUE_CLASS,
  TEMPLATE_ID,
  CONCEAL_CLASS,
} from './product-added-confirmation';

describe('product added confirmation', () => {
  let $fixture;
  let $modal;
  const productInfo = {
    name: 'The Dude',
    brand: 'Lebowski',
    alt: 'El Duderino',
    brandLink: 'http://lebowski.me',
    images: ['#', '#']
  };

  beforeEach(() => {
    fixture.set(`
      <div class="product">
        ${productTitleTemplate({ pdp: productInfo })}
        ${productImageCarouselTemplate(productInfo)}
        <select id="size">
          <option />
        </select>
      </div>

      <script id="${TEMPLATE_ID}" type="text/the-dude-abides">
        ${modalTemplate()}
      </script>
    `);
    $fixture = $(fixture.el);
    $modal = $(addedConfirmation({ container: $fixture[0] }));
  });

  afterEach(() => {
    fixture.cleanup();
  });

  describe('when setting up the modal', () => {
    it('should render the modal to the DOM', () => {
      expect($modal)
        .to.have.class(CONCEAL_CLASS)
        .and
        .to.have.class(MODAL_CLASS);
    });

    it('should insert the modal', () => {
      expect($modal).to.exist
        .and.to.have.class(CONCEAL_CLASS)
        .and.to.have.css('display', 'block');
    });

    it('should add the conceal class when modal class has been interacted with', () => {
      $modal
        .removeClass(CONCEAL_CLASS)
        .trigger('click');

      expect($modal).to.have.class(CONCEAL_CLASS);
    });

    it('should add the conceal class when modal continue class has been interacted with', () => {
      const target = $fixture.find(`.${MODAL_CONTINUE_CLASS}`);
      $modal
        .removeClass(CONCEAL_CLASS)
        .trigger('click', { target });

      expect($modal).to.have.class(CONCEAL_CLASS);
    });
  });

  describe('when displaying confirmation', () => {
    it('should populate product info', () => {
      const $sizeEl = $fixture.find('#size');
      const chosen = $sizeEl.find('option:selected')[0];
      $modal;
      displayConfirmation($modal[0], chosen, $sizeEl[0]);
      expect($modal.find('.product-name')).to.have.text(productInfo.name);
      expect($modal.find('.product-brand a'))
        .to.have.text(productInfo.brand)
        .and
        .to.have.attr('href', productInfo.brandLink);
    });
  });
});
