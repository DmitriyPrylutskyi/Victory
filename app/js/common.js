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

function calcresult() {
  $('#income').text(55);
  $('#total').text(1055);
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
    initAmountSlider();
    initRefillSlider();
    setHoverOnAdvantageIcon();
    setClickOnAdvantageIcon();
    initReviewsCarousel();
    sliderServices();
    modalWindow ();
    popOver();
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
