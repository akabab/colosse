var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "48px serif";

function drawBoard () {
    var margin = 1;

    for (var j=0; j<5; j++) {
        for (var i=0; i<5; i++) {
            ctx.fillStyle = "rgb(78, 173, 242)";
            ctx.fillRect(i*100 + margin, j*100 + margin, 100 - 2*margin, 100 - 2*margin);
        }
    }
}

function drawPions (pions, color) {
    pions.forEach(function (pion) {
        var i = pion.col;
        var j = pion.line;

        if (i>=0 && j>=0) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(i*100 + 50, j*100 + 50, pion.value * 7, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
            // ctx.fillText(pion.value, i*100 + 40, j*100 + 65);
        }
    });
}