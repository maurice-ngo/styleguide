import $ from 'jquery';

// Settings
export const pluginName = 'addedConfirmation';

// In case there are ever defaults
export const DEFAULTS = {
  'template': 'product-added-confirmation'
};

export default class Plugin {
  constructor(element, options) {
    this.element = element;
    this.options = $.extend( {}, DEFAULTS, options) ;

    this.init();
  }

  init() {
    // cache this.options.template id
    var template = this.options.template;

    // create the modal now, so we don't recreate on every submit
    var modal = document.createElement('DIV');
    modal.className = 'modal';

    // when the form submits, show the modal
    var form = $(this.element).closest('form');

    form.submit(function(e) {
      e.preventDefault();
      // add modal
      modal.style.display = 'block';
      modal.innerHTML = document.getElementById(template).innerHTML;
      document.getElementById('content').appendChild(modal);

      // set up the continue/close button
      $('.modal__continue').click(function(e) {
        e.preventDefault();
        // close modal
        modal.style.display = 'none';
      });
    });
  }
};

// Plugin wrapped ctor
$.fn[pluginName] = function ( options ) {
  return this.each(function () {
    if (!$.data(this, 'plugin_' + pluginName)) {
      $.data(this, 'plugin_' + pluginName,
      new Plugin( this, options ));
    }
  });
};
