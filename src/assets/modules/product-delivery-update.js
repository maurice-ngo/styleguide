import $ from 'jquery';

// Settings
export const pluginName = 'deliveryUpdate';

// In case there are ever defaults
export const DEFAULTS = {
};

export default class Plugin {
  constructor(element, options) {
    this.element = element;
    this.options = $.extend( {}, DEFAULTS, options) ;

    this.init();
  }

  init() {
    // local reference to this.element
    var delivery = $(this.element);
    // declare variables to be used within change function
    var dateSpan, defaultDateText, selected;

    // find the correct size dropdown
    var form = delivery.closest('form');
    var sizeDropdown = form.find('.product-option--size .product-option__select');

    // run whenever size dropdown changes
    sizeDropdown.change(function () {
      // estimated delivery text, only get once
      dateSpan = dateSpan || delivery.children('span');
      // cache the default dext, only get once
      defaultDateText = defaultDateText || dateSpan.text();
      // get selected after every change
      selected = this.options[this.selectedIndex];

      // update date span
      dateSpan.text(selected.getAttribute('data-delivery-date') || defaultDateText);

      // make preorder delivery-date red
      delivery.toggleClass('u-error', selected.getAttribute('data-preorder') === 'true');
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
}
