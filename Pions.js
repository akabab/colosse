var Pions = function (owner, value) {
  this.owner = owner;
  this.value = value;
  this.onBoard = false;
  this.dead = false;
  this.line = -1;
  this.col = -1;
}

Pions.prototype.die = function () {
  this.dead = true;
  this.line = -1;
  this.col = -1;
}

Pions.prototype.move = function (line, col) {
  board[line][col] = this;

  // reset old position
  if (this.onBoard) { board[this.line][this.col] = 0; }
  else { this.onBoard = true; }

  // set his new position
  this.line = line;
  this.col = col;
}

Pions.prototype.eat = function (target) {
  target.die();
}