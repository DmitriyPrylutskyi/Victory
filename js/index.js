function collapseMenu(){$menu_button=$(".menu_button"),$menu_button.click(function(){$menu_button.toggleClass("open"),$menu_button.nextAll(".main-menu").toggleClass("collapse")})}function initAmountSlider(){$("#slider-amount").slider({min:1e3,max:5e5,step:1e3,values:1e3,slide:function(e,t){$(t.handle).parent().next(".input-amount").find("#amount").val(t.value),calcresult()}})}function initRefillSlider(){$("#slider-refill").slider({min:1e3,max:25e3,step:1e3,values:1e3,slide:function(e,t){$(t.handle).parent().next(".input-refill").find("#refill").val(t.value),calcresult()}})}function changeAmount(){$("#amount").keyup(function(){$(this).val()<1e3&&$(this).val(1e3),$(this).val()>5e5&&$(this).val(5e5),$("#slider-amount").slider("value",$(this).val()),calcresult()})}function changeRefill(){$("#refill").keyup(function(){$(this).val()<1e3&&$(this).val(1e3),$(this).val()>5e5&&$(this).val(25e3),$("#slider-refill").slider("value",$(this).val()),calcresult()})}function changePeriod(){$("input[name=period]").change(function(){rate=$("input[name=period]:checked").attr("data-rate"),$("#interest-rate").html(rate+' <span class="unit">%</span>'),calcresult()})}function calcresult(){amount=parseFloat($("#amount").val()),refill=parseFloat($("#refill").val()),rate=parseFloat($("#interest-rate").text()),period=parseFloat($("input[name=period]:checked").val()),rate_per_month=rate/12/100,current_amount=amount,total_amount=amount,total_refill=amount,total_percent=0;for(var e=0;e<period;++e)percent=current_amount*rate_per_month,total_percent+=percent,total_amount+=percent,e<period-1&&(total_amount+=refill,total_refill+=refill),current_amount+=refill;$("#income").text(Math.round(total_percent)),$("#total").text(Math.round(total_amount))}function setHoverOnAdvantageIcon(){$(".advantage-img").hover(function(){$(this).hasClass("active")||$(this).find("img").toggleClass("active")},function(){$(this).hasClass("active")||$(this).find("img").toggleClass("active")})}function setClickOnAdvantageIcon(){$(".advantage-img").click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).parent().find(".advantage-desc p").toggleClass("active")):($(this).addClass("active"),$(this).parent().find(".advantage-desc p").toggleClass("active"))})}function initReviewsCarousel(){$(".reviews .reviews-carousel").slick({prevArrow:'<div class="slick-prev"></div>',nextArrow:'<div class="slick-next"></div>'})}function sliderServices(){$(".slide-foto").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".slide-foto-nav"}),$(".slide-foto-nav").slick({slidesToShow:3,slidesToScroll:3,asNavFor:".slide-foto",dots:!1,centerMode:!1,swipe:!1,vertical:!0,focusOnSelect:!0,prevArrow:'<i class="fas fa-chevron-up left"></i>',nextArrow:'<i class="fas fa-chevron-down right"></i>'})}function popOver(){$('[data-toggle="popover"]').popover({trigger:"focus"})}function modalWindow(){$(".forgot-pass").on("click",function(){$("#enter").modal("hide"),$("#forgot-pass").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".sign-up").on("click",function(){$("#enter").modal("hide"),$("#sign-up").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".sign-up").on("click",function(){$("#forgot-pass").modal("hide"),$("#sign-up").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".leave-order").on("click",function(){$("#enter").modal("hide"),$("#leave-order").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$("#victory-login").on("click",function(){registration()})}function registration(){var e,t,a,n,i,o,s,l;e=$("#registration #last_name").val(),t=$("#registration #first_name").val(),a=$("#registration #patronymic").val(),n=$("#registration #email").val(),i=$("#registration #phone").val(),o=$("#registration #password").val(),rpassword=$("#registration #rpassword").val(),agree=$("#registration #ireadd2:checked").val(),s=$("#registration #security-register").val(),l=vars.admin_url+"admin-ajax.php",$.ajax({type:"POST",url:l,dataType:"json",data:{action:"victory_register_form",last_name:e,first_name:t,patronymic:a,email:n,phone:i,password:o,rpassword:rpassword,nonce:s},success:function(e){!0===e.register?($("#register_message_area").empty().append('<div class="login-alert">'+e.message+"</div>"),document.location.href="/personal-account/"):$("#register_message_area").empty().append('<div class="alert_err login-alert">'+e.message+"</div>")},error:function(e){}})}function initEvents(){$(window).on("load",function(){collapseMenu(),calcresult(),initAmountSlider(),initRefillSlider(),changeAmount(),changeRefill(),changePeriod(),setHoverOnAdvantageIcon(),setClickOnAdvantageIcon(),initReviewsCarousel(),sliderServices(),modalWindow(),popOver()})}function showPass(){var e=document.getElementById("my-pass");"password"===e.type?e.type="text":e.type="password"}$(document).ready(function(){$("body").attr("id","top-has")}),$(document).ready(function(){$("a.link-go").click(function(){var e=$(this).attr("href"),t=$(e).offset().top;return jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop:t},800),!1})}),$(function(){$(window).scroll(function(){$(window).scrollTop()>=20?$(".un-act").addClass("active"):$(".un-act").removeClass("active")})}),initEvents();