$(document).ready(function(){
    setShade(0);
    TagModifiers().run();
    
    $('img').each(function(i,obj){
      Widgets().imageLoader(obj);
    });
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
        // max-length attribute constrains text length of an element
        $target = $('[max-length]')
        $target.each(function(i,obj){
          if($(obj).text().length >= $(obj).attr('max-length')){
            $(obj).text($(obj).text().slice(0,$(obj).attr('max-length')) + '...')
          }
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
    var $original = $img();
    $img.replaceWith('[img]')
    $img.ready(function(){
      console.log(html);
      $img.replaceWith($original);
    });
  }
  
  return self;
}
