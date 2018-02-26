function generateWinningNumber() {
  var num = Math.floor(Math.random()*100)+1;
  if (num === 0) {
    return 1;
  }
  return num;
}

function shuffle(array) {
  var l = array.length, x, i;

  while (l) {
    i = Math.floor(Math.random() * l--);

    x = array[l];
    array[l] = array[i];
    array[i] = x;
  }

  return array;
}

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
  if (this.playersGuess < this.winningNumber) {
    return true;
  }
  return false;
}

Game.prototype.playersGuessSubmission = function(guess) {
  if (guess < 1 || guess > 100 || typeof guess !== 'number') {
    throw 'That is an invalid guess.';
  } else {
    this.playersGuess = guess;
  }
  return this.checkGuess(guess);
}

Game.prototype.checkGuess = function(guess) {
  if (guess === this.winningNumber) {
    return 'You Win!';
  } else if (this.pastGuesses.includes(guess)) {
    return 'You have already guessed that number.';
  }
  this.pastGuesses.push(guess);
  if (this.pastGuesses.length >= 5) {
    return 'You Lose.';
  }
  if (Math.abs(guess - this.winningNumber) < 10) {
    return 'You\'re burning up!';
  } else if (Math.abs(guess - this.winningNumber) < 25) {
    return 'You\'re lukewarm.';
  } else if (Math.abs(guess - this.winningNumber) < 50) {
    return 'You\'re a bit chilly.';
  } else if (Math.abs(guess - this.winningNumber) < 100) {
    return 'You\'re ice cold!';
  }
}

newGame = function() {
  return new Game();
}

Game.prototype.provideHint = function() {
  var nums = [this.winningNumber];
  for (var i = 0; i < 2; i++) {
    nums.push(generateWinningNumber());
  }
  return shuffle(nums);
}
