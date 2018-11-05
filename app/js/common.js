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

function initEvents() {
    /*Actions on 'DOM ready' event*/

    /*Actions on 'Window load' event*/
    $(window).on("load", function() {
      initAmountSlider();
      initRefillSlider();
    });
};

/*Start all functions and actions*/
initEvents();