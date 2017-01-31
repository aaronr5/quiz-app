var state = {
    score: {
        correct: 0,
        incorrect: 0
    },
    currentQuestion: 1,
    questions: [
        {
            question: "Who was the 450cc class Motocross Champion in 2016?",
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
            question: "What size motors are used in the premiere class?",
            options: [
                "250cc", "85cc", "450cc", "125cc"
            ],
            correct: "450cc"
        }, {
            question: "What rider is famously known as the 'King of Supercross'?",
            options: [
                "Jeremy mcGrath", "Chad Reed", "Jeff Emig", "Kevin Windham"
            ],
            correct: "Jeremy mcGrath"
        }, {
            question: "Who was the 250cc class Motocross Champion in 2016?",
            options: [
                "Jeremy Martin", "Cooper Webb", "Tyler Bowers", "Alex Martin"
            ],
            correct: "Cooper Webb"
        }
    ]
};

// HTML template strings ///////////////////////////////////////////////////////

var startQuizString = ('<button id="start-button">Start Quiz!</button>');

var questionTemplate = '<div><div class="js-current-question"></div>' +
'<ul class="js-question-choices">' + '</ul>' +
'<div><button id="js-answer-submit">Submit Answer</button></div>' +
 '<footer class= "js-question-footer">' + '<div class="js-question-number"></div>' + '<div class="js-current-score"></div>' + '</footer></div>';

var endQuizString = '<div><div class="js-current-question"><p>Results:</p></div>' +
'<div class="js-final-score"><p></p></div>' +
'div><button id="js-try-again">Try Again!</button></div></div>';

// State Manipulating Functions ////////////////////////////////////////////////

function getQuestion(state, index) {
    return state.questions[index];
}

function getAnswer(questions, index) {
  var correctAnswer = getQuestion(state, index).correct;
  var answerIndex = getQuestion(state, index).options.indexOf(correctAnswer);
  return answerIndex;
}

function updateScore(usersAnswer, correctAnswer, score) {
  var correct;
  if(usersAnswer === correctAnswer){
    state.score.correct++;
    correct = true;
  }else{
    state.score.incorrect++;
    correct = false;
  }

  return correct;

}

function incrementQuestionNumber(state) {
  state.currentQuestion++;
  return state.currentQuestion;
}

function resetQuizState(state) {
  state.currentQuestion = 1;
  state.score = { correct: 0, incorrect: 0};
}


// Dom rendering functions /////////////////////////////////////////////////////

function renderQuestion(questionTemplate, questions, currentQuestion, score) {
    var questionElement = $(questionTemplate);
    questionElement.find('.js-current-question').append('<p>' + state.questions[currentQuestion - 1].question + '</p>');
    questionElement.find('.js-question-number').append('<p>Question ' + state.currentQuestion + ' of ' + state.questions.length + '</p>');
    questionElement.find('.js-current-score').append('<p>Correct: ' + score.correct + ' Incorrect: ' + score.incorrect + '</p>');
    //creates html for answer choices
    for (var i = 0; i < questions.length - 1; i++) {
        questionElement.find('.js-question-choices').append('<li><input type="radio" name="question-answer" />' + '<label for="question-answer">' + questions[currentQuestion - 1].options[i] + '</label></li>');
    }
    $('.display-section').html(questionElement);
}

function renderPostQuestion(correct) {
  $('.js-question-choices').remove();
  if(state.currentQuestion === state.questions.length) {
    $('#js-answer-submit').replaceWith('<button id="js-view-results">View Results!</button>');
  }
  $('#js-answer-submit').replaceWith('<button id="js-next-question">Next Question</button>');

  $('.js-current-score').html('<p>Correct: ' + state.score.correct + ' Incorrect: ' + state.score.incorrect + '</p>');

  if(correct) {
    $('.js-current-question').after('<p class="correct">Correct!</p>');
  }else {
    $('.js-current-question').after('<p class="incorrect">Incorrect!</p>');
    $('.incorrect').after('<p class="correct-answer">Correct Answer: ' + state.questions[state.currentQuestion - 1].correct + "</p>");
  }

}

function renderResults(score) {
  var resultsElement = $(endQuizString);
  resultsElement.find('.js-final-score').text('Correct: ' + score.correct + ' Incorrect: ' + score.incorrect);
  $('.display-section').html(resultsElement);
}

// Event Handlers //////////////////////////////////////////////////////////////

function handleStartClick(state, displayElement) {
    $('#start-button').click(function(event) {
        event.preventDefault;

        renderQuestion(questionTemplate, state.questions, state.currentQuestion, state.score);
    });
}

function questionSubmit(state) {
  $('.display-section').on('click', '#js-answer-submit', function(event) {
    var userAnswer = $('input[name=question-answer]:checked').next().text();
    if(!userAnswer) {
      $('.no-answer-error').remove();
      $('#js-answer-submit').after('<p class="no-answer-error">Choose an answer!</p>');
      return 0;
    }
    $('.no-answer-error').remove();
    renderPostQuestion(updateScore(userAnswer, state.questions[state.currentQuestion - 1].correct, state.score));
  });
}

function nextQuestionHandler(state) {
  $('.display-section').on('click', '#js-next-question', function(event) {
    incrementQuestionNumber(state);
    renderQuestion(questionTemplate, state.questions, state.currentQuestion, state.score);
  });
}

function viewResultsHandler(state) {
  $('.display-section').on('click', '#js-view-results', function() {
    renderResults(state.score);
  });
}


function tryAgainHandler(state) {
  $('.display-section').on('click', '#js-try-again', function() {
    resetQuizState(state);
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
    questionSubmit(state);
    nextQuestionHandler(state);
    viewResultsHandler(state);
    tryAgainHandler(state);

})
