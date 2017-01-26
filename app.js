var state  = {
  score: { correct: 0, incorrect: 0 },
  questions: [
    {
      question: "It works!",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correct: ""
    }
  ]
};

var questionString =
  '<h1></h1>'



function getQuestion(index) {
  return state.questions[index]
}

function createQuestionHtml(currentQuestion) {
  var questionHtml = $(questionString);
  questionHtml.find('h1').text(currentQuestion.question);
  $('.container').html(questionHtml);
}

function controlFunction() {
  for(var i = 0; i < state.questions.length; i++) {
    var currentQuestion = getQuestion(i);
    createQuestionHtml(currentQuestion);
  }
}

function handleStartClick() {
  $('#start-button').click(function() {
    controlFunction();
  })
}


// Ready function //////////////////////////////////////////////////////////////

$(document).ready(function() {
  handleStartClick();

})
