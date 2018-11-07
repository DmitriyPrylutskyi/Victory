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
      var img = $( this ).find('img').attr('src').replace( /^\D+/g, '');
      $(this).find('img').attr('src', '/img/advantage-icon-hover-' + img);
    }, function() {
      if (  !$( this ).hasClass('active') ) {
        var img = $(this).find('img').attr('src').replace(/^\D+/g, '');
        $(this).find('img').attr('src', '/img/advantage-icon-' + img);
      }
    }
  )
}

function setClickOnAdvantageIcon() {
  $('.advantage-img').click(function() {
    $( this ).toggleClass('active');
    $( this ).parent().find('.advantage-desc p').toggleClass('active');
  })
}

function initReviewsCarousel() {
    $('.reviews .reviews-carousel').slick({
      prevArrow: '<div class="slick-prev"></div>',
      nextArrow: '<div class="slick-next"></div>'
    })
}

function initEvents() {
    /*Actions on 'DOM ready' event*/

    /*Actions on 'Window load' event*/
    $(window).on("load", function() {
      initAmountSlider();
      initRefillSlider();
      setHoverOnAdvantageIcon();
      setClickOnAdvantageIcon();
      initReviewsCarousel();
    });
};
// modal
$(document).ready(function () {
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
});
//show pass
function showPass() {
  var x = document.getElementById("my-pass");
  if (x.type === "password") {
      x.type = "text";
  } else {
      x.type = "password";
  }
}

/*Start all functions and actions*/
initEvents();
