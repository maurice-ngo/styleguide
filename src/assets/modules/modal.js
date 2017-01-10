/**
 * Handles all modals
 * @module modal
 */

import $ from 'jquery';
import registerJQueryPlugin from '../lib/register-jquery-plugin';
import trapFocus from './trap-focus';

// Expose the function as a jQuery plugin for ease of use
export const PLUGIN_NAME = 'modal';
export const DEFAULTS = {
  url: "",
  type: "",
  open: null,
  cache: true,
  overlayClose: true,
  triggerOpen: false,
  onComplete : function () {}
};
registerJQueryPlugin(PLUGIN_NAME, modal);


/**
 * Initializes modal.
 * @param {HTMLElement} $el - button /element that opens modal
 * @param {Object} options - Options used for wiring up the modal
 * @see DEFAULTS
 */
export default function modal($el, options = {}) {
  const opts = mergeOptions($el, options);
  const $modal = setModal($el, opts);
  const $modalOverlay = appendModalOverlay();
  const $modalContent = wrapModalContent($modal);
  const modalSettings = adjustToModalType($modal, opts);

  setEventListeners($el, $modal, $modalContent, $modalOverlay, modalSettings, opts);
  checkTriggerOpen($modal, $modalContent, $modalOverlay, modalSettings, opts);
}


/**
 * Merges together all the options and the various conditions in which they
 * can be set.
 * @param  {jQuery} $el - button /element that opens modal
 * @param  {Object} [options={}] - Any options provided upon initialization
 * @return {Object} Immutable version of the options
 */
const mergeOptions = ($el, options = {}) => {
  // Assign $modal to modal element either by options {} or $el's data attribute
  const $modal = $("#" + (options.open ? options.open : $( $el ).data("open")));
  const opts = Object.assign({}, DEFAULTS, $modal.data(), options);
  return opts;
};

/**
 * Check if options.url is define, if it is create an empty modal
 * otherwise target options.open or $el's data attribute
 * @param  {jQuery} $el - button /element that opens modal
 * @param  {Object} [options={}] - Any options provided upon initialization
 * @return {jQuery} modal element
 */
const setModal = ($el, options = {}) => {
  // Assign $modal to modal element either by options {} or $el's data attribute
  let $modal = $("#" + (options.open ? options.open : $( $el ).data("open")));
  // if options.url is define, prepend empty modal
  if (options.url) {
    $modal = appendModal();
  }
  $modal.appendTo("body");
  return $modal;
};

/**
 * Check if options.url is define, if it is create an empty modal
 * for ajax content. Otherwise, assign with options.open or $el's data attribute
 * @return {jQuery} modal element
 */
const appendModal = () => {
  const $modalHTML = $("<div/>",{class : "modal"});
  $modalHTML.appendTo("body");
  return $modalHTML;
}

/**
 * @return {jQuery} modal overlay element
 */
const appendModalOverlay = () => {
  if(!$(".modal-overlay").length) {
    $("<div class='modal-overlay'></div>").appendTo("body");
  }
  return $(".modal-overlay");
}

/**
 * Check if options.url is define, if it is create an empty modal
 * otherwise target options.open or $el's data attribute
 * @param  {jQuery} $el - modal element
 * @return {jQuery} modal content element
 */
const wrapModalContent = ($el) => {
  if(!$el.find(".modal__content").length) {
    $el.wrapInner("<div role='dialog' aria-label='modal' class='modal__content'></div>");
  }
  return $el.find(".modal__content");
};

/**
 * Adjust and set classes and options for appropriate modal type
 * @param  {jQuery} $el - modal element
 * @param  {Object} [options={}] - Any options provided upon initialization
 * @return {Object} Immutable modal settings
 */
const adjustToModalType = ($el, options = {}) => {
  let modalSettings = {
    overlayClose: true,
    pageScroll: false,
    overlay: true
  };
  switch(options.type) {
      case "full":
        $el.addClass("modal--full");
      break;
      case "top":
        $el.addClass("modal--top");
      break;
      case "notification":
        $el.addClass("modal--notification");
        modalSettings = {
          pageScroll: true,
          overlay: false
        }
      break;
  }
  return modalSettings;
};

