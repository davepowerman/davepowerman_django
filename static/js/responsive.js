$(document).on('ready',function(){
    
    
    
    function respond(){
      var w = $(document).width();
    
      if(w<600){
        
      }
      
      if(w<900){
      
      }
      
      if(w<1200){
      
      }
      
      else {
      
      }
    }
    
    $(window).resize();
    respond();
    
    // header toggle buttons
    var revealTime = 100;
    
    $('#nav-toggle-btn').click(function(){
        toggleShade()
        moveAfterShade('#main-header');
        $('#nav-container').toggle(revealTime);
        $('#main-nav').toggle(revealTime);
        console.log($('#nav-container').css('display'));
        if($('#nav-container').css('display') != '-webkit-flex') { 
            $('#nav-container').css('display','flex');      
            $('#nav-container').css('display','-webkit-flex');
        }
    });
    
    $('#user-toggle-btn').click(function(){
        $('#main-nav').toggle(revealTime);
        $('#user-nav').toggle(revealTime);
        $('#nav-container aside').hide();
        $('#nav-container aside').fadeIn(0);
    });
    /*
    var swipePercentage = 0.90;
    var swipeTime = 300
    
    $('#content .scroll-vertical').on('swipeleft', function(event){
        $(this).animate({
            scrollLeft: $(this).scrollLeft()+($(this).find('.content-column').width())*swipePercentage
        },swipeTime);
    });
    
    $('#content .scroll-vertical').on('swiperight', function(event){
        $(this).animate({
            scrollLeft: $(this).scrollLeft()-($(this).find('.content-column').width())*swipePercentage
        },swipeTime);
    });*/
});
