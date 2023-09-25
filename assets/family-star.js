KlaviyoSubscribe.attachToForms('#pq_quiz', {
  hide_form_on_success: false,
  extra_properties: {
  $source: 'https://parenting-matters.myshopify.com/pages/parenting-style-quiz-1',
  $method_type: "Klaviyo Form",
  $method_id: 'embed',
  $consent_version: 'Embed default text',
  },
  hide_form_on_success: false,
  custom_success_message: true
});

function nextPrevEvent(){
  const slides = document.querySelectorAll('#pq_quiz .slide');
  slides.forEach((slide) =>{
    let nextBtn = slide.querySelector('.button_next');
    let prevBtn = slide.querySelector('.button_back');
    if(nextBtn){
      if(nextBtn.classList.contains('event-added')) return;
      nextBtn.classList.add('event-added');
      nextBtn.addEventListener('click',function(event){
        event.preventDefault();
        var btn = $(event.currentTarget);
        var isValid = true;
        if(btn.data("type") == "radio"){
          isValid = false;
          //console.log(btn.parents(".slide").find("input[type='radio']:checked").length);
          if(btn.parents(".slide").find("input[type='radio']:checked").length){
            btn.parents(".slide").find(".radio-container").removeClass("error");
            isValid = true;
          }else{
            btn.parents(".slide").find(".radio-container").addClass("error");
          }
        }

        if(btn.data('type') == "checkbox"){
          isValid = false;
          let wrapper = btn.closest('.slide');
          let checkboxWrapper = wrapper.find('.checkbox-container');
          let max_answer = parseInt(wrapper.data('max'));
          let validate = (wrapper.find("input[type='checkbox']:checked").length == max_answer)
          checkboxWrapper[0].classList.toggle('error',(!validate))
          isValid = validate;
        }


        if(isValid){
          event.currentTarget.closest('.slide').nextElementSibling.classList.remove('hidden');
          event.currentTarget.closest('.slide').classList.add('hidden');
        }
      })
    }
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

        const larray = [1, 12];
        const darray = [6, 7, 9, 15, 17, 23, 24, 25, 11, 5, 19, 26];
        const uarray = [3, 4, 13, 21, 16];
        const rarray = [2, 8, 14, 20, 22, 10, 18];
        let l = 0;
        let d = 0;
        let u = 0;
        let r = 0;
        const score = {};

      });
    }
  })
}

nextPrevEvent();

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

  // On change of checkbox Button
  $(document).on('change', '.checkbox-container input[type=checkbox]', function () {
    $(".qtype-button.checkbox-container.error").removeClass("error");
    let wrapper = $(this).closest('.slide');
    let maxSelect = parseInt(wrapper.data('max'));
    var val = $(this).data('val');
    var index = $(this).data('input-index');
    let checkedElements = wrapper.find('input[type=checkbox]:checked');
    let haveInnerSlideCount = 0;
    let jsonContent = JSON.parse(wrapper.find('[data-metaobjects]').text());
    let handleizeValue = $(this).data('text-handleize');

    if(this.checked && jsonContent[handleizeValue]){
      wrapper.get(0).insertAdjacentHTML("afterend", jsonContent[handleizeValue]);
      nextPrevEvent();
    }else{
      $(`[data-meta-step="${handleizeValue}"]`).each((index,element) => {
        element.remove();
      });
    }

    wrapper.find('input[type=checkbox]:not(:checked)').each((index,checkbox) => {
      $(checkbox).get(0).disabled = (checkedElements.length == maxSelect);
    });

    wrapper.find('[type=hidden]').each((index,element) => {
      let checkboxElement = checkedElements[index];
      element.value = checkboxElement ? checkboxElement.value : '';
    });
  });

 //On change of create account fields.
  $(document).on('change', '#RegisterForm-FirstName', function () {
    var fname = $(this).val();
    $("#pq_first_name").val(fname)
  });
  
  $(document).on('change', '#RegisterForm-LastName', function () {
    var fname = $(this).val();
    $("#pq_last_name").val(fname)
  });
  
  $(document).on('change', '#RegisterForm-email', function () {
    var fname = $(this).val();
    $("#pq_email").val(fname)
  });


  $("#RegistrationSubmit").on("click",function(){
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
  })

  /*$('#create_customer').unbind('submit', function(){
      event.preventDefault();
      var data = $(this).serialize();
  
      console.log(data);
    });

    //Attach an event listener to the form submission
  const rForm = document.getElementById('create_customer');
  rForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission
      $("#pq_quiz").submit();
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