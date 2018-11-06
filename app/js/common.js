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

function initEvents() {
    /*Actions on 'DOM ready' event*/

    /*Actions on 'Window load' event*/
    $(window).on("load", function() {
      initAmountSlider();
      initRefillSlider();
      setHoverOnAdvantageIcon();
      setClickOnAdvantageIcon();
    });
};

/*Start all functions and actions*/
initEvents();