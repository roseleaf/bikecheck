function imageOneFade(){
  $('.first').fadeIn(1000, function(){ setTimeout("$('.first').fadeOut(1000); imageTwoFade();",1000); });
}

function imageTwoFade(){
  $('.second').fadeIn(1000, function(){ setTimeout("$('.second').fadeOut(1000); imageOneFade();",1000); });
}

$(document).ready(function(){
   imageOneFade();
});




