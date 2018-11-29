function collapseMenu() {
  $menu_button = $('.menu_button');

  $menu_button.click(function () {
    $menu_button.toggleClass("open");
    $menu_button.nextAll('.main-menu').toggleClass("collapse");
  });
}

function initAmountSlider() {
  $( "#slider-amount" ).slider({
    min: 1000,
    max: 500000,
    step: 1000,
    values: 1000,
    slide: function( event, ui ) {
      $(ui.handle).parent().next('.input-amount').find('#amount').val(ui.value);
      calcresult();
    }
  });
}

function initRefillSlider() {
  $( "#slider-refill" ).slider({
    min: 1000,
    max: 25000,
    step: 1000,
    values: 1000,
    slide: function( event, ui ) {
      $(ui.handle).parent().next('.input-refill').find('#refill').val(ui.value);
      calcresult();
    }
  });
}

function changeAmount() {
  $('#amount').keyup(function(){
    if ( $(this).val() < 1000 ) {
      $(this).val(1000)
    }
    if ( $(this).val() > 500000 ) {
      $(this).val(500000)
    }
    $("#slider-amount").slider("value", $(this).val());
    calcresult();
  });
}

function changeRefill() {
  $('#refill').keyup(function(){
    if ( $(this).val() < 1000 ) {
      $(this).val(1000)
    }
    if ( $(this).val() > 500000 ) {
      $(this).val(25000)
    }
    $("#slider-refill").slider("value", $(this).val());
    calcresult();
  });
}

function changePeriod() {
  $('input[name=period]').change(function(){
    rate = $('input[name=period]:checked').attr('data-rate');
    $('#interest-rate').html(rate + ' ' + '<span class="unit">%</span>');
    calcresult();
  });
}

function calcresult() {
  amount = parseFloat($('#amount').val());
  refill = parseFloat($('#refill').val());
  rate = parseFloat($('#interest-rate').text());
  period = parseFloat($('input[name=period]:checked').val());
  rate_per_month = rate /12/100;
  current_amount = amount;
  total_amount = amount;
  total_refill = amount;
  total_percent = 0;
  for(var i=0; i<period; ++i)
  {
    percent = current_amount * rate_per_month; // проценты за прошедший месяц
    total_percent += percent;
    total_amount += percent;
    if (i<period-1)
    {
      total_amount += refill; // пополнение (в конце срока нет попонения)
      total_refill += refill;
    }
    current_amount += refill;
  }

  $('#income').text(Math.round(total_percent));
  $('#total').text(Math.round(total_amount));
}

function setHoverOnAdvantageIcon() {
  $('.advantage-img').hover(
    function() {
      if ( !$( this ).hasClass('active') ) {
        $( this ).find('img').toggleClass('active');
      }
    }, function() {
      if ( !$( this ).hasClass('active') ) {
        $( this ).find('img').toggleClass('active');
      }
    }
  )
}

function setClickOnAdvantageIcon() {
  $('.advantage-img').click(function() {
    if ( !$( this ).hasClass('active') ) {
      $( this ).addClass('active');
      $( this ).parent().find('.advantage-desc p').toggleClass('active');
    } else {
      $( this ).removeClass('active');
      $( this ).parent().find('.advantage-desc p').toggleClass('active');
    }
  })
}

function initReviewsCarousel() {
    $('.reviews .reviews-carousel').slick({
      prevArrow: '<div class="slick-prev"></div>',
      nextArrow: '<div class="slick-next"></div>'
    })
}

function sliderServices() {
  $('.slide-foto').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slide-foto-nav'
  });
  $('.slide-foto-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    asNavFor: '.slide-foto',
    dots: false,
    centerMode: false,
    swipe: false,
    vertical: true,
    focusOnSelect: true,
    prevArrow: '<i class="fas fa-chevron-up left"></i>',
    nextArrow: '<i class="fas fa-chevron-down right"></i>'
  });
}

function popOver () {
  $('[data-toggle="popover"]').popover({
    trigger: 'focus'
  }); 
};

