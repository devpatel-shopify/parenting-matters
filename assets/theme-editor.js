function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

function handleLoaderPopup(event) {
  let section = event.target
  if (event.type == "shopify:section:select" || event.type == "shopify:section:load") {
    if(section.matches('.main-loading-popup')){
      document.body.classList.add('loading-popup-enabled');
    }
  }else if(event.type = "shopify:section:deselect"){
    if(section.matches('.main-loading-popup')){
      document.body.classList.remove('loading-popup-enabled');
    }
  }
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', (event) => {
  hideProductModal();
  handleLoaderPopup(event)
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:select', (event) => {
  hideProductModal();
  handleLoaderPopup(event);
});

document.addEventListener('shopify:section:deselect', (event) => {
  hideProductModal()
  handleLoaderPopup(event);
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());
