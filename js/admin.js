// Upload Doc Admin
function uploadDocAdmin() {
  jQuery('.uploadimage').on('click', function () {
    jQuery(this).prev('.user-doc-image').val();
    console.log('run');
  });
}


function initEvents() {
  /*Actions on 'DOM ready' event*/

  /*Actions on 'Window load' event*/
  jQuery(window).on("load", function() {
    //uploadDocAdmin();
  });
};

/*Start all functions and actions*/
initEvents();