/**
 * Applies any sort of event handlers for the modal.
 * @param  {jQuery} $el - button /element that opens modal
 * @param  {jQuery} $modal
 * @param  {jQuery} $modalContent
 * @param  {jQuery} $modalOverlay
 * @param  {Object} [modalSettings={}] - Modal Settings define by modal type
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
const setEventListeners = ($el, $modal, $modalContent, $modalOverlay, modalSettings, options = {}) => {
  // Add listener to button to open modal
  $( $el )
  .on("click", evt => openModalEventHandler($el, $modal, $modalContent, $modalOverlay, modalSettings, options));

  // Add listener modal content for modalCloseClass to close modal
  $modalContent
  .on("click", ".js-modal-close", evt => closeModal($modal, $modalContent, $modalOverlay, modalSettings, options) );

  // Stop the clicks from bubbling up
  $modalContent
  .on("click", evt => { evt.stopPropagation(); });

  // Add listener to outside of the modal if set true
  if(options.overlayClose) {
    $modal
    .on("click", evt => closeModal($modal, $modalContent, $modalOverlay, modalSettings, options) );
  }
};

/**
 * If triggerOpen option is set true open modal
 * @param  {jQuery} $modal
 * @param  {jQuery} $modalContent
 * @param  {jQuery} $modalOverlay
 * @param  {Object} [modalSettings={}] - Modal Settings define by modal type
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
const checkTriggerOpen = ($modal, $modalContent, $modalOverlay, modalSettings, options = {}) => {
  if(options.triggerOpen) {
    openModalEventHandler($modal, $modalContent, $modalOverlay, modalSettings, options);
  }

};

/**
 * Handles the click event when modal trigger/ button is clicked
 * @param  {jQuery} $modal
 * @param  {jQuery} $modalContent
 * @param  {jQuery} $modalOverlay
 * @param  {Object} [modalSettings={}] - Modal Settings define by modal type
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
const openModalEventHandler = ($el, $modal, $modalContent, $modalOverlay, modalSettings, options = {}) => {
  closeAllModals();

  // If url is passed then load ajax. Load or reload content only if content doesn't exist
  // or cache is set false
  if(options.url !== "" && !$modalContent.children().length || options.url !== "" && !opts.cache) {
    $.ajax({method: "POST", url: options.url })
    .done(function( content ) {
        $modalContent.append( content );
        options.onComplete();
        openModal($el, $modal, $modalContent, $modalOverlay, modalSettings, options);
    });
  } else {
    openModal($el, $modal, $modalContent, $modalOverlay, modalSettings, options);
  }

};

/**
 * Open modal
* @param  {jQuery} $el - button /element that opens modal
 * @param  {jQuery} $modal
 * @param  {jQuery} $modalContent
 * @param  {jQuery} $modalOverlay
 * @param  {Object} [modalSettings={}] - Modal Settings define by modal type
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
const openModal = ($el, $modal, $modalContent, $modalOverlay, modalSettings, options = {}) => {
  addActiveClass($modal);

  $modalContent.scrollTop(0);

  if(modalSettings.overlay) {
    addActiveClass($modalOverlay);
  }
  if(!modalSettings.pageScroll) {
    $("body").css({overflow:"hidden"});
  }
  if(options.type === "notification") {
    setNotificationDuration($modal, $modalContent, $modalOverlay, modalSettings, options);
  }

  // Shift and trap focus to modal
  // Get transition duration of modalcontent animation to focus on it
  var transitionDuration = $modalContent.css('transition-duration').replace("s","") * 1000 ;
  setTimeout(function(){
    $modalContent.trapFocus({lastFocus:$el});
  },transitionDuration);

};
/**
 * Set timeout for notification modal
 * @param  {jQuery} $modal
 * @param  {jQuery} $modalContent
 * @param  {jQuery} $modalOverlay
 * @param  {Object} [modalSettings={}] - Modal Settings define by modal type
 */
const setNotificationDuration = ($modal, $modalContent, $modalOverlay, modalSettings, options) => {
  // Set Timer base on number of words
  var numWords = $modalContent.text().replace(/^[\s,.;]+/, "").replace(/[\s,.;]+$/, "").split(/[\s,.;]+/).length;
  setTimeout(()=>{closeModal($modal, $modalContent, $modalOverlay, modalSettings, options)}, numWords * 400);
}
/**
 * Handles the click event to close the modal
 * @param  {jQuery} $modal
 * @param  {jQuery} $modalContent
 * @param  {jQuery} $modalOverlay
 * @param  {Object} [modalSettings={}] - Modal Settings define by modal type
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
const closeModal = ($modal, $modalContent, $modalOverlay, modalSettings, options = {}) => {

  if(modalSettings.overlay) {
    removeActiveClass($modalOverlay);
  }

  if(!modalSettings.pageScroll) {
    $("body").css({overflow:""});
  }

  removeActiveClass($modal);

  // Get transition duration of modalcontent animation to focus on it
  var transitionDuration = $modalContent.css('transition-duration').replace("s","") * 1000 ;
  setTimeout(function(){
    $modalContent.trapFocus("off");
    if(!options.cache) {
        $modalContent.empty();
    }
  },transitionDuration);
};

/**
 * Ensure one modal is open at a time
 * @param  {jQuery} $modal
 * @param  {jQuery} $modalOverlay
 */
const closeAllModals = () => {
  removeActiveClass($(".modal-overlay"), $(".modal"));
};

/**
 * Add active class on elements
 * @param  {rest}
 */
const addActiveClass = (...args) => {
  args.forEach(($el) => {
    $el.addClass("is-active");
  });
};

/**
 * Remove active class on elements
 * @param  {rest}
 */
const removeActiveClass = (...args) => {
  args.forEach(($el) => {
    $el.removeClass("is-active");
  });
};

/**
 * Utility Function for Modal
 * @param  {Object} [options={}] - Any options provided upon initialization
 */
$.modal = (options) => {
    options["triggerOpen"] = true;
    $("<div/>").modal(options);
}
