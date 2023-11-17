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

/**
 * DDP Detail page
 */
{
  document.querySelectorAll('.js-read-more').forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('open');
      button.closest('.inner-boxes').querySelectorAll('.inner-card').forEach((card, index) => {
        if (index > 3) card.classList.toggle('hidden',!button.classList.contains('open'));
      });
      button.querySelector('.btn-text').innerText = button.classList.contains('open') ? 'Read less' : 'Read more';
    });
  });
}