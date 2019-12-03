$(function() {
    $('a.donate').click(function(){
       $('.donate-popup').removeClass('hide');
    });
    //$('.donate-popup').removeClass('hide');
    $('.donate-popup button.close').click(function() {
        $('.donate-popup').addClass('hide');
    });
});