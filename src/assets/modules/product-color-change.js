import $ from 'jquery';

// Settings
export const pluginName = 'colorChange';

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
    var selected;

    $(this.element).change(function () {
      // get selected.value
      selected = this.options[this.selectedIndex];

      // change location.href
      if (selected.value)
        document.location.href = selected.value;
    })
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