//validate
function validate(formId) {
  errorMsg = 'required';

  $(formId + ' input[type="tel"]').keyup(function () {
    var $input = $(this),
      $errorMsg = $input.nextAll('.error-msg'),
      regex = /^[\d- ]+$/,
      str = $input.val();
    if (regex.exec(str) == null) {
      $input.val(str.slice(0, -1));
      errorMsg = 'incorrect phone';
    } else {
      errorMsg = '';
    }

    if (errorMsg) {
      $input.css({'borderColor': 'red'});
      $errorMsg.text(errorMsg);
    } else {
      $input.css({'borderColor': '#cccccc'});
      $errorMsg.text('');
    }
  });

  $(formId + ' input').blur(function () {
    var $input = $(this),
      str = $input.val(),
      $errorMsg = $input.nextAll('.error-msg');

    if ( $input.prop( 'required' ) && str == '') {
      $input.removeClass('full');
      errorMsg = 'required';
    } else {
      $input.addClass('full');
      errorMsg = '';
    }

    if ($input.attr('type') == 'email' && str != '') {
      var regex = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

      if (regex.exec(str) == null) {
        errorMsg = 'incorrect email';
      }
    }

    if ( $input.attr('type') == 'tel' && str != '' && str.length < 6 ) {
      errorMsg = 'incorrect phone';
    }

    if (errorMsg) {
      $input.css({'borderColor': 'red'});
      $errorMsg.text(errorMsg);
    } else {
      $input.css({'borderColor': '#e7830c'});
      $errorMsg.text('');
    }
  })
}

function formSubmitRegistration() {
  $('#registration' + ' input[type="button"]').click(function(e) {
    var msg = $('.msg');
    var msgText = $('#msg-text');

    var last_name,first_name,patronymic, email, phone, password, nonce, ajaxurl;

    last_name   =   $('#registration #last_name').val();
    first_name  =   $('#registration #first_name').val();
    patronymic  =   $('#registration #patronymic').val();
    email       =   $('#registration #email').val();
    phone       =   $('#registration #phone').val();
    password    =   $('#registration #password').val();
    rpassword   =   $('#registration #rpassword').val();
    agree       =   $("#registration #ireadd2:checked").val();
    nonce       =   $('#registration #security-register').val();
    ajaxurl     =   vars.admin_url + 'admin-ajax.php';

    if ( !$('#ireadd2').is(":checked") ) {
      msgText.remove();
      msg.html('<span id="msg-text">Must agree</span>');
      msg.removeClass('success');
      msg.addClass('fail');
      return;
    }

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      dataType: 'json',
      data: {
        'action'                    :   'victory_register_form',
        'last_name'                 :   last_name,
        'first_name'                :   first_name,
        'patronymic'                :   patronymic,
        'email'                     :   email,
        'phone'                     :   phone,
        'password'                  :   password,
        'rpassword'                 :   rpassword,
        'nonce'                     :   nonce
      },
      success: function (data) {

        // This outputs the result of the ajax request
        if (data.register === true) {
          $('#registration input').css({'borderColor': '#e7830c'});
          msgText.remove();
          msg.html('<span id="msg-text">' + data.message + '</span>');
          msg.removeClass('fail');
          msg.addClass('success');

          setTimeout(function () {
            document.location.href = '/personal-account/';
          }, 1000)
        }else{
          $('#registration input').css({'borderColor': '#e7830c'});
          msg.html('<span id="msg-text">' + data.message + '</span>');
          msg.removeClass('success');
          msg.addClass('fail');
          $('#registration #' + data.id).css({'borderColor': 'red'});
        }
      },
      error: function (data) {
        msg.html('<span id="msg-text">The message could not be sent. Try it again.</span>');
        msg.removeClass('success');
        msg.addClass('fail');
      }
    });
  })
}

