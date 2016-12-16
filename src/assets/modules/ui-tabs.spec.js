import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import uiTabs, {
  NAV_CLASS,
  TAB_CLASS,
  LINK_CLASS,
  CONTENT_CLASS,
  ACTIVE_CLASS,
  DEFAULT_OPTIONS,
} from './ui-tabs';

chai.use(chaiJquery);

describe.only('ui tabs', () => {
  const { wrapClass } = DEFAULT_OPTIONS;
  const activeTabClass = `${wrapClass}__${TAB_CLASS}--${ACTIVE_CLASS}`;
  const activeContentClass = `${wrapClass}__${CONTENT_CLASS}--${ACTIVE_CLASS}`;
  const tabIds = [
    'tab-1',
    'tab-2',
  ];
  const clickTab = index => {
    const tab = $tabs.find(`.${wrapClass}__${TAB_CLASS}`)[index];
    $(tab).find(`.${wrapClass}__${LINK_CLASS}`).click();
    return tab;
  };
  const getEl = ( elClass, index ) => {
    return $tabs.find(`.${wrapClass}__${elClass}`)[index];
  }

  let $tabs;

  beforeEach(() => {
    fixture.set(`
      <div class="${wrapClass}">
        <ul class="${wrapClass}__${NAV_CLASS}">
          <li class="${wrapClass}__${TAB_CLASS}"><a class="${wrapClass}__${LINK_CLASS}" href="#${tabIds[0]}">Tab 1</a></li>
          <li class="${wrapClass}__${TAB_CLASS}"><a class="${wrapClass}__${LINK_CLASS}" href="#${tabIds[1]}">Tab 2</a></li>
        </ul>

        <div id="${tabIds[0]}" class="${wrapClass}__${CONTENT_CLASS}">
          Tab 1 Content
        </div>

        <div id="${tabIds[1]}" class="${wrapClass}__${CONTENT_CLASS}">
          Tab 2 Content
        </div>
      </div>
    `);
    $tabs = $(fixture.el).find(`.${wrapClass}`);
    $tabs.tabs();
  });

  afterEach(() => fixture.cleanup());

  it('should initially set the 1st tab to active', () => {
    const el = getEl(TAB_CLASS, 0);
    const expected = activeTabClass;

    expect($(el)).to.have.class(expected);
  });

  it('should initially set the 1st content to active', () => {
    const el = getEl(CONTENT_CLASS, 0);
    const expected = activeContentClass;

    expect($(el)).to.have.class(expected);
  });

  it('should on click set the 2nd tab to active', () => {
    const el = clickTab(1);
    const expected = activeTabClass;

    expect($(el)).to.have.class(expected);
  });

  it('should on click set the 2nd content to active', () => {
    const el = getEl(CONTENT_CLASS, 1);
    const expected = activeContentClass;

    clickTab(1);
    expect($(el)).to.have.class(expected);
  });

  it('should on click of 2nd tab remove active class from 1st tab', () => {
    const el = getEl(TAB_CLASS, 0);
    const expected = activeTabClass;

    clickTab(1);
    expect($(el)).to.have.not.class(expected);
  });

  it('should on click of 2nd tab remove active class from 1st content', () => {
    const el = getEl(CONTENT_CLASS, 0);
    const expected = activeContentClass;

    clickTab(1);
    expect($(el)).to.have.not.class(expected);
  });
});
