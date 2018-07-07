$(document).ready(function() {

var questionsArray = [
        "What is the 'Blade of Evils Bane' also known as?",
        "Who is the main antagonist of the Super Mario franchise?",
        "Which item is consistently referenced as a source of mystic power in the Final Fantasy series?",
        "Samus is the protagonist of which franchise?",
        "Who is Mario and Luigi always tasked with saving?",
        "What do the individual pieces of the Triforce grant their bearers?",
        "Who gave Samus her Power Suit?",
        "What is the weapon of choice for the protagonist in the Kingdom Hearts franchise?",
        "What is Kirby's signature special power?",
        "Cloud is a hero from which game series?",
        "Who is the protagonist of 'The Legend of Zelda' series?",
        "What does Dante from the 'Devil May Cry' series do for a living?",

];
var answersArray = [
        ["Master Sword", "Rebellion", "Buster Sword", "Yamato"],
        ["Princess Zelda", "Bowser", "Ridley", "Luigi"],
        ["Gil", "Gyshal Greens", "Crystals", "Materia"],
        ["Undertale", "The Legend of Zelda", "Portal", "Metroid"],
        ["Princess Zelda", "Princess Toadstool", "Lady Palutena", "Rosalina"],
        ["Power, Wisdom, or Courage", "Rage, Envy, or Fear", "Fire, Water, or Wind",  "Intelligence, Deception, or Honor"],
        ["Space Pirates", "The Federation", "Chozo", "Bounty Hunters"],
        ["Ray Gun", "Keyblade", "Grimoires", "Shield"],
        ["Eating", "Super Speed", "Super Strength", "Copying Enemy Abilities"],
        ["Star Fox", "Final Fantasy", "Street Fighters", "Punch Out"],
        ["Ganondorf", "Sheik", "Zelda", "Link"],
        ["Mercenary for Hire", "Exorcist", "Priest", "Nothing because he's a dead-beat"]
];
var correctAnswers = ["Master Sword", "Bowser", "Crystals", "Metroid", "Princess Toadstool", "Power, Wisdom, or Courage", "Chozo", "Keyblade", "Copying Enemy Abilities", "Final Fantasy", "Link", "Mercenary for Hire"];

var counter = 15;
var correct = 0;
var wrong = 0;
var unanswered = 0;
var selectedAnswer = 0;
var questionCounter = 0;
var clock;

//-----Initialize-----//
function starGame() {
    $(".container").html("<p><button id='startButton'>Click to Enter the Oasis!</button></p>");
}
starGame();
//-----Button Listener-----//
$("#startButton").on("click", function () {
    questionPage();
    timer();
});

$("body").on("click", ".answer", function (event) {
    console.log(this);
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
        clearInterval(clock);
        renderRight();
    }
    else {
        clearInterval(clock);
        renderWrong();
    }
});

$("body").on("click", "#restartButton", function (event) {
    reset();
});

//-----Timer-----//
function timer() {
    clock = setInterval(decrement, 1000);
    function decrement() {
        if (counter > 0) {
            counter--;
        }
        if (counter === 0) {
            clearInterval(clock);
            noTime();
        }
        $(".timeLeft").html(counter);
    }
}

//-----Question-----//
function questionPage() {
    $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>15</span></p>")
    $(".container").append("<p class='question'> " + questionsArray[questionCounter] + "</p>");
    $(".container").append("<p class='answerBG answer'>" + answersArray[questionCounter][0] + "</p>");
    $(".container").append("<p class='answerBG answer'>" + answersArray[questionCounter][1] + "</p>");
    $(".container").append("<p class='answerBG answer'>" + answersArray[questionCounter][2] + "</p>");
    $(".container").append("<p class='answerBG answer'>" + answersArray[questionCounter][3] + "</p>");
}

function noTime() {
    unanswered++;
    $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></span></p>");
    $(".container").append("<p class='result'>The correct answer was " + correctAnswers[questionCounter] + "!</p>");
    $(".container").append("<img class='outOfTimePic' src='assets/images/outOfTime.jpg'>");
    setTimeout(transitionTime, 3000);
}

//-----Right Answer-----//
function renderRight() {
    correct++;
    $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></p>");
    $(".container").append("<p class='result'>" + correctAnswers[questionCounter] + " was the right answer!!</p>");
    $(".container").append("<img class='correctPic' src='assets/images/correct.jpg'>");
    //transitionTime();
    setTimeout(transitionTime, 3000);
}

//-----Wrong Answer-----//
function renderWrong() {
    wrong++;
    $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></p>");
    $(".container").append("<p class='result'>The correct answer was " + correctAnswers[questionCounter] + "!</p>");
    $(".container").append("<img class='incorrectPic' src='assets/images/incorrect.jpg'>");
    //transitionTime();
    setTimeout(transitionTime, 3000);
}

//-----Question Transition-----//
function transitionTime() {
    if (questionCounter < 11) {
        questionCounter++;
        questionPage();
        counter = 15;
        timer();
    }
    else {
        results();
    }
}

//-----Results-----//
function results() {
    clearInterval(clock);
    $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></p>");
    $(".container").append("<p class='complete'>You are now leaving the Oasis!");
    $(".container").append("<p class='endResult'>Correct Answers: " + correct + "</p>");
    $(".container").append("<p class='endResult'>Wrong Answers: " + wrong + "</p>");
    $(".container").append("<p class='endResult'>Unanswered Questions: " + unanswered + "</p>");
    $(".container").append("<p class='restartButton'><button id='restartButton'>Jump Back In?</button></p>");
}

//-----Reset-----//
function reset() {
    counter = 15;
    correct = 0;
    wrong = 0;
    unanswered = 0;
    questionCounter = 0;
    questionPage();
    timer();
}
});


//start the game from clicking button
//timer starts; question renders
//user picks answer
//tells whether answer is right/wrong;says whether right/wrong
//if picks answer/time up, give next question
//show overall score after last question
//restart