function formSubmitLogin() {
  $('#login' + ' input[type="button"]').click(function(e) {
    var msg = $('.msg');
    var msgText = $('#msg-text');

    var phone, password, nonce, ajaxurl;

    phone       =   $('#login #phone').val();
    password    =   $('#login #password').val();
    agree       =   $("#login #ireadd:checked").val();
    nonce       =   $('#login #security-login').val();
    ajaxurl     =   vars.admin_url + 'admin-ajax.php';

    if ( !$('#ireadd').is(":checked") ) {
      msgText.remove();
      msg.prepend('<span id="msg-text">Must agree</span>');
      msg.removeClass('success');
      msg.addClass('fail');
      return;
    }

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      dataType: 'json',
      data: {
        'action'                    :   'victory_login_form',
        'phone'                     :   phone,
        'password'                  :   password,
        'nonce'                     :   nonce
      },
      success: function (data) {

        // This outputs the result of the ajax request
        if (data.login === true) {
          $('#login input').css({'borderColor': '#e7830c'});
          msgText.remove();
          msg.html('<span id="msg-text">' + data.message + '</span>');
          msg.removeClass('fail');
          msg.addClass('success');

          setTimeout(function () {
            document.location.href = '/personal-account/';
          }, 1000)
        }else{
          $('#login input').css({'borderColor': '#e7830c'});
          msgText.remove();
          msg.html('<span id="msg-text">' + data.message + '</span>');
          msg.removeClass('success');
          msg.addClass('fail');
          $('#login #' + data.id).css({'borderColor': 'red'});
        }
      },
      error: function (data) {
        msgText.remove();
        msg.html('<span id="msg-text">The message could not be sent. Try it again.</span>');
        msg.removeClass('success');
        msg.addClass('fail');
      }
    });
  })
}

//  update UserData
function updateUserData() {
  $('#user_data').click(function () {
    var firstname, lastname, patronymic, useremail, userphone, nonce, ajaxurl;
    firstname = $('#first_name').val();
    lastname = $('#last_name').val();
    patronymic = $('#patronymic').val();
    useremail = $('#user_email').val();
    userphone = $('#user_phone').val();
    userbirthday = $('#birthday').val();
    usercity = $('#city').val();
    gender = $("input[name='gender']:checked").val();
    nonce  =   $('#security-personal').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $('#personal_info_message').empty().html('<div class="userdate-alert">Сохранение...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      data: {
        'action': 'victory_ajax_update_profile',
        'firstname': firstname,
        'lastname': lastname,
        'patronymic': patronymic,
        'useremail': useremail,
        'userphone': userphone,
        'userbirthday': userbirthday,
        'usercity': usercity,
        'gender': gender,
        'nonce' : nonce
      },
      success: function (data) {

        $('#personal_info_message').empty().html('<div class="userdate-alert">' + data + '<div>');
      },
      error: function (errorThrown) {
        $('#personal_info_message').empty().html('<div class="userdate-alert">Повторите попытку позже<div>');
      }
    });
  });
}

//  update PassportData
function updatePassportData() {
  $('#user_passport').click(function () {
    var passser, passnum, passwhom, passdate, passcode, nonce, ajaxurl;
    passser = $('#pass_ser').val();
    passnum = $('#pass_num').val();
    passwhom  = $('#pass_whom ').val();
    passdate = $('#pass_date').val();
    passcode = $('#pass_code').val();
    nonce  =   $('#security-passport').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $('#passport_info_message').empty().html('<div class="userdate-alert">Сохранение...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      data: {
        'action': 'victory_ajax_update_passport',
        'passser': passser,
        'passnum': passnum,
        'passwhom': passwhom,
        'passdate': passdate,
        'passcode': passcode,
        'nonce' : nonce
      },
      success: function (data) {
        $('#passport_info_message').empty().html('<div class="userdate-alert">' + data + '<div>');
      },
      error: function (errorThrown) {
        $('#passport_info_message').empty().html('<div class="userdate-alert">Повторите попытку позже<div>');
      }
    });
  });
}

// change password
function changePassword() {
  $('#change_password').click(function () {
    var oldpass, newpass, renewpass, securitypass, ajaxurl;
    oldpass         = $('#old-pass').val();
    newpass         = $('#new-pass').val();
    renewpass       = $('#re-pass').val();
    nonce           = $('#security-password').val();
    ajaxurl         = vars.admin_url + 'admin-ajax.php';

    $('#password_info_message').empty().html('<div class="userdate-alert">Сохранение...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      data: {
        'action'            :   'victory_ajax_change_pass',
        'oldpass'           :   oldpass,
        'newpass'           :   newpass,
        'renewpass'         :   renewpass,
        'nonce'             :   nonce
      },
      success: function (data) {
        $('#password_info_message').empty().html('<div class="userdate-alert">' + data + '<div>');
        $('#old-pass, #new-pass, #re-pass').val('');
      },
      error: function (errorThrown) {
        $('#password_info_message').empty().html('<div class="userdate-alert">Повторите попытку позже<div>');
      }
    });
  })
}

