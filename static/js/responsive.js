ready = false;

$(document).ready(function(){
  console.log('responsive.js begin');
  device = function(){
    this.size = 0;
    this.group = '';
    this.direction = '';
    return this;
  };
  
  Device = device();
  
  sizes = {
    MOBILE_PORTRAIT:640,
    MOBILE_LANDSCAPE:960,
    TABLET_PORTRAIT:800,
    TABLET_LANDSCAPE:960,
    DESKTOP:1024
  };
  
  orientations = {
    PORTRAIT:'PORTRAIT',
    LANDSCAPE:'LANDSCAPE',
  }
  
  groups = {
    MOBILE:'MOBILE',
    TABLET:'TABLET',
    DESKTOP:'DESKTOP'
  }
  
  function respond(){
    if(!Device) Device = device();
    Device.size = $(document).width();
  
    if(Device.size<=sizes.MOBILE_PORTRAIT){
      Device.group = groups.MOBILE;
      Device.orientation = orientations.PORTRAIT;
      
      var $target = $('.ajax-include[href]');
      $target.each(function(i,obj){
        var $obj = $(obj);
        $.ajax({
          url:$obj.attr('href'),
          type:'GET',
          success:function(response){
            template = $(response).find('#content');
            $obj.html(template);
            initWidgets();
            console.log('ajax-include executed');
          },
          error:function(response){
            console.log('ajax-include request failed with response:',response)
          }
        });
      });
      //ready = true;
    }
    
    if(Device.size>=sizes.MOBILE_LANDSCAPE){
      Device.group = groups.MOBILE; 
      Device.orientation = orientations.LANDSCAPE;
      
      
    }
    
    if(Device.size>=sizes.TABLET_PORTRAIT){
      Device.group = groups.TABLET;
      Device.orientation = orientations.PORTRAIT;
    }
    
    if(Device.size>=sizes.TABLET_LANDSCAPE){
      Device.group = groups.TABLET;
      Device.orientation = orientations.LANDSCAPE;
    }
    
    if(Device.size>=sizes.DESKTOP){
      Device.group = groups.DESKTOP;
      Device.orientation = orientations.DESKTOP;
    }
  }
  $(window).resize(respond);
  respond();
  
  // header toggle buttons

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
    
    if(!isMobile && 0){
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
  
  console.log('responsive.js end');
});

