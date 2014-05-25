$(document).ready(function(){
    console.log('ready state:',ready);
    setShade(0);
    
    initWidgets();
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
    $shade.toggle(dur)
}

function moveAfterShade(obj) {
    $(obj).css('z-index','501');
}

function moveBehindShade(obj) {
    $(obj).css('z-index','501');
}

function initWidgets(){
  // max-length attribute
  console.log('initWidgets');
  $target = $('[max-length]')
  $target.each(function(i,obj){
    if($(obj).text().length >= $(obj).attr('max-length')){
      $(obj).text($(obj).text().slice(0,$(obj).attr('max-length')) + '...')
    }
  }); 
}
