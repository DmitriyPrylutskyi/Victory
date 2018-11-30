function collapseMenu(){$menu_button=$(".menu_button"),$menu_button.click(function(){$menu_button.toggleClass("open"),$menu_button.nextAll(".main-menu").toggleClass("collapse")})}function initAmountSlider(){$("#slider-amount").slider({min:1e3,max:5e5,step:1e3,values:1e3,slide:function(e,a){$(a.handle).parent().next(".input-amount").find("#amount").val(a.value),calcresult()}})}function initRefillSlider(){$("#slider-refill").slider({min:1e3,max:25e3,step:1e3,values:1e3,slide:function(e,a){$(a.handle).parent().next(".input-refill").find("#refill").val(a.value),calcresult()}})}function changeAmount(){$("#amount").keyup(function(){$(this).val()<1e3&&$(this).val(1e3),$(this).val()>5e5&&$(this).val(5e5),$("#slider-amount").slider("value",$(this).val()),calcresult()})}function changeRefill(){$("#refill").keyup(function(){$(this).val()<1e3&&$(this).val(1e3),$(this).val()>5e5&&$(this).val(25e3),$("#slider-refill").slider("value",$(this).val()),calcresult()})}function changePeriod(){$("input[name=period]").change(function(){rate=$("input[name=period]:checked").attr("data-rate"),$("#interest-rate").html(rate+' <span class="unit">%</span>'),calcresult()})}function calcresult(){amount=parseFloat($("#amount").val()),refill=parseFloat($("#refill").val()),rate=parseFloat($("#interest-rate").text()),period=parseFloat($("input[name=period]:checked").val()),rate_per_month=rate/12/100,current_amount=amount,total_amount=amount,total_refill=amount,total_percent=0;for(var e=0;e<period;++e)percent=current_amount*rate_per_month,total_percent+=percent,total_amount+=percent,e<period-1&&(total_amount+=refill,total_refill+=refill),current_amount+=refill;$("#income").text(Math.round(total_percent)),$("#total").text(Math.round(total_amount))}function setHoverOnAdvantageIcon(){$(".advantage-img").hover(function(){$(this).hasClass("active")||$(this).find("img").toggleClass("active")},function(){$(this).hasClass("active")||$(this).find("img").toggleClass("active")})}function setClickOnAdvantageIcon(){$(".advantage-img").click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).parent().find(".advantage-desc p").toggleClass("active")):($(this).addClass("active"),$(this).parent().find(".advantage-desc p").toggleClass("active"))})}function initReviewsCarousel(){$(".reviews .reviews-carousel").slick({prevArrow:'<div class="slick-prev"></div>',nextArrow:'<div class="slick-next"></div>'})}function sliderServices(){$(".slide-foto").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".slide-foto-nav"}),$(".slide-foto-nav").slick({slidesToShow:3,slidesToScroll:3,asNavFor:".slide-foto",dots:!1,centerMode:!1,swipe:!1,vertical:!0,focusOnSelect:!0,prevArrow:'<i class="fas fa-chevron-up left"></i>',nextArrow:'<i class="fas fa-chevron-down right"></i>'})}function popOver(){$('[data-toggle="popover"]').popover({trigger:"focus"})}function validate(e){errorMsg="required",$(e+' input[type="tel"]').keyup(function(){var e=$(this),a=e.nextAll(".error-msg"),t=/^[\d- ]+$/,s=e.val();null==t.exec(s)?(e.val(s.slice(0,-1)),errorMsg="incorrect phone"):errorMsg="",errorMsg?(e.css({borderColor:"red"}),a.text(errorMsg)):(e.css({borderColor:"#cccccc"}),a.text(""))}),$(e+" input").blur(function(){var e=$(this),a=e.val(),t=e.nextAll(".error-msg");if(e.prop("required")&&""==a?(e.removeClass("full"),errorMsg="required"):(e.addClass("full"),errorMsg=""),"email"==e.attr("type")&&""!=a){null==/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.exec(a)&&(errorMsg="incorrect email")}"tel"==e.attr("type")&&""!=a&&a.length<6&&(errorMsg="incorrect phone"),errorMsg?(e.css({borderColor:"red"}),t.text(errorMsg)):(e.css({borderColor:"#e7830c"}),t.text(""))})}function formSubmitRegistration(){$('#registration input[type="button"]').click(function(e){var a,t,s,n,o,r,i,l,c=$(".msg"),d=$("#msg-text");if(a=$("#registration #last_name").val(),t=$("#registration #first_name").val(),s=$("#registration #patronymic").val(),n=$("#registration #email").val(),o=$("#registration #phone").val(),r=$("#registration #password").val(),rpassword=$("#registration #rpassword").val(),agree=$("#registration #ireadd2:checked").val(),i=$("#registration #security-register").val(),l=vars.admin_url+"admin-ajax.php",!$("#ireadd2").is(":checked"))return d.remove(),c.html('<span id="msg-text">Must agree</span>'),c.removeClass("success"),void c.addClass("fail");$.ajax({type:"POST",url:l,dataType:"json",data:{action:"victory_register_form",last_name:a,first_name:t,patronymic:s,email:n,phone:o,password:r,rpassword:rpassword,nonce:i},success:function(e){!0===e.register?($("#registration input").css({borderColor:"#e7830c"}),d.remove(),c.html('<span id="msg-text">'+e.message+"</span>"),c.removeClass("fail"),c.addClass("success"),setTimeout(function(){document.location.href="/personal-account/"},1e3)):($("#registration input").css({borderColor:"#e7830c"}),c.html('<span id="msg-text">'+e.message+"</span>"),c.removeClass("success"),c.addClass("fail"),$("#registration #"+e.id).css({borderColor:"red"}))},error:function(e){c.html('<span id="msg-text">The message could not be sent. Try it again.</span>'),c.removeClass("success"),c.addClass("fail")}})})}function formSubmitLogin(){$('#login input[type="button"]').click(function(e){var a,t,s,n,o=$(".msg"),r=$("#msg-text");if(a=$("#login #phone").val(),t=$("#login #password").val(),agree=$("#login #ireadd:checked").val(),s=$("#login #security-login").val(),n=vars.admin_url+"admin-ajax.php",!$("#ireadd").is(":checked"))return r.remove(),o.prepend('<span id="msg-text">Must agree</span>'),o.removeClass("success"),void o.addClass("fail");$.ajax({type:"POST",url:n,dataType:"json",data:{action:"victory_login_form",phone:a,password:t,nonce:s},success:function(e){!0===e.login?($("#login input").css({borderColor:"#e7830c"}),r.remove(),o.html('<span id="msg-text">'+e.message+"</span>"),o.removeClass("fail"),o.addClass("success"),setTimeout(function(){document.location.href="/personal-account/"},1e3)):($("#login input").css({borderColor:"#e7830c"}),r.remove(),o.html('<span id="msg-text">'+e.message+"</span>"),o.removeClass("success"),o.addClass("fail"),$("#login #"+e.id).css({borderColor:"red"}))},error:function(e){r.remove(),o.html('<span id="msg-text">The message could not be sent. Try it again.</span>'),o.removeClass("success"),o.addClass("fail")}})})}function updateUserData(){$("#user_data").click(function(){var e,a,t,s,n,o,r;e=$("#first_name").val(),a=$("#last_name").val(),t=$("#patronymic").val(),s=$("#user_email").val(),n=$("#user_phone").val(),userbirthday=$("#birthday").val(),usercity=$("#city").val(),gender=$("input[name='gender']:checked").val(),o=$("#security-personal").val(),r=vars.admin_url+"admin-ajax.php",$("#personal_info_message").empty().html('<div class="userdate-alert">Сохранение...<div>'),$.ajax({type:"POST",url:r,data:{action:"victory_ajax_update_profile",firstname:e,lastname:a,patronymic:t,useremail:s,userphone:n,userbirthday:userbirthday,usercity:usercity,gender:gender,nonce:o},success:function(e){$("#personal_info_message").empty().html('<div class="userdate-alert">'+e+"<div>")},error:function(e){$("#personal_info_message").empty().html('<div class="userdate-alert">Повторите попытку позже<div>')}})})}function updatePassportData(){$("#user_passport").click(function(){var e,a,t,s,n,o,r;e=$("#pass_ser").val(),a=$("#pass_num").val(),t=$("#pass_whom ").val(),s=$("#pass_date").val(),n=$("#pass_code").val(),o=$("#security-passport").val(),r=vars.admin_url+"admin-ajax.php",$("#passport_info_message").empty().html('<div class="userdate-alert">Сохранение...<div>'),$.ajax({type:"POST",url:r,data:{action:"victory_ajax_update_passport",passser:e,passnum:a,passwhom:t,passdate:s,passcode:n,nonce:o},success:function(e){$("#passport_info_message").empty().html('<div class="userdate-alert">'+e+"<div>")},error:function(e){$("#passport_info_message").empty().html('<div class="userdate-alert">Повторите попытку позже<div>')}})})}function changePassword(){$("#change_password").click(function(){var e,a,t,s;e=$("#old-pass").val(),a=$("#new-pass").val(),t=$("#re-pass").val(),nonce=$("#security-password").val(),s=vars.admin_url+"admin-ajax.php",$("#password_info_message").empty().html('<div class="userdate-alert">Сохранение...<div>'),$.ajax({type:"POST",url:s,data:{action:"victory_ajax_change_pass",oldpass:e,newpass:a,renewpass:t,nonce:nonce},success:function(e){$("#password_info_message").empty().html('<div class="userdate-alert">'+e+"<div>"),$("#old-pass, #new-pass, #re-pass").val("")},error:function(e){$("#password_info_message").empty().html('<div class="userdate-alert">Повторите попытку позже<div>')}})})}function uploadDoc(){$("#uploader_doc").on("click",function(){var e,a,t,s=[];e=$(".user-preview-image"),$.each(e,function(e,a){s.push($(a).attr("src"))}),a=$("#security-doc").val(),t=vars.admin_url+"admin-ajax.php",$("#doc_info_message").empty().html('<div class="userdate-alert">Сохранение...<div>'),$.ajax({type:"POST",url:t,data:{action:"victory_ajax_update_doc",images:s,nonce:a},success:function(e){$("#doc_info_message").empty().html('<div class="userdate-alert">'+e+"<div>")},error:function(e){$("#doc_info_message").empty().html('<div class="userdate-alert">Повторите попытку позже<div>')}})})}function modalWindow(){$(".main-menu .login a").on("click",function(){$("#msg-text").remove(),$("#login").trigger("reset"),$("#registration").trigger("reset")}),$(".forgot-pass").on("click",function(){$("#enter").modal("hide"),$("#forgot-pass").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".sign-up").on("click",function(){$("#enter").modal("hide"),$("#sign-up").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open"),$("#msg-text").remove()})}),$(".sign-up").on("click",function(){$("#forgot-pass").modal("hide"),$("#sign-up").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open"),$("#msg-text").remove()})}),$(".leave-order").on("click",function(){$("#enter").modal("hide"),$("#leave-order").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".leave-order").on("click",function(){$("#sign-up").modal("hide"),$("#leave-order").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})})}function initEvents(){$(window).on("load",function(){collapseMenu(),calcresult(),initAmountSlider(),initRefillSlider(),changeAmount(),changeRefill(),changePeriod(),setHoverOnAdvantageIcon(),setClickOnAdvantageIcon(),initReviewsCarousel(),sliderServices(),modalWindow(),popOver(),validate("#registration"),formSubmitRegistration(),formSubmitLogin(),updateUserData(),updatePassportData(),changePassword(),uploadDoc()})}$(document).ready(function(){$(".seee-pass span").click(function(){var e=document.getElementById("my-pass");"password"===e.type?e.type="text":e.type="password"}),$(".nw1 span").click(function(){var e=document.getElementById("my-pass1");"password"===e.type?e.type="text":e.type="password"}),$(".nw2 span").click(function(){var e=document.getElementById("my-pass2");"password"===e.type?e.type="text":e.type="password"})}),$(document).ready(function(){var e=function(e){if(e.files&&e.files[0]){var a=new FileReader;a.onload=function(e){$(".profile-pic").attr("src",e.target.result)},a.readAsDataURL(e.files[0])}};$(".file-upload").on("change",function(){e(this)}),$(".upload-button").on("click",function(){$(".file-upload").click()})}),$(document).ready(function(){$("body").attr("id","top-has")}),$(document).ready(function(){$("a.link-go").click(function(){var e=$(this).attr("href"),a=$(e).offset().top;return jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop:a},800),!1})}),$(function(){$(window).scroll(function(){$(window).scrollTop()>=20?$(".un-act").addClass("active"):$(".un-act").removeClass("active")})}),initEvents();