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
    min: 0,
    max: 25000,
    step: 1000,
    values: 0,
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
      errorMsg = 'Некорректный номер телефона';
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
      errorMsg = 'Поле пустое';
    } else {
      $input.addClass('full');
      errorMsg = '';
    }

    if ($input.filter('[name $= "name"]').length > 0) {
      if (str != '') {
        var regex = /^[^\d_,.!@#$%^&*()-/*+=?~`\[\]\\<>]+$/;

        if (regex.exec(str) == null) {
          errorMsg = 'Некорректное имя';
        }
      }
    }

    if ($input.attr('type') == 'email' && str != '') {
      var regex = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

      if (regex.exec(str) == null) {
        errorMsg = 'Некорректный адрес почты';
      }
    }

    if ( $input.attr('type') == 'tel' && str != '' && str.length < 6 ) {
      errorMsg = 'Некорректный номер телефона';
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
    //agree       =   $("#registration #ireadd2:checked").val();
    nonce       =   $('#registration #security-register').val();
    ajaxurl     =   vars.admin_url + 'admin-ajax.php';

    /*if ( !$('#ireadd2').is(":checked") ) {
      msgText.remove();
      msg.html('<span id="msg-text">Подтвердите согласие с правилами.</span>');
      msg.removeClass('success');
      msg.addClass('fail');
      return;
    }*/

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      dataType: 'json',
      data: {
        'action'                    :   'victory_ajax_register_form',
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
          msgText.remove();
          msg.html('<span id="msg-text">' + data.message + '</span>');
          msg.removeClass('fail');
          msg.addClass('success');
          $('.error-msg').text('');
          $('#registration input').css({'borderColor': '#e7830c'});
          $('#msg-text').empty();

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
        msg.html('<span id="msg-text">Повторите попытку позже</span>');
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
    //agree       =   $("#login #ireadd:checked").val();
    nonce       =   $('#login #security-login').val();
    ajaxurl     =   vars.admin_url + 'admin-ajax.php';

/*    if ( !$('#ireadd').is(":checked") ) {
      msgText.remove();
      msg.prepend('<span id="msg-text">Подтвердите согласие с правилами.</span>');
      msg.removeClass('success');
      msg.addClass('fail');
      return;
    }*/

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      dataType: 'json',
      data: {
        'action'                    :   'victory_ajax_login_form',
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
        msg.html('<span id="msg-text">Повторите попытку позже</span>');
        msg.removeClass('success');
        msg.addClass('fail');
      }
    });
  })
}

function forgotPassword() {
  $('#forgot-password').click(function (e) {
    var msg = $('.msg');
    var msgText = $('#msg-text');

    var forgot_email, nonce, ajaxurl;
    forgot_email = $('#forgot-email').val();
    nonce = $('#security-forgot').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      data: {
        'action': 'victory_ajax_forgot_pass',
        'forgot_email': forgot_email,
        'nonce': nonce
      },

      success: function (data) {
        msgText.remove();
        msg.html('<span id="msg-text">' + datae + '</span>');
        msg.removeClass('fail');
        msg.addClass('success');
      },
      error: function (errorThrown) {
        msgText.remove();
        msg.html('<span id="msg-text">Повторите попытку позже</span>');
        msg.removeClass('success');
        msg.addClass('fail');
      }
    });
  });
}

