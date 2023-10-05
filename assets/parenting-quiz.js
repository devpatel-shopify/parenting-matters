document.addEventListener('DOMContentLoaded',function () {

  KlaviyoSubscribe.attachToForms('#pq_quiz', {
    hide_form_on_success: true,
      extra_properties: {
      $source: 'https://parenting-matters.myshopify.com/pages/parenting-style-quiz-1',
      $method_type: "Klaviyo Form",
      $method_id: 'embed',
      $consent_version: 'Embed default text',
    },
    //success_url: "/account/register",
    success: function(event){
      console.log('formSubmited...');
      let klaviyoFormWrapper = document.querySelector('.js-klaviyo-form--wrapper');
      let klaviyoFormSuccessWrapper = document.querySelector('.js-klaviyo-form-success-wrapper')
      klaviyoFormWrapper.classList.add('hidden');
      klaviyoFormSuccessWrapper.classList.remove('hidden');
    },
    custom_success_message: true
  });
  
  const parentingStyleDescriptions = JSON.parse(document.getElementById('parentingStyleDescriptionJson').innerText);
  document.querySelector('.js-klaviyo-form-submit-btn').addEventListener('click',function(){
    document.querySelector('.js-klaviyo-form-submit').click();
    let confirmation_checkbox = document.getElementById('confirmation_checkbox');
    if(confirmation_checkbox.checked == false) return;
    this.disabled = true;
    this.classList.add('loading');
    this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
  });
  
  const slides = document.querySelectorAll('#pq_quiz .slide');
  
  slides.forEach((slide) =>{
  
    let quiz_content = slide.querySelector('.quiz_content');
    let slideType = slide.dataset.type;
  
    /**
     * Next Button Click Event
     */
    if(slide.querySelector('.button_next')){
      slide.querySelector('.button_next').addEventListener('click',function(event){
        event.preventDefault();
        var isValid = true;
        let types = ['range','radio','button','dropdown'];
        if(types.includes(slideType)){
          isValid = (slide.querySelectorAll("input[type='radio']:checked").length > 0);
        }else if(slideType == "textfield") {
          isValid = (slide.querySelector('textarea').value != "");
        }
  
        quiz_content.classList.toggle('error',!isValid);
        if(isValid){
          slide.nextElementSibling.classList.remove('hidden');
          slide.classList.add('hidden');
        }
      });
    }
  
    /**
     * Previous Btn Click Event
     */
    if(slide.querySelector('.button_back')){
      slide.querySelector('.button_back').addEventListener('click', function(event){
        event.preventDefault();
        slide.previousElementSibling.classList.remove('hidden');
        slide.classList.add('hidden');
      })
    }
  
    /**
     * Submit Button Event
     */
    if(slide.querySelector('.button_submit')){
  
      slide.querySelector('.button_submit').addEventListener('click', function(event){
        event.preventDefault();
  
        if (slideType == "textfield" && slide.querySelector('textarea').value == "") {
          quiz_content.classList.add('error');
          return false;
        }
  
        var sbtn = $(event.currentTarget);
  
        // const relationship = document.getElementById('pq_childrelation').value;
        // const comment = document.getElementById('pq_comment').value;
  
  
        const larray = [1, 12];
        const darray = [6, 7, 9, 15, 17, 23, 24, 25, 11, 5, 19, 26];
        const uarray = [3, 4, 13, 21, 16];
        const rarray = [2, 8, 14, 20, 22, 10, 18];
        let l = 0;
        let d = 0;
        let u = 0;
        let r = 0;
        const score = {};
  
        for (let i = 1; i < 27; i++) {
          let slidervalue = document.getElementById('slidervalue' + i);

          score[i] = parseFloat(slidervalue.value);
          console.log(score[i]);
          val = parseFloat(slidervalue.value);
  
  
          if (larray.includes(i)) {
              if (val > 0) {
                  d += val;
              } else {
                  l += val;
              }
          }
          if (darray.includes(i)) {
              if (val < 0) {
                  d -= val;
              } else {
                  l -= val;
              }
          }
          if (uarray.includes(i)) {
              if (val > 0) {
                  r += val;
              } else {
                  u += val;
              }
          }
          if (rarray.includes(i)) {
              if (val < 0) {
                  r -= val;
              } else {
                  u -= val;
              }
          }
      }
  
        const text_score = JSON.stringify(score);
  
  
        console.log(text_score);
        // console.log(relationship);
        // console.log(comment);
  
        // Factor for 12 and 14 questions of each type
        // and a maximum scale value for each of 20
        l = (l * 20) / 28;
        d = (d * 20) / 28;
        u = (u * 20) / 24;
        r = (r * 20) / 24;
        const x = d + l;
        const y = r + u;
  
        console.log("l",l);
        console.log("d",d);
        console.log("u",u);
        console.log("r",r);
        console.log("x",x);
        console.log("y",y);
  
  
        var xaxis=parseFloat(x);
        var yaxis=parseFloat(y);
  
        var slope=yaxis/xaxis;
  
        var description = '';
        var pstyle = '';
  
        // var r=parseFloat(r);
        // var u=parseFloat(u);
        // var l=parseFloat(l);
        // var d=parseFloat(d);
  
  
        /**Top right quadrant*/
        if (xaxis > 0 && yaxis > 0){
            description = 'primarily Balanced-authoritative which is a good combination of  warmth and involvement backed up by appropriate expectations and clear limits. ';
            pStyle='Well Balanced';
            pstylePDF='ba.pdf';
            pType='authoritarian';
          if (slope > 1.51){
            description=description + 'You are also inclined towards being Permissive-indulgent which means that you rate highly on warmth and engagement with your children but lower on level of control and setting clear limits for them.';
            pStyle="‘Well-balanced’, with a tendency to being ‘Permissive’";
            pstylePDF='bapi.pdf';
            pType='authoritarian';
          }if (slope < 0.66){
            description=description + 'You are also inclined towards being Authoritarian-strict which means that you rate more highly on levels of control and discipline.';
            pStyle="‘Well-balanced’ with a tendency to being ‘Strict’";
            pstylePDF='baas.pdf';
            pType='authoritarian';
          }
        } 
        
        /**Bottom right quadrant*/	
        if (xaxis>0 && yaxis<0){
            description = 'primarily Authoritarian-strict which means that you rate more highly on levels of control and discipline. ';
            pStyle='Strict';
            pstylePDF='as.pdf';
            pType='authoritarian';
          if (slope > -0.66){
            description=description + 'You are also inclined towards being Balanced-authoritative which is a good combination of  warmth and involvement backed up by appropriate expectations and clear limits.';
            pStyle="‘Strict’, with a tendency to ‘Well-balanced’";
            pstylePDF='asba.pdf';
            pType='authoritarian';
          }if (slope < -1.51){
            description=description + 'You are also inclined towards being \'Hands-off\' which means that you tend to have a more laissez-faire or less involved approach to your children.';
            pStyle="‘Strict’ with a tendency to ‘Hands-off’";
            pstylePDF='asho.pdf';
            pType='authoritarian';}}
  
  
        /**Bottom left quadrant*/
        if (xaxis<0 && yaxis<0){
            description = ' primarily \'Hands-off\' which means that you tend to have a more laissez-faire or less involved approach to your children. ';
            pStyle='Hands-off';
            pstylePDF='ho.pdf';
            pType='authoritarian';
          if (slope > 1.51){
            description=description + 'You are also inclined towards being Authoritarian-strict which means that you rate more highly on levels of control and discipline.';
            pStyle="‘Hands-off’ with a tendency towards being ‘Strict’";
            pstylePDF='hoas.pdf';
            pType='authoritarian';}
          if (slope < 0.66){
            description=description + 'You are also inclined towards being Permissive-indulgent which means that you rate highly on warmth and engagement with your children but lower on level of control and setting clear limits for them.';
            pStyle="‘Hands-off’ with a tendency to being ‘Permissive’";
            pstylePDF='hopi.pdf';
            pType='authoritarian';}}	
  
  
  
        /**Top left quadrant*/
        if (xaxis<0 && yaxis>0){
            description = ' primarily Permissive-indulgent which means that you rate highly on warmth and engagement with your children but lower on level of control and setting clear limits for them. ';
            pStyle="Permissive";
            pstylePDF='pi.pdf';
            pType='permissive';
          if (slope > -0.66){
            description=description + 'You are also inclined towards being \'Hands-off\' which means that you tend to have a more laissez-faire or less involved approach to your children.';
            pStyle="‘Permissive’ with a tendency to being ‘Hands-off’";
            pstylePDF='piho.pdf';
            pType='permissive';}
          if (slope < -1.51){
            description=description + 'You are also inclined towards being Balanced-authoritative which is a good combination of  warmth and involvement backed up by appropriate expectations and clear limits.';
            pStyle="‘Permissive’, with a tendency towards ‘Well-balanced’";
            pstylePDF='piba.pdf';
            pType='permissive';}}	
        
  
  
        /**Now the special cases
        1st - at the origin*/
        if (xaxis == 0 && yaxis == 0){
          description = 'Balanced between all styles';
          pStyle="Middle-of-the-Field";
          pstylePDF='styles.pdf';
          pType='authoritarian';
        }	
        
        /**2nd - on x axis to the right*/
        if (xaxis >0 && yaxis ==0){
          description = 'balanced between Balanced-authoritative which is a good combination of  warmth and involvement backed up by appropriate expectations and clear limits and Authoritarian-strict which means that you rate more highly on levels of control and discipline.';
          pStyle="‘Well-balanced’ with a tendency to being ‘Strict’";
          pstylePDF='baas.pdf';
          pType='authoritarian';
        }
  
        /**3rd on x axis to the left*/
        if (xaxis < 0 && yaxis == 0){
          description = 'balanced between Permissive-indulgent which means that you rate highly on warmth and engagement with your children but lower on level of control and setting clear limits for them and \'Hands-off\' which means that you tend to have a more laissez-faire or less involved approach to your children.';
          pStyle="‘Permissive’ with a tendency to being ‘Hands-off’";
          pstylePDF='piho.pdf';
          pType='permissive';
        }
  
        /**4th on yaxis at the top*/
        if (xaxis == 0 && yaxis > 0){
          description = 'balanced between Balanced-authoritative which is a good combination of  warmth and involvement backed up by appropriate expectations and clear limits\; and Permissive-indulgent which means that you rate highly on warmth and engagement with your children but lower on level of control and setting clear limits for them.';
          pStyle="‘Well-balanced’, with a tendency to being ‘Permissive’";
          pstylePDF='bapi.pdf';
          pType='authoritarian';
        }	
  
        /**5th on y axis at the bottom*/
        if (xaxis == 0 && yaxis < 0){
          description = 'balanced between \'Hands-off\' which means that you tend to have a more laissez-faire or less involved approach to your children and Authoritarian-strict which means that you rate more highly on levels of control and discipline.';
          pStyle="‘Hands-off’ with a tendency towards being ‘Strict’";
          pstylePDF='hoas.pdf';
          pType='authoritarian';
        }
  
        let MetaDescriptions = parentingStyleDescriptions[pStyle] || '';
  
        document.getElementById('pstyle').innerHTML = pStyle.replaceAll('‘','<span>').replaceAll('’','</span>');
        document.getElementById('description').innerHTML = MetaDescriptions;
        document.getElementById('ParentingStyle').value = pStyle;
        document.getElementById('ParentingType').value = pType;
  
        document.getElementById('Xaxis').value = xaxis;
        document.getElementById('Yaxis').value = yaxis;

        
        /**Now adjust axes for the plot*/
        xaxis = xaxis + 20;
        yaxis = yaxis + 20;
        
        document.querySelector('.form-success-msg').classList.remove('hidden');
        event.currentTarget.closest('.slide').classList.add('hidden');

        let frmData =  new FormData(document.getElementById('pq_quiz'));
        let formObject = {}
        for (let [key,value] of frmData.entries()) {
          formObject[key] = value;
        }
        console.table(formObject);

      })
    }
  
  
    /**
     * Radio Button change Event
     */
    slide.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change',function(){
        this.closest('.quiz_content').classList.remove('error');
        if(document.querySelector(`#slidervalue${this.dataset.inputIndex}`)) document.querySelector(`#slidervalue${this.dataset.inputIndex}`).value = this.dataset.val;
        if(slideType == "dropdown"){
          slide.querySelector('.dropdown_toggle span').innerText = this.value;
          slide.querySelector('details').removeAttribute('open');
        }
      });
    });
  });  
  
  /**
   * Input Text Change Event
   */
  
  document.querySelectorAll('.js-text-field').forEach(input => {
    input.addEventListener('change',function(){
      console.log(document.getElementById(this.dataset.targetId));
      document.getElementById(this.dataset.targetId).value = this.value;
    });
  });

})


