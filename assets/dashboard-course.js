class dashboardCourse extends HTMLElement{
  constructor(){
    super();
    this.sessionStorageContent = JSON.parse(window.sessionStorage.getItem('LastActiveCourse'));
    this.partsElement = this.querySelector('.js-parts-slider');
    this.stepSliderWrapper = this.querySelector('.js-step-sliders--wrapper');
    this.partsElement.querySelectorAll('.js-step-btn').forEach((button,index) => this.handleStepClick(button,index));
    this.querySelectorAll('.js-course-btn').forEach((button) => this.handleCourseBtnClick(button))
    this._initPartsSlider();
  }

  _initPartsSlider(){
    let _this = this;
    new Flickity(this.partsElement, {
      cellAlign: 'center',
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      on:{
        ready: function() {
          console.log(_this,_this.sessionStorageContent)
          let activeSlide = (_this.sessionStorageContent) ? _this.sessionStorageContent.currentPartIndex : parseInt(this.element.dataset.activeSlide);
          if(activeSlide != 0){
            this.selectCell(activeSlide);
          }
          this.selectedElement.querySelector('.js-step-btn').click();
        }
      }
    });
  }

  handleCourseBtnClick(button){
    let slide = button.closest('.carousel-cell');
    button.addEventListener('click',function(){
      let localContent = JSON.parse(slide.querySelector('[type="application/json"]').innerText);
      window.sessionStorage.setItem('LastActiveCourse',JSON.stringify(localContent));
    })
  }

  handleStepClick(button,index){
    button.addEventListener('click',() => {
      Flickity.data(this.partsElement).selectCell(index);
      let activeStep = this.partsElement.querySelector('.carousel-cell.active');
      if(activeStep) activeStep.classList.remove('active');
      button.closest('.carousel-cell').classList.add('active');
      let targetElement = button.dataset.target;
      this._showSteps(targetElement);
    });
  }

  _showSteps(currentStep){
    let _this = this;
    let activeStep = this.stepSliderWrapper.querySelector('.js-steps-slider:not(.hidden)');
    if(activeStep){
      Flickity.data(activeStep).destroy();
      activeStep.classList.add('hidden');
    }
    let targetStepSliderElement = this.stepSliderWrapper.querySelector(`#${currentStep}`);
    targetStepSliderElement.classList.remove('hidden');

    let cellSize = (window.matchMedia('(max-width:1050px)').matches) ? 2 : 4;

    new Flickity(targetStepSliderElement, {
      cellAlign: 'left',
      contain: true,
      pageDots: false,
      prevNextButtons: (targetStepSliderElement.querySelectorAll('.carousel-cell').length > cellSize),
      draggable: (targetStepSliderElement.querySelectorAll('.carousel-cell').length > cellSize),
      arrowShape: 'M92.5,42.5H25.6L37.8,30.3A7.5,7.5,0,1,0,27.2,19.7l-25,25a7.5,7.5,0,0,0,0,10.6l25,25a7.5,7.5,0,0,0,10.6,0,7.5,7.5,0,0,0,0-10.6L25.6,57.5H92.5a7.5,7.5,0,0,0,0-15Z',
      on:{
        ready:function(){
          this.selectCell((_this.sessionStorageContent) ? _this.sessionStorageContent.currentCourseIndex : parseInt(this.element.dataset.activeSlide));
        }
      }
    });

  }
}
customElements.define('dashboard-course', dashboardCourse);