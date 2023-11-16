/**
 * Open all external links in new Tab
 */
{
  document.querySelectorAll('a[href]').forEach(button => {
    let newUrl = new URL(button.href);
    if(newUrl.origin != window.shopUrl) button.setAttribute('target',"_blank");
  });
}

/**
 * Toggle button Listener
 */
{
  document.querySelectorAll('.js-toggle-btn').forEach(button => {
    button.addEventListener('click',function(){
      this.classList.toggle('open');
      let openText = this.dataset.btnTxt || 'Open';
      let closeText = this.dataset.expandedBtnTxt || 'Close';
      let target = this.dataset.target;
      this.querySelector('.js-btn-text').innerText = (this.classList.contains('open')) ? closeText : openText;
      if(document.getElementById(target)) document.getElementById(target).classList.toggle('hidden',!this.classList.contains('open'));
    });
  });
}

/**
 * Section Scroll Button Listener
 */
{
  document.querySelectorAll('[data-section-scroll-trigger]').forEach(button => {
    button.addEventListener('click',function() {
      let triggerElemenet = document.getElementById(this.dataset.sectionScrollTrigger);
      if (triggerElemenet) {
        let scrollDistance = triggerElemenet.offsetTop - document.querySelector(".header").offsetHeight;
        document.documentElement.scrollTo({
          top: scrollDistance,
          behavior: "smooth"
        });
      }
    });
  });
}

let customelements = document.querySelectorAll('[data-section-scroll]');
if(customelements){
customelements.forEach(function (element) {
  element.addEventListener('click', _scrollToDown.bind(this), true);
});
function _scrollToDown(event) {
  let elementToScrolls = event.currentTarget.closest('.jump-block').querySelectorAll('.jump-redirect-block');
  elementToScrolls.forEach(function (elementToScroll) {
    if (elementToScroll.getAttribute('id') == event.target.getAttribute('id')) {
      event.preventDefault();
      let scrollDistance = elementToScroll.offsetTop - document.querySelector('.header').offsetHeight;
      document.documentElement.scrollTo({ top: scrollDistance, behavior: 'smooth' });
    }
  });
}
}

let customhideButtons = document.querySelectorAll('.js-hide-block');
let customshowButtons = document.querySelectorAll('.js-show-block');
if(customhideButtons){
customhideButtons.forEach(function (hideButton) {
  hideButton.addEventListener('click', function (button) {
    button.target.closest('.jump-redirect-block').querySelector('.js-hide-element').style.display = 'block';
    button.target.closest('.jump-redirect-block').querySelector('.js-show-block').classList.remove('hidden');
    button.target.closest('.js-hide-block').classList.add('hidden');
  });
});
}
if(customshowButtons){
customshowButtons.forEach(function (showButton) {
  showButton.addEventListener('click', function (button) {
    button.target.closest('.jump-redirect-block').querySelector('.js-hide-element').style.display = 'none';
    button.target.closest('.jump-redirect-block').querySelector('.js-hide-block').classList.remove('hidden');
    button.target.closest('.js-show-block').classList.add('hidden');
  });
});
}
// script for benefit dropdown
document.querySelectorAll('.js-read-more').forEach((button) => {
  button.addEventListener('click', () => {
      console.log("button",button);
    button.classList.toggle('open');
    let innerCard = button.closest('.inner-boxes').querySelectorAll('.inner-card');
    innerCard.forEach((card, index) => {
    // console.log("index",index,card);
      if (index > 3)
        button.classList.contains('open') ? card.classList.remove('hidden') : card.classList.add('hidden');
    });
    button.querySelector('.btn-text').innerText = button.classList.contains('open') ? 'Read less' : 'Read more';
  });
});