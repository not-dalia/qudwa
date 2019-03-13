---
---
$(function() {

  var button = $('#button-submit').html();
  var isSubmitting = false;

  $.validator.addMethod('phoneNumber', function(value, element){
    if (!value || value == '') return true;
    var regexPattern=new RegExp(/^[٠-٩0-9-+]+$/); 
    return regexPattern.test(value); 
  });

  $("form").validate({
    rules: {
      mentorname: {
        required: true,
        minlength: 2
      },
      mentoremail: {
        email: true
      },
      mentorphone: {
        phoneNumber: true,
        minlength: 5
      }, 
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        phoneNumber: true,
        minlength: 5
      }, 
      "birthday-day": {
        required: true
      }, 
      "birthday-month": {
        required: true
      }, 
      "birthday-year": {
        required: true
      }, 
      "describe": {
        required: true,
        minlength: 20
      }, 
      "reason": {
        required: true, 
        minlength: 20
      }, 
      communication: {
        required: true
      },
      "connect-through":{
        required: true
      },
      "social-profile": {
        required: true
      }, 
      "interest-field": {
        required: true
      },
      "agree-terms": {
        required: true
      },
      "agree-research": {
        required: true
      },
      "agree-privacy": {
        required: true
      }
    },
    // Specify validation error messages
    messages: {
      mentorname: {
        required: "هذا الحقل مطلوب",
        minlength: "الرجاءإدخال حرفين على الأقل"
      },
      mentoremail: {
        email: "الرجاء إدخال بريد الكتروني صالح"
      },
      mentorphone: {
        phoneNumber: "الرجاء إدخال رقم هاتف صالح",
        minlength: "الرجاءإدخال خمسة رموز على الأقل"
      }, 
      name: {
        required: "هذا الحقل مطلوب",
        minlength: "الرجاءإدخال حرفين على الأقل"
      },
      email: {
        required: "هذا الحقل مطلوب",
        email: "الرجاء إدخال بريد الكتروني صالح"
      },
      phone: {
        phoneNumber: "الرجاء إدخال رقم هاتف صالح",
        minlength: "الرجاءإدخال خمسة رموز على الأقل"
      }, 
      "birthday-day": {
        required: "هذا الحقل مطلوب"
      }, 
      "birthday-month": {
        required: "هذا الحقل مطلوب"
      }, 
      "birthday-year": {
        required: "هذا الحقل مطلوب"
      }, 
      "describe": {
        required: "هذا الحقل مطلوب",
        minlength: "الرجاءإدخال ٢٠ حرفا على الأقل"
      }, 
      "reason": {
        required: "هذا الحقل مطلوب", 
        minlength: "الرجاءإدخال ٢٠ حرفا على الأقل"
      }, 
      communication: {
        required: "هذا الحقل مطلوب"
      },
      "connect-through":{
        required: "هذا الحقل مطلوب"
      },
      "social-profile": {
        required: "هذا الحقل مطلوب"
      }, 
      "interest-field": {
        required: "هذا الحقل مطلوب"
      },
      "agree-terms": {
        required: "هذا الحقل مطلوب"
      },
      "agree-research": {
        required: "هذا الحقل مطلوب"
      },
      "agree-privacy": {
        required: "هذا الحقل مطلوب"
      }
    }, 

    errorPlacement: function(error, element) {
      error.insertBefore(element); // <- the default
    },
    submitHandler: function(form) {
      if (isSubmitting) return;

      isSubmitting = true;
      $('#button-submit').html('<img src="{{site.baseurl}}/assets/images/spinner.gif" style="height: 30px;" />');

      var formData = $(form).serializeArray();
      var extraData = {};
      if ($('input[name=mentor]').val()) {
        extraData.mentor = $('input[name=mentor]').val();
      }
      extraData.form_data = formData;
      pushAction('triggerAction', {actionType: 'form', actionData: 'type:' + $('input[name=form-type]').val() , extraData: extraData});
      var data = $(form).serialize() + (typeof tracker != 'undefined' ? '&' + tracker.getPixelData({actionType: 'form', actionData: 'type:' + $('input[name=form-type]').val()}) : '') + 'l=ar';
      console.log(data);
      $.ajax({
        type: "POST",
        url: 'https://openlab.ncl.ac.uk/dokku/mentoring-editor/forms/form-submit/',
        data: data,
        success: function(resp){
          console.log('yay');
          $("#success-modal").modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
          });
        },
        error: function(req, status, err){
          console.log(status);
          isSubmitting = false;
          $('#button-submit').html(button);
          $("#error-modal").modal({
            escapeClose: true,
            clickClose: true,
            showClose: true
          });
        }
      });
    }
  });

  $('form').find('.mentor-social').each(function() {
    $(this).rules('add', {
        url: true,
        messages: {
          url: "Please enter a valid URL"
        }
    });
  });

  $('#button-submit').click(function(e){
    $('form').submit();
  });

  $('#button-submit').click(function(e){
    $('form').submit();
  });
});