// Upload Doc
function uploadDoc() {
  $('#uploader_doc').on('click', function () {
    var imageurl, nonce, ajaxurl;
    imageurl = $('#image').val();
    nonce = $('#security-doc').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';
    $('#doc_info_message').empty().html('<div class="userdate-alert">Сохранение...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      data: {
        'action': 'victory_ajax_update_doc',
        'imageurl': imageurl,
        'nonce': nonce
      },
      success: function (data) {
        $('#doc_info_message').empty().html('<div class="userdate-alert">' + data + '<div>');
      },
      error: function (errorThrown) {
        $('#doc_info_message').empty().html('<div class="userdate-alert">Повторите попытку позже<div>');
      }
    });
  })
}

// modal
function modalWindow () {
  $('.main-menu .login a').on('click', function () {
    $('#msg-text').remove();
    $('#login').trigger('reset');
    $('#registration').trigger('reset');
  });
  $('.forgot-pass').on('click', function () {
    $('#enter').modal('hide');
    $('#forgot-pass').on('shown.bs.modal', function() {
      $('body').css('padding-right','15px').addClass('modal-open');
    });
  });
  $('.sign-up').on('click', function () {
    $('#enter').modal('hide');
    $('#sign-up').on('shown.bs.modal', function() {
      $('body').css('padding-right','15px').addClass('modal-open');
      $('#msg-text').remove();
    });
  });
  $('.sign-up').on('click', function () {
    $('#forgot-pass').modal('hide');
    $('#sign-up').on('shown.bs.modal', function() {
      $('body').css('padding-right','15px').addClass('modal-open');
      $('#msg-text').remove();
    });
  });
  $('.leave-order').on('click', function () {
    $('#enter').modal('hide');
    $('#leave-order').on('shown.bs.modal', function() {
      $('body').css('padding-right','15px').addClass('modal-open'); 
    });
  });
  $('.leave-order').on('click', function () {
    $('#sign-up').modal('hide');
    $('#leave-order').on('shown.bs.modal', function() {
      $('body').css('padding-right','15px').addClass('modal-open'); 
    });
  });
};

function initEvents() {
  /*Actions on 'DOM ready' event*/

  /*Actions on 'Window load' event*/
  $(window).on("load", function() {
    collapseMenu();
    calcresult();
    initAmountSlider();
    initRefillSlider();
    changeAmount();
    changeRefill();
    changePeriod();
    setHoverOnAdvantageIcon();
    setClickOnAdvantageIcon();
    initReviewsCarousel();
    sliderServices();
    modalWindow();
    popOver();
    validate('#registration');
    formSubmitRegistration();
    formSubmitLogin();
    updateUserData();
    updatePassportData();
    changePassword();
    uploadDoc();
  });
};


//show pass
function showPass() {
  var x = document.getElementById("password");
  if (x.type === "password") {
      x.type = "text";
  } else {
      x.type = "password";
  }
}

//body class
$(document).ready(function(){
$('body').attr('id', 'top-has');
});

$(document).ready(function(){
  $("a.link-go").click(function() {
      var elementClick = $(this).attr("href")
      var destination = $(elementClick).offset().top;
      jQuery("html:not(:animated),body:not(:animated)").animate({
        scrollTop: destination
      }, 800);
      return false;
  });
});

$(function() {
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();

      if (scroll >= 20) {
          $('.un-act').addClass('active');
          
          // $('header .member-actions').css({
          //     "top": "26px",
          // });
          // $('header .navicon').css({
          //     "top": "34px",
          // });
      } else {
          $('.un-act').removeClass('active');
          
          // $('header .member-actions').css({
          //     "top": "41px",
          // });
          // $('header .navicon').css({
          //     "top": "48px",
          // });
      }
  });
});


/*Start all functions and actions*/
initEvents();
