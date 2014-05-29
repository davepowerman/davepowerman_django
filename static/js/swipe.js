var MobileSwipe = function(){
  var self = this;
  
  function getPolarity(val){
    if(val==Math.abs(val)){
      return 1;
    } else {
      return -1;
    }
  }
  
  if(!jQuery){return false;}
  
  self.events = {
    swipe:function(target,callback){
      var $target = $(target),
        event = {
          start:{},
          end:{},
          startLeft:0,
        },
        touchDown = false;
      
      //$target.on('dragstart dragend drag drop',function(e){e.preventDefault();});
      
      $target.on('touchstart mousedown',function(e){
        touchDown = true;
        event.start.x = e.clientX;
        event.start.y = e.clientY;
        event.startLeft = $target.scrollLeft();
      });
      
      $target.on('touchend mouseup',function(e){
        touchDown = false;
        event.end.x = e.clientX;
        event.end.y = e.clientY;
        if(event.start.x>event.end.x) event.direction = 'right';
        else event.direction = 'left';
        if(Math.abs(event.start.y-event.end.y)<35 && Math.abs(event.start.x-event.end.x)>=50){
          callback(event);
        }
      });
      
      $target.on('touchmove mousemove',function(e){
        if(touchDown){
          var x = e.clientX,
            y = e.clientY;
          event.velocity = x - event.start.x;
          $target.scrollLeft(event.startLeft - event.velocity);
        }
      });
    },
  };
  
  self.widgets = {
    swipeNav:function(element){
      var $nav = $(element),
        childClass = '.swipe-nav-item',
        children = $nav.children();
      
      // disable dragging of images
      $nav.on('dragstart', 'img', function(event) { event.preventDefault();});
      // disable scrolling; it will be handled by swiping instead
      $nav.css({'overflow':'hidden','height':'100%'});
      
      console.log(children.outerWidth())
      
      self.events.swipe($nav,function(e){
        var position = $nav.scrollLeft(),
          currentItem = Math.floor(position/children.outerWidth(true)),
          destination;
          
        
        if(e.direction=='left') {
          if(currentItem!=0) currentItem -= 1;
          destination = children.outerWidth(true)*currentItem;
          console.log(currentItem);
        } else {
          if(currentItem!=children.size()-1) currentItem +=1;
          destination = children.outerWidth(true)*currentItem;
          console.log(currentItem);
        }
          
        $nav.animate({scrollLeft:destination},600,'easeOutQuart',function(){
          console.log('animation complete');
        });
      });
    },
  };
  return self;
}
