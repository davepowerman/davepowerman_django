$(document).ready(function() {
    setShade(0);
    
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
