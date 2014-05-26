$(document).ready(function(){
    setShade(0);
    TagModifiers().run();
    
    
});

function setShade(visible) {
    var $shade = $('#body-shade');   
    
    if(visible == 1) {
        $shade.show();
    } else if(visible == 0) {
        $shade.hide();
    }
}

function toggleShade(dur) {
    var $shade = $('#body-shade'); 
    $shade.toggle(dur);
}

function moveAfterShade(obj) {
    $(obj).css('z-index','501');
}

function moveBehindShade(obj) {
    $(obj).css('z-index','499');
}

function TagModifiers(){
  var self = this;
  self.tags = [
    {
      type:'reload',
      callback:function(){
      // ajax-include tags load a page via ajax
        var $target = $('.ajax-include[href]');
        $target.each(function(i,obj){
          var $obj = $(obj);
          $.ajax({
            url:$obj.attr('href'),
            type:'GET',
            success:function(response){
              template = $(response).find('#content');
              $obj.html(template);
              self.run('render');
            },
            error:function(response){
              console.log('ajax-include request failed with response:',response)
            }
          });
        });
      }
    },
    
    {
      type:'render',
      callback:function(){
        // max-length attribute constrains text length of an element
        $target = $('[max-length]')
        $target.each(function(i,obj){
          if($(obj).text().length >= $(obj).attr('max-length')){
            $(obj).text($(obj).text().slice(0,$(obj).attr('max-length')) + '...')
          }
        });
      }
    },
    
    {
      type:'render',
      callback:function(){
        $('img').each(function(i,obj){
          Widgets().imageLoader(obj);
        });
      }
    },
  ];
  
  self.run = function(type){
    for(i in self.tags){
      if(!type || self.tags[i].type==type){
        self.tags[i].callback();
      }
    };
  }
  
  return self;
}

function Widgets(){
  var self = this;
  
  self.imageLoader = function(element){
    var $img = $(element);
    // a callibrate func for change range of numbers
    
    
    (function(){
      Math.getInRange=function (x, arr) {// arr = [x1,x2,y1,y2] // x is input and new y return
        return ((arr[3] - arr[2]) * (x - arr[0])) / (arr[1] - arr[0]) + arr[2];
      }
      
      if(!$('canvas.loader')[0])
        return false;
      
	    $('canvas.loader').each(function(i,obj){
	      var canvas = obj;
	      canvas.width=50;
	      canvas.height=50;
		    var ctx = canvas.getContext("2d"),
		      width = canvas.width,			// width of canvas element
		      height = canvas.height,			// height of canvas element
		      d2r = Math.PI/180,				// tranform degree to radian
		      degshift = 90,
		      startArc = -1*degshift*d2r,		
		      density = 10,       			// numbers of circles that shaped the loader
		      trackAngle = 360/density,
		      tracksShift = 0,				// used for shifting the shape it's set to zero for default
		      frame = 20,						// frame per second(frame rate)
		      x = width/2, 					// x position center of official circle 
		      y = height/2, 					// y position center of official circle 
		      R = 10, 						// radius of official circle
		      r = 3,  						// radius of small circles
		      h = 120;					    // h=hue in hsl model color

		      canvas.style.background='transparent';	//change the canvas background to transparent

      //draw circle with specefic x=postion on x axis , y=position on y axis  , r=radis and c=color with hsl , o=opacity
	      var drawCircle = function(x,y,r,c,o){
		      ctx.fillStyle=c;
		      ctx.globalAlpha=o;
		      ctx.beginPath();
		      ctx.arc(x,y,r,startArc,360*d2r);
		      ctx.fill();
	      },

	      drawMultipleCircles = function(){
		      ctx.clearRect(0,0,width,height);
		      if (tracksShift==density) tracksShift=0;
		      var shiftingAngle=tracksShift*trackAngle;
		      for(var i=360-shiftingAngle ; i >= 0-shiftingAngle ; i-=trackAngle){
		      drawCircle(x+Math.sin(i*d2r)*R,y+Math.cos(i*d2r)*R,r,'hsl('+h+',100%,'+Math.getInRange(i,[360-shiftingAngle,0-shiftingAngle,50,45])+'%)',Math.getInRange(i,[360-shiftingAngle,0-shiftingAngle,0.01,0.9]));
		      }
		      tracksShift++; 
	      }

	      setInterval(drawMultipleCircles,1000/frame);
	      });
      })();
	    
	    
    
    if($img.width()*$img.height()>=Math.pow(50,2)){
      $img.hide();
      $img.after('<canvas class="loader"></canvas>');
      $img.ready(function(){
        console.log('Image loaded:',$img.attr('href'));
        $img.next().remove();
        $img.fadeIn();
      });
    }
  }
  
  return self;
}
