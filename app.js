var state = {
    score: {
        correct: 0,
        incorrect: 0
    },
    currentQuestion: 1,
    questions: [
        {
            question: "Who was the 450 Motocross Champion in 2016?",
            options: [
                "Ryan Dungey", "Ken Roczen", "James Stewart", "Marvin Musquin"
            ],
            correct: "Ken Roczen"
        }, {
            question: "Who is the winningest rider in combined AMA Supercross and Motocross History?",
            options: [
                "Jeremy McGrath", "Bob Hannah", "Ryan Villopoto", "Ricky Carmichael"
            ],
            correct: "Ricky Carmichael"
        }, {
            question: "Who was the 450 Motocross Champion in 2016?",
            options: [
                "Ryan Dungey", "Ken Roczen", "James Stewart", "Marvin Musquin"
            ],
            correct: "Ken Roczen"
        }, {
            question: "Who was the 450 Motocross Champion in 2016?",
            options: [
                "Ryan Dungey", "Ken Roczen", "James Stewart", "Marvin Musquin"
            ],
            correct: "Ken Roczen"
        }, {
            question: "Who was the 450 Motocross Champion in 2016?",
            options: [
                "Ryan Dungey", "Ken Roczen", "James Stewart", "Marvin Musquin"
            ],
            correct: "Ken Roczen"
        }
    ]
};

// HTML template strings ///////////////////////////////////////////////////////

var startQuizString = ('<button id="start-button">Start Quiz!</button>');

var questionTemplate = '<div class="js-current-question"></div>' +
'<ul class="js-question-choices">' + '</ul>' + '<footer class= "js-question-footer">' + '<div class="js-question-number"></div>' + '<div class="js-current-score"></div>' + '</footer>';

//var endQuizString = ();

// State Manipulating Functions ////////////////////////////////////////////////

function getQuestion(state, index) {
    return state.questions[index];
}

// Dom rendering functions /////////////////////////////////////////////////////

function renderQuestion(questionTemplate, questions, currentQuestion, score) {
    var questionElement = $(questionTemplate);
    questionElement.find('.js-current-question').append(state.questions[currentQuestion - 1].question);
    questionElement.find('.js-question-number').append('<p>Question ' + state.currentQuestion + ' of ' + state.questions.length + '</p>');
    questionElement.find('.js-current-score').append('<p>Correct: ' + score.correct + ' Incorrect: ' + score.incorrect + '</p>');
    //creates html for answer choices
    for (var i = 0; i < questions.length - 1; i++) {
        questionElement.find('.js-question-choices').append('<li><input type="radio" name="question-answer" />' + questions[currentQuestion - 1].options[i] + '</li>');
        console.log(questions[currentQuestion - 1].options[i]);
    }
    $('.display-section').html(questionElement);
}

function handleStartClick(state, displayElement) {
    $(displayElement).click(function(event) {
        event.preventDefault;

        renderQuestion(questionTemplate, state.questions, state.currentQuestion, state.score);
    });
}

// Ready function //////////////////////////////////////////////////////////////

$(document).ready(function() {

    var displayElement = '.display-section';
    var questionTextElement = '.js-current-question';
    var questionNumberElement = '.js-question-number';
    var quizScoreElement = '.js-current-score';

    // rendering start screen on document ready ////////////////////////////////////
    $(displayElement).html(startQuizString);

    handleStartClick(state, displayElement);

})
