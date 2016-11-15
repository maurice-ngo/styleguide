import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import loadImage, { DEFAULT_OPTIONS } from './load-image';

chai.use(chaiJquery);

describe('load image', () => {
  const DATA_ATTR = DEFAULT_OPTIONS.attr;
  const OLD_SRC = '//:0';
  const NEW_SRC = [
    'http://s3.drafthouse.com/images/made/big-lebowski-4_758_426_81_s_c1.jpg',
    'http://s3.drafthouse.com/images/made/big-lebowski-4_758_426_81_s_c1.jpg',
    'http://s3.drafthouse.com/images/made/big-lebowski-4_758_426_81_s_c1.jpg',
  ]
  let $fixture;

  beforeEach(() => {
    $fixture = $(fixture.set(`
      <div>
        <img src="${OLD_SRC}" ${DATA_ATTR}="${NEW_SRC[0]}" />
        <img src="${OLD_SRC}" ${DATA_ATTR}="${NEW_SRC[1]}" />
        <img src="${OLD_SRC}" ${DATA_ATTR}="${NEW_SRC[2]}" />
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
