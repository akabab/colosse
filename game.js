window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// (function loop() {
//   requestAnimFrame(loop);
//   render();
// })();


var board =
[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];

var PLAYER_POOL = [];

var player1, player2;

var stage;

var backgroundLayer,
    boardLayer,
    uiLayer;

var playerTurn = 0;

var Game = {
  init: function () {
    player1 = new Player("claude", "#2243dd");
    player2 = new Player("yoann", "#ff2222");

    PLAYER_POOL.push(player1);
    PLAYER_POOL.push(player2);
  },

  update: function () {
    draw();
  }
};

var WIDTH = 600;
var HEIGHT = 1000;

function init () {
  stage = new Kinetic.Stage({
    container: 'stage',
    width: WIDTH,
    height: HEIGHT
  });

  backgroundLayer = new Kinetic.Layer({
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT
  });

  uiLayer = new Kinetic.Layer({
    x: 0,
    y: 0,
    width: WIDTH,
    height: 100
  });

  boardLayer = new Kinetic.Layer({
    x: 0,
    y: 100,
    width: WIDTH,
    height: 700
  });

  // here is where things happen //

  Game.init();
  Game.update();

  // --------------------------- //

  stage.add(boardLayer, uiLayer);
}

function draw () {
  console.log("DRAW CALL");
  Debug.printBoard();

  drawBoard();

  PLAYER_POOL.forEach(function (player) {
    drawPions(player.pions, player.color);
  });

  drawUI();
  boardLayer.draw();
  // uiLayer.draw();
}

// draw
function drawUI () {
  var text = new Kinetic.Text({
    x: 0,
    y: 0,
    text: "Player Turn:" + playerTurn,
    fontSize: 15,
    fontFamily: "Courier",
    fill: "red"
  });

  uiLayer.add(text);
}

function drawBoard () {
  var margin = 1;

  for (var j=0; j<5; j++) {
      for (var i=0; i<5; i++) {
        // induce scope
        (function () {
          var rect = new Kinetic.Rect({
            x: i*100 + margin,
            y: j*100 + margin,
            width: 100 - 2*margin,
            height: 100 - 2*margin,
            fill: "rgb(78, 173, 242)",
          });

          rect.pos = {x: i, y: j};

          rect.on('click', function () {
            console.log('rect clicked', rect.pos);

            rect.fill('red');
            boardLayer.draw();
          });

          boardLayer.add(rect);
        })();
      }
    }
}

function drawPions (pions, color) {
  console.log("DRAW Pions");

  pions.forEach(function (pion) {
    var x = pion.onBoard ? pion.col : pion.value - 1;
    var y = pion.onBoard ? pion.line : -1;

    var circle = new Kinetic.Circle({
      x: x * 100 + 50,
      y: y * 100 + 50,
      radius: pion.value * 7,
      fill: color,
      stroke: "white",
      strokeWidth: 3,
      strokeEnabled: false,
      draggable: true
    });

    circle.on('mouseover', function () {
      console.log("mouse over");

      circle.moveToTop();
      circle.strokeEnabled(true);
      boardLayer.batchDraw();
    });

    circle.on('mouseout', function () {
      console.log("mouse out");

      circle.strokeEnabled(false);
      boardLayer.batchDraw();
    });

    boardLayer.add(circle);
  });
}

