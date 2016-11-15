import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import loadImage, { DEFAULT_OPTIONS } from './load-image';

chai.use(chaiJquery);

describe('load image', () => {
  const DATA_ATTR = DEFAULT_OPTIONS.attr;
  const OLD_SRC = '//:0';
  const NEW_SRC = [
    '//:jeffrey',
    '//:walter',
    '//:donald',
  ]
  const imgMap = NEW_SRC.map(src => `
    <img src="${OLD_SRC}" ${DATA_ATTR}="${src}" />
  `).join('');

  let $fixture;

  beforeEach(() => {
    $fixture = $(fixture.set(`
      <div>
        ${imgMap}
      </div>
    `));
  });

  afterEach(() => fixture.cleanup());

  it('should update src to not be original source', () => {
    const images = $fixture.find(`img`);
    const $images = $(images);

    $images.loadImage();
    expect($images).to.not.have.attr('src', OLD_SRC);
  });

  it('should update src attribute of all images to match deferred attribute', () => {
    const images = $fixture.find(`img`);
    let len = images.length;

    $(images).loadImage();

    // please help: is there better syntax to check this in 1 line? (like above)
    // i cannot find how to compare to an array, only strings
    while ( len-- ) {
      const $image = $(images[len]);
      const src = NEW_SRC[len];
      expect($image).to.have.attr('src', src);
    }
  });
});
