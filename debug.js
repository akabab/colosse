function printBoard () {
    for (var line in board) {
        var l = [];
        for (var col in board[line]) {
            l.push(board[line][col].value || 0)
        }
        console.log(l);
    }

    drawBoard();
    PLAYER_POOL.forEach(function (player) {
        drawPions(player.pions, player.color);
    });
}
