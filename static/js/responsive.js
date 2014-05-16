$(document).on('ready',function(){
    isMobile = false;
    
    function respond(){
      var w = $(document).width();
    
      if(w<=660){
        isMobile = true;
      }
      
      if(w<=900){
      
      }
      
      if(w<=1200){
      
      }
      
      else {
      
      }
    }
    
    $(window).resize();
    respond();
    
    // header toggle buttons
    var revealTime = 100;
    
    

    $('.menu-toggle').click(function(){
      //if($('#nav-account ul').hasClass('showing'))
      //  $('#nav-account ul').toggleClass('showing');
      $('#nav-main > ul').toggleClass('showing');
    });
    
    $('.account-toggle').click(function(){
      //if($('#nav-main ul').hasClass('showing'))
      //  $('#nav-main ul').toggleClass('showing');
      $('#nav-account').toggleClass('showing');   
    });
    
    
    
    
    $('.search-toggle').click(function(){
      $('header .searchbar').toggleClass('showing');
    });
    
    
    $('#nav-account').removeClass('showing');
    
    $('.user').click(function(){
      $('#nav-account').toggleClass('showing');
      
      if(!isMobile){
        $('.user').mouseleave(function(){
          if($('#nav-account').hasClass('showing'))
          $('#nav-account').toggleClass('showing');
          $('.user').unbind('mouseleave');
        });
      }
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
