function initAmountSlider(){$("#slider-amount").slider({min:1e3,max:5e5,step:1e3,values:1e3,slide:function(n,t){$(t.handle).parent().next(".input-amount").find("#amount").val(t.value),calcresult()}})}function initRefillSlider(){$("#slider-refill").slider({min:1e3,max:25e3,step:1e3,values:1e3,slide:function(n,t){$(t.handle).parent().next(".input-refill").find("#refill").val(t.value),calcresult()}})}function calcresult(){$("#income").text(55),$("#total").text(1055)}function setHoverOnAdvantageIcon(){$(".advantage-img").hover(function(){var n=$(this).find("img").attr("src").replace(/^\D+/g,"");$(this).find("img").attr("src","/img/advantage-icon-hover-"+n)},function(){if(!$(this).hasClass("active")){var n=$(this).find("img").attr("src").replace(/^\D+/g,"");$(this).find("img").attr("src","/img/advantage-icon-"+n)}})}function setClickOnAdvantageIcon(){$(".advantage-img").click(function(){$(this).toggleClass("active"),$(this).parent().find(".advantage-desc p").toggleClass("active")})}function initEvents(){$(window).on("load",function(){initAmountSlider(),initRefillSlider(),setHoverOnAdvantageIcon(),setClickOnAdvantageIcon()})}function showPass(){var n=document.getElementById("my-pass");"password"===n.type?n.type="text":n.type="password"}$(document).ready(function(){$(".forgot-pass").on("click",function(){$("#enter").modal("hide"),$("#forgot-pass").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".sign-up").on("click",function(){$("#enter").modal("hide"),$("#sign-up").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})}),$(".leave-order").on("click",function(){$("#enter").modal("hide"),$("#leave-order").on("shown.bs.modal",function(){$("body").css("padding-right","15px").addClass("modal-open")})})}),initEvents();