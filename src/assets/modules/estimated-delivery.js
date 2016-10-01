// update delivery date
(function ($) {
  var delivery = $('.estimated-delivery');
  // only continue if needed
  if (!delivery.length) return;

  // estimated delivery text
  var date = delivery.children('span');
  // cache the default dext
  var defaultDateText = date.text();

  // find the correct size dropdown
  var form = $(delivery).closest('form');
  var sizeDropdown = form.find('.product-option--size .product-option__select');

  // run whenever size dropdown changes
  sizeDropdown.change(function () {
    var selected = this.options[this.selectedIndex];

    // update date span
    date.text(selected.getAttribute('data-delivery-date') || defaultDateText);

    // make preorder delivery-date red
    if (selected.getAttribute('data-preorder') === 'true')
      delivery.addClass('u-error');
    else
      delivery.removeClass('u-error');
  });

  // run once immediately
  sizeDropdown.change();
})($);
