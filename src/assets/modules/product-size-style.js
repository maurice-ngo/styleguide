import $ from 'jquery';

// Settings
export const pluginName = 'sizeStyle';

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
    var sizeDropdown = $(this.element);
    // declare variables to be used within change function
    var selected;

    // run whenever size dropdown changes
    sizeDropdown.change(function () {
      selected = this.options[this.selectedIndex];

      // toggleClass based on selected.value
      $(this).toggleClass('default', selected.value === 'default');
    });

    // run once immediately
    sizeDropdown.change();
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
