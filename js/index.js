function collapseMenu(){$menu_button=$(".menu_button"),$menu_button.click(function(){$menu_button.toggleClass("open"),$menu_button.nextAll(".main-menu").toggleClass("collapse")})}function initAmountSlider(){$("#slider-amount").slider({min:1e3,max:5e5,step:1e3,values:1e3,slide:function(n,e){$(e.handle).parent().next(".input-amount").find("#amount").val(e.value),calcresult()}})}function initRefillSlider(){$("#slider-refill").slider({min:1e3,max:25e3,step:1e3,values:1e3,slide:function(n,e){$(e.handle).parent().next(".input-refill").find("#refill").val(e.value),calcresult()}})}function calcresult(){$("#income").text(55),$("#total").text(1055)}function setHoverOnAdvantageIcon(){$(".advantage-img").hover(function(){$(this).hasClass("active")||$(this).find("img").toggleClass("active")},function(){$(this).hasClass("active")||$(this).find("img").toggleClass("active")})}function setClickOnAdvantageIcon(){$(".advantage-img").click(function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).parent().find(".advantage-desc p").toggleClass("active")):($(this).addClass("active"),$(this).parent().find(".advantage-desc p").toggleClass("active"))})}function initReviewsCarousel(){$(".reviews .reviews-carousel").slick({prevArrow:'<div class="slick-prev"></div>',nextArrow:'<div class="slick-next"></div>'})}function sliderServices(){$(".slide-foto").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".slide-foto-nav"}),$(".slide-foto-nav").slick({slidesToShow:3,slidesToScroll:3,asNavFor:".slide-foto",dots:!1,centerMode:!1,swipe:!1,vertical:!0,focusOnSelect:!0,prevArrow:'<i class="fas fa-chevron-up left"></i>',nextArrow:'<i class="fas fa-chevron-down right"></i>'})}function modalWindow(){$(".forgot-pass").on("click",function(){$("#enter").modal("hide"),$("#forgot-pass").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".sign-up").on("click",function(){$("#enter").modal("hide"),$("#sign-up").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".sign-up").on("click",function(){$("#forgot-pass").modal("hide"),$("#sign-up").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".leave-order").on("click",function(){$("#enter").modal("hide"),$("#leave-order").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})})}function initEvents(){$(window).on("load",function(){collapseMenu(),initAmountSlider(),initRefillSlider(),setHoverOnAdvantageIcon(),setClickOnAdvantageIcon(),initReviewsCarousel(),sliderServices(),modalWindow()})}function showPass(){var n=document.getElementById("my-pass");"password"===n.type?n.type="text":n.type="password"}$(document).ready(function(){$("body").attr("id","top-has")}),$(document).ready(function(){$("a.link-go").click(function(){var n=$(this).attr("href"),e=$(n).offset().top;return jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop:e},800),!1})}),$(function(){$(window).scroll(function(){$(window).scrollTop()>=20?$(".un-act").addClass("active"):$(".un-act").removeClass("active")})}),initEvents();