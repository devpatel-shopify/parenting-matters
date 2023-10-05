KlaviyoSubscribe.attachToForms('#fs_quiz', {
  hide_form_on_success: false,
  extra_properties: {
  $source: 'https://parenting-matters.myshopify.com/pages/family-star',
  $method_type: "Klaviyo Form",
  $method_id: 'embed',
  $consent_version: 'Embed default text',
  },
  // success_url: "/pages/custom-family-star-result",
  success: function(event){
    console.log('formSubmited...');
    let klaviyoFormSuccessWrapper = document.querySelector('.js-klaviyo-form-success-wrapper');
    klaviyoFormSuccessWrapper.previousElementSibling.classList.add('hidden');
    klaviyoFormSuccessWrapper.classList.remove('hidden');
  },
  custom_success_message: true
});

const slides = document.querySelectorAll('#fs_quiz .slide');

function nextPrevEvent(){
  document.querySelectorAll('#fs_quiz .slide').forEach((slide) =>{
    let nextBtn = slide.querySelector('.button_next');
    let prevBtn = slide.querySelector('.button_back');
    let slideType = slide.dataset.type;
    let quiz_content = slide.querySelector('.quiz_content');

    /**
     * Next Button Click Event
     */
    if(nextBtn){
      if(nextBtn.classList.contains('event-added')) return;
      nextBtn.classList.add('event-added');
      nextBtn.addEventListener('click',function(event){
        event.preventDefault();
        var btn = $(event.currentTarget);
        var isValid = true;
        let types = ['range','radio','button','dropdown','inner-range'];
        if(types.includes(slideType)){
          isValid = (slide.querySelectorAll("input[type='radio']:checked").length > 0);
        }else if(slideType == "textfield" || slideType == "inner-textarea") {
          isValid = (slide.querySelector('textarea').value != "");
        }

        if(btn.data('type') == "checkbox"){
          isValid = false;
          let max_answer = parseInt(slide.dataset.max);
          let validate = (slide.querySelectorAll("input[type='checkbox']:checked").length == max_answer)
          quiz_content.classList.toggle('error',(!validate))
          isValid = validate;
        }

        quiz_content.classList.toggle('error',!isValid);
        if(isValid){
          event.currentTarget.closest('.slide').nextElementSibling.classList.remove('hidden');
          event.currentTarget.closest('.slide').classList.add('hidden');
        }
      })
    }

    /**
     * Previous Btn Click Event
     */
    if(prevBtn){
      if(prevBtn.classList.contains('event-added')) return;
      prevBtn.classList.add('event-added');
      prevBtn.addEventListener('click', function(event){
        event.preventDefault();
        event.currentTarget.closest('.slide').previousElementSibling.classList.remove('hidden');
        event.currentTarget.closest('.slide').classList.add('hidden');
      })
    }

    if(slide.querySelector('.button_submit')){
      slide.querySelector('.button_submit').addEventListener('click', function(event){
        event.preventDefault();
        var sbtn = $(event.currentTarget);

       

      });
    }

    /**
     * Radio Button change Event
     */
    slide.querySelectorAll('input[type="radio"]').forEach(radio => {
      if(radio.classList.contains('event-added')) return;
      radio.classList.add('event-added');
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
}

nextPrevEvent();

slides.forEach((slide) =>{
  let slideType = slide.dataset.type;
  let quiz_content = slide.querySelector('.quiz_content');

  /**
   * Checkbox change Event
   */
  if (slideType == "checkbox") {
    slide.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
      checkbox.addEventListener('change',function(){
        quiz_content.classList.remove('error');
        let maxSelect = parseInt(slide.dataset.max);
        var val = this.dataset.val;
        var index = this.dataset.inputIndex;
        let checkedElements = slide.querySelectorAll('input[type=checkbox]:checked');
        let haveInnerSlideCount = 0;
        let jsonContent = JSON.parse(slide.querySelector('[data-metaobjects]').innerText);
        let handleizeValue = this.dataset.textHandleize;
    
        
        if(this.checked && jsonContent[handleizeValue]){
          slide.insertAdjacentHTML("afterend", jsonContent[handleizeValue]);

          if(slide.querySelectorAll(".button_submit").length){
            let submitbtn = slide.querySelector(".button_submit");
            submitbtn.classList.remove("button_submit");
            submitbtn.classList.add("button_next");
            submitbtn.querySelector('span').innerText = "Next";
            console.log(submitbtn)
          }
          
          var sBtn = $(".slide").last().find(".button_next");
          if(sBtn.length && !sBtn.hasClass("button_submit")){
            var sBtnHtml = sBtn.html().replace("Next","Submit");
            //sBtn.addClass("button_submit");
            sBtn.removeClass("button_next").addClass("button_submit").html(sBtnHtml);
          }

          nextPrevEvent();
        }else{
          document.querySelectorAll(`[data-meta-step="${handleizeValue}"]`).forEach((element) => {
            element.remove();
          });
        }

        slide.querySelectorAll('input[type=checkbox]:not(:checked)').forEach((checkbox) => {
          checkbox.disabled = (checkedElements.length == maxSelect);
        });
    
    
        // wrapper.find('[type=hidden]').each((index,element) => {
        //   let checkboxElement = checkedElements[index];
        //   element.value = checkboxElement ? checkboxElement.value : '';
        // });
    
        checkedElements.forEach((element,index) => {
          var i = index + 1;
          var id = element.dataset.que+"_"+i;
          document.querySelector("#"+id).value = element.value;
        });

      });
    });
  }

});

// Script for setting a value based on change in range/radio input type.
$(function () {
  // On change of Range Slider
  $(document).on('change', '.range_container input', function () {
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
    console.log($("#slidervalue"+index).val());
  });



  $(document).on('click', '.button_submit', function(e){ 

    console.log("click on new submit");
    let slide = this.closest('.slide');
    if(slide.dataType == "inner-range"){
      if(!slide.querySelector('input[type="radio"]:checked')){
        slide.querySelector('.quiz_content').classList.add('error');
        return;
      }
    }

     // Result for Child Hassle
     var no_que = 20
     var max_score = no_que * 4;
     var d = max_score / 10;
     var sum = 0;
     for (let i = 1; i <= no_que; i++) {
         var val = parseFloat(document.getElementById('slidervalue' + i).value); console.log("slidervalue",i,val,document.getElementById('slidervalue' + i));
         sum = sum + val;
     }
     var ch = sum/d
     console.log("Child Hassel",ch);
     $("#FS_ChildHassel").val(ch);


     // Result for Child Temper
     var no_que = 8
     var max_score = no_que * 3;
     var d = max_score / 10;
     var sum = 0;
     for (let i = 21; i <= 28; i++) {
         var val = parseFloat(document.getElementById('slidervalue' + i).value); console.log("slidervalue",i,val,document.getElementById('slidervalue' + i));
         sum = sum + val;
     }
     var ct = sum/d
     console.log("Child Temper",ct);
     $("#FS_ChildTemper").val(ct);


     // Result for My Confidence
     var no_que = 5
     var max_score = no_que * 4;
     var d = max_score / 10;
     var sum = 0;
     for (let i = 29; i <= 33; i++) {
         var val = parseFloat(document.getElementById('slidervalue' + i).value); console.log("slidervalue",i,val,document.getElementById('slidervalue' + i));
         sum = sum + val;
     }
     var mc = sum/d
     console.log("My Confidence",mc);
     $("#FS_MyConfidence").val(mc);



     // Result for My Wellbeing
     var no_que = 7
     var max_score = no_que * 4;
     var d = max_score / 10;
     var sum = 0;
     for (let i = 34; i <= 40; i++) {
         var val = parseFloat(document.getElementById('slidervalue' + i).value); console.log("slidervalue",i,val,document.getElementById('slidervalue' + i));
         sum = sum + val;
     }
     var mc = sum/d
     console.log("My Wellbeing",mc);
     $("#FS_MyWellbeing").val(mc);


    
     $(".js-block-checkbox").each(function(){
      var bTitle = $(this).data("title"); console.log(bTitle);
      //console.log(".textarea_"+bTitle);
      $(".textarea_"+bTitle).each((index, element)=>{
        var i = index + 1;
        $("#"+bTitle+"_"+i+"_values").val($(element).val());        
        console.log('11 >> ',"#"+bTitle+"_"+i+"_values" ,$(element).val(),$("#"+bTitle+"_"+i+"_values"),$("#"+bTitle+"_"+i+"_values").val());
      })

      console.log(".range_"+bTitle);
      var sum = 0;
      $(`.range_${bTitle}:checked`).each((index, element)=>{
        var i = index + 1;
        var v = parseInt($(element).val())
        $("#"+bTitle+"_"+i+"_score").val(v);     
        console.log('22 >>',"#"+bTitle+"_"+i+"_score",$(element).val(),$("#"+bTitle+"_"+i+"_score"),$("#"+bTitle+"_"+i+"_score").val());
        sum = parseInt(sum) + v;
      })

      console.log("sum",sum);
      var res = parseFloat( sum / 2);
      console.log("res",res)
      if(bTitle == "concerns-about-my-child"){
        $("#FS_MyChild").val(res);
      }
      if(bTitle == "my-parenting"){
        $("#FS_MyParenting").val(res);
      }

    })

    $("#fs_quiz").submit();

  })



 //On change of create account fields.
  // $(document).on('change', '#RegisterForm-FirstName', function () {
  //   var fname = $(this).val();
  //   $("#fs_first_name").val(fname)
  // });
  
  // $(document).on('change', '#RegisterForm-LastName', function () {
  //   var fname = $(this).val();
  // $("#fs_last_name").val(fname)
  // });
  
  // $(document).on('change', '#RegisterForm-email', function () {
  //   var fname = $(this).val();
  //   $("#fs_email").val(fname)
  // });


  // $("#RegistrationSubmit").on("click",function(){
  //     $("#fs_quiz").submit();

  //       var escapedData = {
  //           firstName: escape($("#fs_first_name").val()),
  //           lastName: escape($("#fs_last_name").val()),
  //           email: escape($("#fs_email").val()),
  //           password: escape($("#RegisterForm-password").val()).replace(/\+/g, '%2B')
  //       }
  //         var data = 'form_type=create_customer&utf8=%E2%9C%93&customer%5Bfirst_name%5D=';
  //         data += escapedData.firstName;
  //         data += '&customer%5Blast_name%5D=';
  //         data += escapedData.lastName;
  //         data += '&customer%5Bemail%5D=';
  //         data += escapedData.email;
  //         data += '&customer%5Bpassword%5D=';
  //         data += escapedData.password;
  //         $.post('/account', data)
  //         .done(function(response){
  //           var logErrors = $(response).find('.errors').text();
  //           if (logErrors != '' && logErrors != 'undefined'){
  //             alert(logErrors);
  //           }
  //           else{
  //             //alert('success!');
  //             //window.location.href = "{{ shop.url }}/account/login";
  //           }
  //         }).fail(function(){alert('error could not submit');});
  //         return false;
  // })

  /*$('#create_customer').unbind('submit', function(){
      event.preventDefault();
      var data = $(this).serialize();
  
      console.log(data);
    });

    //Attach an event listener to the form submission
  const rForm = document.getElementById('create_customer');
  rForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission
      $("#fs_quiz").submit();
      setTimeout(function () {
        //rForm.submit();
        // You can also perform additional actions after the submission is completed
        console.log('Form submitted');
      }, 4000);
    
  });  
  $(document).on('submit', '.quiz-section', function (e) {
    e.preventDefault();
  });*/


});  