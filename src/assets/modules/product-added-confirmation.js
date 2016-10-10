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
    var CONCEAL_CLASS = 'u-conceal';

    // create the modal now, so we don't recreate on every submit
    var modal = document.createElement('DIV');
    // to override the default modal display: none
    modal.style.display = 'block';
    // hide using visibility, for transform
    modal.className = 'modal ' + CONCEAL_CLASS;
    modal.innerHTML = document.getElementById(template).innerHTML;

    // add modal once
    document.getElementById('content').appendChild(modal);
    // (unfortunately, waiting to append this when needed [in the form submit below] ruins our transition effect)

    // when the form submits, show the modal
    var form = $(this.element).closest('form');

    form.submit(function(e) {
      e.preventDefault();

      // reveal modal
      $(modal).removeClass(CONCEAL_CLASS);

      // set up the click listener to close modal
      $('.modal').click(function(e) {
        var target = $(e.target);

        // conceal if click is on the background or the 'continue' link
        if (target.hasClass('modal') || target.hasClass('modal__continue')) {
          e.preventDefault();
          // conceal modal again
          $(this).addClass(CONCEAL_CLASS);
        }
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
