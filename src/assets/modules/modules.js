import $ from 'jquery';
import 'slick-carousel';

import './modules.scss';
import './accordion';
import './toggle-display';
import './product-size-change';
import './product-add-to-bag';
import './product-color-change';
import './product-oos';
import './modal';


$.fn.navDropdowns = function( options ) {

    function toggleDropdown($el) {
      $el.find("ul").slideToggle("slow");
    }
    
 
    // Iterate and reformat each matched element.
    return this.each(function() {
      $(this).on("click", function(){
        toggleDropdown($(this));
      });
    console.log("BOOMS!!");
    });
    
};

$(document).ready(() => {
  $('.product__image--carousel').slick({
    lazyLoad: 'progressive',
    dots: true,
    dotsClass: 'product__image--carousel__dots',
    appendDots: '.product__image',
    arrows: false
  });
  $('.js-accordion').accordion();
  $('.js-toggle-display').toggleDisplay();
  $('.product-option--size .product-option__select').sizeChange();
  $('.product-option--color .product-option__select').colorChange();
  $('.btn--add-to-bag').addToBag();
  $('.product-option--oos').oosProduct();
  $(".js-modal").modal();
  $('#js-nav-dropdown').navDropdowns();
  $('#js-nav-dropdown--full').navDropdowns();
});
