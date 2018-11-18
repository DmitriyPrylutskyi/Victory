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
  console.log(rate);
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


// modal
function modalWindow () {
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
  $('.leave-order').on('click', function () {
    $('#enter').modal('hide');
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
    modalWindow ();
  });
};


//show pass
function showPass() {
  var x = document.getElementById("my-pass");
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