// document.addEventListener('DOMContentLoaded',function () {

  // Script for setting a value based on change in range/radio input type.
  // $(function () {
    // On change of Range Slider
    /*$(document).on('change', '.range_container input', function () {
      var val = $(this).val();

      if (val == 1) {
        $(this).data('val', -2);
      } else if (val == 2) {
        $(this).data('val', -1);
      } else if (val == 3) {
        $(this).data('val', 1);
      } else if (val == 4) {
        $(this).data('val', 2);
      }

      var dataVal = $(this).data('val');
      var index = $(this).data('input-index');
      $("#slidervalue"+index).val(dataVal);
      console.log(dataVal);
      console.log($("#slidervalue"+index).val());
    });

    // On change of Radio Button
    $(document).on('change', '.radio-container input', function () {
      $(".qtype-button.radio-container.error").removeClass("error");
      var val = $(this).data('val');
      var index = $(this).data('input-index');
      $("#slidervalue"+index).val(val);
      console.log(val);
      console.log($("#slidervalue"+index).val());
    })

    //On change of create account fields.
    $(document).on('change', '#pq_first_name', function () {
      var fname = $(this).val();
      $("#pq_first_name").val(fname)
    });
    
    $(document).on('change', '#pq_last_name', function () {
      var fname = $(this).val();
      $("#pq_last_name").val(fname)
    });
    
    $(document).on('change', '#pq_email', function () {
      var fname = $(this).val();
      $("#pq_email").val(fname)
    });*/


    /*$("#RegistrationSubmit").on("click",function(){
        $("#pq_quiz").submit();

          var escapedData = {
              firstName: escape($("#pq_first_name").val()),
              lastName: escape($("#pq_last_name").val()),
              email: escape($("#pq_email").val()),
              password: escape($("#RegisterForm-password").val()).replace(/\+/g, '%2B')
          }
            var data = 'form_type=create_customer&utf8=%E2%9C%93&customer%5Bfirst_name%5D=';
            data += escapedData.firstName;
            data += '&customer%5Blast_name%5D=';
            data += escapedData.lastName;
            data += '&customer%5Bemail%5D=';
            data += escapedData.email;
            data += '&customer%5Bpassword%5D=';
            data += escapedData.password;
            $.post('/account', data)
            .done(function(response){
              var logErrors = $(response).find('.errors').text();
              if (logErrors != '' && logErrors != 'undefined'){
                alert(logErrors);
              }
              else{
                //alert('success!');
                //window.location.href = "{{ shop.url }}/account/login";
              }
            }).fail(function(){alert('error could not submit');});
            return false;
    })*/

      // $('#create_customer').unbind('submit', function(){
      //   event.preventDefault();
      //   var data = $(this).serialize();
    
      //   console.log(data);
      // });

      // Attach an event listener to the form submission
    // const rForm = document.getElementById('create_customer');
    // rForm.addEventListener('submit', function (e) {
    //     e.preventDefault(); // Prevent the default form submission
    //     $("#pq_quiz").submit();
    //     setTimeout(function () {
    //       //rForm.submit();
    //       // You can also perform additional actions after the submission is completed
    //       console.log('Form submitted');
    //     }, 4000);
      
    // });

    
    // $(document).on('submit', '.quiz-section', function (e) {
    //   e.preventDefault();
    // });
  // });        
// },false);