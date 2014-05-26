window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function initArcs() {
  var arcs = [];
  var arc_count = 10;

  // create arc_count arcs
  for( n = 0; n < arc_count; n++) {
    var radius = (n) * 3;
    var width = (n) * 2;
    // between 0 and 2 PI
    var startingAngle = Math.random() * 2 * Math.PI;
    // 1 to 3 revolutions per second
    var speed = (Math.random() * 2) + 1;
    // between 0 and 1
    var opacity = (n / arc_count) * 0.65;

    arcs.push({
      radius: radius,
      startingAngle: startingAngle,
      width: width,
      opacity: opacity,
      speed: speed
    });
  }

  return arcs;
}
function drawArcs(canvas, arcs) {
  var context = canvas.getContext('2d');
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  for( n = 0; n < arcs.length; n++) {
    context.save();
    context.beginPath();
    var thisArc = arcs[n];

    context.globalAlpha = thisArc.opacity;
    context.arc(centerX, centerY, thisArc.radius, thisArc.startingAngle, thisArc.startingAngle + Math.PI, true);
    context.lineWidth = thisArc.width;
    // line width
    context.strokeStyle = '#000';
    context.stroke();
    context.closePath();
    context.restore();
  }
}
function updateArcs(arcs, timeDiff) {
  for( n = 0; n < arcs.length; n++) {
    var thisArc = arcs[n];
    var angleDiff = thisArc.speed * timeDiff / 1000;
    thisArc.startingAngle -= angleDiff;
  }
}
function animate(canvas, arcs, lastTime) {
  var context = canvas.getContext('2d');

  // update
  var time = (new Date()).getTime();
  var timeDiff = time - lastTime;
  updateArcs(arcs, timeDiff);

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw
  drawArcs(canvas, arcs);

  // request new frame
  requestAnimFrame(function() {
    animate(canvas, arcs, time);
  });
}
function canvasLoader(canvas){
  var canvas = $(canvas)[0];
  $(canvas).wrap('<div style="text-align:center;"></div>')
  $(canvas).parent().append('<br>Image loading...')
  canvas.width=80;
  canvas.height=80;
  //$(canvas).css('border-radius','40px');
  
  var arcs = initArcs();
  var time = (new Date()).getTime();
  animate(canvas, arcs, time);
}
