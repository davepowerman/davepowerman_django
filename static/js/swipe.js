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
      
      $target.on('touchstart mousedown',function(e){
        touchDown = true;
        
        //alert('total number of touchers is ');
        //if(e.touches.length > 0){
          //var touch = e.touches[0];
          event.start.x = /*parseInt(touch.clientX)*/e.clientX;
          event.start.y = /*parseInt(touch.clientY)*/e.clientY;
          event.startLeft = $target.scrollLeft();
          //e.preventDefault();
        //}
      });
      
      $target.on('touchend mouseup',function(e){
        touchDown = false;
        //if(e.touches.length > 0){
          //var touch = e.touches[0];
          event.end.x = /*parseInt(touch.clientX)*/e.clientX;
          event.end.y = /*parseInt(touch.clientY)*/e.clientY;
          if(event.start.x>event.end.x) event.direction = 'right';
          else event.direction = 'left';
          if(Math.abs(event.start.y-event.end.y)<35 && Math.abs(event.start.x-event.end.x)>=50){
            callback(event);
          }
          //e.preventDefault();
        //}
      });
      
      $target.on('touchmove mousemove',function(e){
        if(touchDown /*&& (e.touches.length)*/){
          //var touch = e.touches[0];
          var x = /*parseInt(touch.clientX)*/e.clientX,
            y = /*parseInt(touch.clientY)*/e.clientY;
          event.velocity = x - event.start.x;
          $target.scrollLeft(event.startLeft - event.velocity);
          if(Math.abs(event.start.y-y)<35 && Math.abs(event.start.x-x)>=50){
            //callback(event);
          }
        }
        //e.preventDefault();
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
          
        
        if(e.direction=='left'){
          //if(currentItem!=0) currentItem--;
          destination = children.outerWidth(true)*currentItem;
        } else if(e.direction=='right'){
          if(currentItem!=children.size()-1) currentItem++;
          destination = children.outerWidth(true)*currentItem;
          
        }
          
        console.log(currentItem,e.direction);
          
        $nav.animate({scrollLeft:destination},600,'easeOutQuart',function(){
          console.log('animation complete');
        });
      });
    },
  };
  return self;
}
