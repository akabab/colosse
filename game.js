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
    player1 = new Player(1, "Claude", "#2243dd");
    player2 = new Player(2, "Yoann", "#ff2222");

    PLAYER_POOL.push(player1);
    PLAYER_POOL.push(player2);
  },
};

var UNIT = 100;
var U = function (n) { return n * UNIT; };

var WIDTH = U(6);
var HEIGHT = U(9);

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
    height: U(1)
  });

  boardLayer = new Kinetic.Layer({
    x: U(.5),
    y: U(2),
    width: U(5),
    height: U(5)
  });

  // here is where things happen //

  Game.init();

  initBackgroundLayerContent();
  initBoardLayerContent();

  PLAYER_POOL.forEach(function (player) {
    initPions(player.pions, player.color);
  });

  initUILayerContent();
  // displayGroupOrLayerBounds(uiLayer, 'UI', 'pink', false);
  displayGroupOrLayerBounds(backgroundLayer, 'BG', 'green', false);
  // --------------------------- //

  stage.add(backgroundLayer, boardLayer, uiLayer);
}

function displayGroupOrLayerBounds (groupOrLayer, name, color, fill) {
  var r = new Kinetic.Rect({
    width: groupOrLayer.attrs.width,
    height: groupOrLayer.attrs.height,
    fill: color,
    fillEnabled: fill ? true : false,
    stroke: color,
    strokeWidth: 2
  });

  var t = new Kinetic.Text({
    text: name,
    fill: "black",
  });

  groupOrLayer.add(r, t);
  groupOrLayer.draw();
}

function initUILayerContent () {
  var text = new Kinetic.Text({
    x: 100,
    y: 0,
    text: "Player Turn:" + playerTurn,
    fontSize: 15,
    fontFamily: "Courier",
    fill: "red"
  });

  uiLayer.add(text);
}

function initBackgroundLayerContent () {
  var bgRect = new Kinetic.Rect({
    width: WIDTH,
    height: HEIGHT,
    stroke: 'grey',
    strokeWidth: 3
  });

  backgroundLayer.add(bgRect);
}

function initBoardLayerContent () {
  var margin = 1;

  for (var j=0; j<5; j++) {
      for (var i=0; i<5; i++) {
        // induce scope
        (function () {
          var rect = new Kinetic.Rect({
            x: i * U(1) + margin,
            y: j * U(1) + margin,
            width: U(1) - 2 * margin,
            height: U(1) - 2 * margin,
            fill: "rgb(78, 173, 242)",
          });

          rect.pos = {x: i, y: j};

          rect.on('click', function () {
            console.log('rect clicked', rect.pos);
            // rect.fill('red');
            boardLayer.draw();
          });

          boardLayer.add(rect);
        })();
      }
    }
}

function initPions (pions, color) {
  pions.forEach(function (pion) {
    var x = pion.onBoard ? pion.col : pion.value - 1;
    var y = pion.onBoard ? pion.line : (pion.owner.id === 1 ? -1 : 5);

    var circle = new Kinetic.Circle({
      x: x * U(1) + U(.5),
      y: y * U(1) + U(.5),
      radius: pion.value * 7 * U(.01),
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
      boardLayer.draw();
    });

    circle.on('mouseout', function () {
      console.log("mouse out");

      circle.strokeEnabled(false);
      boardLayer.draw();
    });

    circle.on('dragmove', function (e) {
      // console.log('dragmove', e);
    });

    circle.on('dragstart', function (e) {
      circle.prevX = circle.attrs.x;
      circle.prevY = circle.attrs.y;
      console.log('dragstart', e);
    });

    circle.on('dragend', function (e) {
      console.log('dragend', e);

      var x = Math.floor(circle.attrs.x / U(1));
      var y = Math.floor(circle.attrs.y / U(1));

      //correct position
      if (0 <= x && x < 5 && 0 <= y && y < 5 /* && move allowed */) {
        circle.x(x * U(1) + U(.5));
        circle.y(y * U(1) + U(.5));
      } else {
        circle.x(circle.prevX);
        circle.y(circle.prevY);
      }
      boardLayer.draw();
      console.log("Pion dropped on position", x, y);
    });

    boardLayer.add(circle);
  });
}
