// setup for product-option--size default color
(function ($) {
  var sizeDropdown = $('.product-option--size .product-option__select');
  // only continue if needed
  if (!sizeDropdown.length) return;

  // run whenever size dropdown changes
  sizeDropdown.change(function () {
    var selected = this.options[this.selectedIndex];

    if (selected.value === 'default')
      $(this).addClass('default');
    else
      $(this).removeClass('default');
  });

  // run once immediately
  sizeDropdown.change();
})($);
