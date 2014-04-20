$(document).ready(function() {

    // header toggle buttons
    var revealTime = 200;
    
    $('#nav-toggle-btn').click(function() {
        $('#nav-container').slideToggle(revealTime);
        $('#main-nav').slideToggle(revealTime);
        console.log($('#nav-container').css('display'));
        if($('#nav-container').css('display') != '-webkit-flex') { 
            $('#nav-container').css('display','flex');      
            $('#nav-container').css('display','-webkit-flex');
        }
    });
    
    $('#user-toggle-btn').click(function() {
        $('#main-nav').slideToggle(revealTime);
        $('#user-nav').slideToggle(revealTime);
        $('#nav-container aside').hide();
        $('#nav-container aside').fadeIn(0);
    });
    
});
