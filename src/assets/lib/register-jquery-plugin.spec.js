import $ from 'jquery';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import registerJQueryPlugin from './register-jquery-plugin';

chai.use(sinonChai);

describe('Create jQuery Plugin', () => {
  let sandbox;

  beforeEach(() => {
    fixture.set('<div id="dude">The dude abides</div>');
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a jQuery plugin', () => {
    const $dude = $('#dude');
    const spy = sandbox.spy();
    const opts = {
      abides: true
    };

    registerJQueryPlugin('abides', spy);
    $dude.abides(opts);
    expect(spy).to.have.been.calledWith($dude[0], opts);
  });

  it('should not attempt to call on plugin if call already exists', () => {
    const $dude = $('#dude');
    const spy = sandbox.spy();
    const opts = {
      abides: true
    };

    registerJQueryPlugin('abides', spy);
    $dude.abides(opts);
    $dude.abides(opts);
    expect(spy).to.have.been.calledOnce;
  });
});
