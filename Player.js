var Player = function (id, name, color) {
  this.id = id;
  this.name = name;
  this.score = 0;
  this.color = color;
  this.pions = [];

  for (var i = 1; i <= 5; i++) {
      var newPion = new Pions(this, i);
      this.pions.push(newPion);
  }
};

Player.prototype.setName = function (newName) {
  this.name = newName;
}

Player.prototype.movePions = function (pionId, line, col) {
  //recover pion
  var pion = this.pions[pionId];

  if (!pion) { return console.error("Invalid Pion Id:", pionId); }

  if (pion.dead) { return console.error("Pion is dead:", pionId); }

  var target = board[line][col];
  if (!target) {
      pion.move(line, col);
  }
  else {
      if (target.owner === this) { return console.error("Forbidden move"); }
      else {
          pion.eat(target);
      }
  }
}
