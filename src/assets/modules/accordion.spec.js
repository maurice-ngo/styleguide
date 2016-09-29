import Accordion, { DEFAULTS as defaults } from './accordion';
import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

chai.use(chaiJquery);

describe('Accordion', () => {
  const assertNoHeight = ($el) => {
    expect($el.get(0).style.height).to.equal('');
  };

  const assertHeightAuto = ($el) => {
    expect($el.get(0).style.height).to.equal('auto');
  };

  beforeEach(() => {
    fixture.setBase('src/materials/modules');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  describe('when one tab is actively open', () => {
    let $container;

    beforeEach(() => {
      fixture.load('accordian-1.html');
      $container = $(fixture.el).find('.accordion');

      new Accordion($container.get(0), {
        accSpeed: 0
      });
    });

    it('should show the first tab as the active on initial load', () => {
      const $tab = $container.find(defaults.accItem).eq(0);
      expect($tab).to.have.class(defaults.accActive);
      assertHeightAuto($tab.find(defaults.accContent));
    });

    it('should open the second tab and close the initial active tab', () => {
      const $tabs = $container.find(defaults.accItem);
      const $activeTab = $tabs.eq(0);
      const $openTab = $tabs.eq(1);
      $openTab.find(defaults.accLabel).click();

      expect($activeTab).to.not.have.class(defaults.accActive);
      assertNoHeight($activeTab.find(defaults.accContent))

      expect($openTab).to.have.class(defaults.accActive);
      assertHeightAuto($openTab.find(defaults.accContent));
    });

    it('should close tab when interacted with and open', () => {
      const $tab = $container.find(defaults.accItem).eq(1);
      $tab.find(defaults.accLabel).click();
      expect($tab).to.have.class(defaults.accActive);

      $tab.find(defaults.accLabel).click();
      expect($tab).to.not.have.class(defaults.accActive);
    });
  });

  describe('when n number of tabs can actively be open', () => {
    beforeEach(() => {
      // load second fixture
    });

    it('should have no tabs open', () => {
    });

    it('should open two tabs and leave them both open', () => {
    })
  })
});
