// setup for product-option--size default color
(function ($) {
  var sizeDropdown = $('.product-option--size .product-option__select');
  // only continue if needed
  if (!sizeDropdown.length) return;

  var selected;

  // run whenever size dropdown changes
  sizeDropdown.change(function () {
    selected = this.options[this.selectedIndex];

    // toggleClass based on selected.value
    $(this).toggleClass('default', selected.value === 'default');
  });

  // run once immediately
  sizeDropdown.change();
})($);
