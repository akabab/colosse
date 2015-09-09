var board =
[
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];

PLAYER_POOL = [];

// START GAME
var player1 = new Player("claude", "#2243dd");
var player2 = new Player("yoann", "#ff2222");

PLAYER_POOL.push(player1);
PLAYER_POOL.push(player2);

printBoard();