//  update UserData
function updateUserData() {
  $('#user_data').click(function () {
    var foto, firstname, lastname, patronymic, useremail, userphone, nonce, ajaxurl;
    foto = $('#foto').val();
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
        'foto': foto,
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
    var $imageurl, images = [];
    var nonce, ajaxurl;

    $imageurl = $('.user-preview-image');
    $.each($imageurl,function(key,data) {
      images.push($(data).attr('src'));
    });

    nonce = $('#security-doc').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';
    $('#doc_info_message').empty().html('<div class="userdate-alert">Сохранение...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      data: {
        'action': 'victory_ajax_update_doc',
        'images': images,
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

// Add New Deposits
function addNewDeposits() {
  $('#add-deposit').click(function () {

    $('.leave-order').trigger("click");

    var nonce, ajaxurl, amount, refill, rate, period;

    amount = parseFloat($('#amount').val());
    refill = parseFloat($('#refill').val());
    rate = parseFloat($('#interest-rate').text());
    period = parseFloat($('input[name=period]:checked').val());
    nonce = $('#security-deposit').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $('#deposit_info_message').empty().html('<div class="userdate-alert">Отправка...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,

      data: {
        'action': 'victory_ajax_add_deposit',
        'amount': amount,
        'refill': refill,
        'rate': rate,
        'period': period,
        'nonce': nonce
      },
      success: function (data) {
        $('#deposit_info_message').empty().html('<div class="userdate-alert">' + data + '<div>');
      },
      error: function (errorThrown) {
        $('#deposit_info_message').empty().html('<div class="userdate-alert">Повторите попытку позже<div>');
      }
    });
  })
};

// Sent Request
function sendRequest() {
  $('#send-request').click(function () {
    var requestor_name, requestor_email, requestor_comment, nonce, ajaxurl;
    requestor_name = $('#form-request #requestor-name').val();
    requestor_email = $('#form-request #requestor-email').val();
    requestor_comment = $('#form-request #requestor-comment').val();

    nonce = $('#security-request').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $('#request_info_message').empty().html('<div class="userdate-alert">Отправка...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      dataType: 'json',
      data: {
        'action': 'victory_ajax_request',
        'requestor_name': requestor_name,
        'requestor_email': requestor_email,
        'requestor_comment': requestor_comment,
        'nonce': nonce
      },

      success: function (data) {
        if (data.request === true) {
          $('#form-request input').css({'borderColor': '#e7830c'});
          $('#requestor-name').val('');
          $('#requestor-email').val('');
          $('#requestor-comment').val('');
          $('#request_info_message').empty().html('<div class="userdate-alert" style="color: limegreen;">' + data + '<div>');
          setTimeout(function () {
            $('#request_info_message').empty();
          }, 1500);
        } else {
          $('#form-request input').css({'borderColor': '#e7830c'});
          $('#form-request #' + data.id).css({'borderColor': 'red'});
          $('#request_info_message').empty().html('<div class="userdate-alert style="color: limegreen;">' + data + '<div>');
        }
      },
      error: function (errorThrown) {
        $('#request_info_message').empty().html('<div class="userdate-alert style="color: red;">Повторите попытку позже<div>');
      }
    });
  });
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

    });
  });
  $('.sign-up').on('click', function () {
    $('#forgot-pass').modal('hide');
    $('#sign-up').on('shown.bs.modal', function() {
      $('body').css('padding-right','15px').addClass('modal-open');
    });
  });
  $('#enter').on('hide.bs.modal', function () {
    $('.error-msg').text('');
    $('#login input').css({'borderColor': '#e7830c'});
    $('.msg span').empty();
  });
  $('#sign-up').on('hide.bs.modal', function () {
    $('.error-msg').text('');
    $('#registration input').css({'borderColor': '#e7830c'});
    $('.msg span').empty();
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
  $('.make-order').on('click', function () {
    order_type = $(this).find('.one-serv-name').text();
    $('#make-order').on('shown.bs.modal', function() {
      $('#order-type').val(order_type);
      $('body').css('padding-right','15px').addClass('modal-open');
    });
  });
};

function getNewsPost() {
  $('.js-watch').click(function () {
    post = $(this).attr('data-post');
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $.ajax({
      url: ajaxurl,
      type: 'post',
      dataType: 'json',
      data: ({
        action: 'victory_ajax_get_news',
        'post': post
      }),
      success: function(data) {
        $('#watch-news .modal-body').empty().html(data['new']);
      },
      error: function(errorThrown) {
        console.log('error');
      }
    });
  })
}

function paginationNews() {
  $('.news').find('.pagination').find('li').click(function() {

    if ($(this).hasClass('active')) {
      return false;
    }

    var page = $(this).attr('page');
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $.ajax({
      url: ajaxurl,
      type: 'post',
      dataType: 'json',
      data: ({
        action: 'paginationNews',
        'page': page
        }),
      success: function(data) {
        $('.news-wrapp').html(data['news']);
        paginationNews();
      },
      error: function(errorThrown) {

      }
    });
    return false;
  });
}

function paginationReviews() {
  $('.review').find('.pagination').find('li').click(function() {

    if ($(this).hasClass('active')) {
      return false;
    }

    var page = $(this).attr('page');
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $.ajax({
      url: ajaxurl,
      type: 'post',
      dataType: 'json',
      data: ({
        action: 'paginationReviews',
        'page': page
      }),
      success: function(data) {
        $('.rewiews-wrapp').html(data['reviews']);
        paginationReviews();
      },
      error: function(errorThrown) {

      }
    });
    return false;
  });
}

function addOrder() {
  $('#victory-order').click(function() {
    var nonce, ajaxurl, order_type, order_name, order_phone, order_date, order_comment;

    order_type = $('#order-type').val();
    order_name = $('#order-name').val();
    order_phone = $('#order-phone').val();
    order_date = $('#order-date').val();
    order_comment = $('#order-comment').val();
    nonce = $('#security-order').val();
    ajaxurl = vars.admin_url + 'admin-ajax.php';

    $('#order_info_message').empty().html('<div class="userdate-alert">Отправка...<div>');

    $.ajax({
      type: 'POST',
      url: ajaxurl,
      data: {
        'action': 'victory_ajax_add_order',
        'order_type': order_type,
        'order_name': order_name,
        'order_phone': order_phone,
        'order_date': order_date,
        'order_comment': order_comment,
        'nonce': nonce
      },
      success: function (data) {
        $('#order_info_message').empty().html('<div class="userdate-alert">' + data + '<div>');
        $('#form-order').trigger('reset');
        setTimeout(function () {
          $('#order_info_message').empty();
          $('#make-order .close').trigger("click");
        }, 1500);
      },
      error: function (errorThrown) {
        $('#order_info_message').empty().html('<div class="userdate-alert">Повторите попытку позже<div>');
      }
    });
  });
}

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
    forgotPassword();
    updateUserData();
    updatePassportData();
    changePassword();
    uploadDoc();
    addNewDeposits();
    paginationNews();
    paginationReviews();
    addOrder();
    sendRequest();
    getNewsPost();
  });
};

$(document).ready(function(){
  $("#see-pass").next('label').click(function() {
    var input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      } else {
        input.type = "password";
      }
  });
  $(".nw1 span").click(function() {
    var input = document.getElementById("my-pass1");
    if (input.type === "password") {
      input.type = "text";
      } else {
        input.type = "password";
      }
  });
  $(".nw2 span").click(function() {
    var input = document.getElementById("my-pass2");
    if (input.type === "password") {
      input.type = "text";
      } else {
        input.type = "password";
      }
  });
});
$(document).ready(function() {

  var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.profile-pic').attr('src', e.target.result);
          }

          reader.readAsDataURL(input.files[0]);
      }
  }

  $(".file-upload").on('change', function(){
      readURL(this);
  });

  $(".upload-button").on('click', function() {
     $(".file-upload").click();
  });
});
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
