
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;
var highScore = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  var sound = new Audio("./sounds/" + randomChosenColour + ".mp3");
  sound.play();
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

$(document).keydown(function (event) {
  if (!started) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);
  }
});

$(".btn").click(handleClick);

function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
  $("#" + name)
    .fadeOut(100)
    .fadeIn(100);
}

function handleClick() {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
      score++;
      $(".score").text("Score: " + score);
      if (score > highScore) {
        highScore = score;
        $(".high-score").text("High Score: " + highScore);
      }
    }
  } else {
    var sound = new Audio("./sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    score = 0;
    $(".score").text("Score: " + score);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

