angular.module("controllers-quizz", []).controller('QuizzCtrl', ['$scope', '$window', '$injector', function($scope, $window, $injector) {
    $scope.started = false;
    $scope.finished = false;
    $scope.resultSelector  = 'all';
    $scope.create = false;
    $scope.questionText = '';
    $scope.arrayQuestions = [];
    $scope.counter = 1;
    $scope.showCreatedQuestions = false;

    $scope.newQuest = {
        title: '',
        singleSelect: '',
        checkbox:{
            value1:'',
            value2:'',
            value3:'',
        }
    };

    var defaultQuizz = {
        options: {
            showPrevious: true
        }
    };

    $scope.initWithConstant = function(constant) {
        $scope.init($injector.get(constant));
    };

    $scope.init = function(quizz) {
        $scope.quizz = angular.extend({}, defaultQuizz, quizz);
        $scope.started = false;
        $scope.finished = false;
        $scope.currentQuestion = null;
        $scope.resultFilter = $scope.allResultFilter;
    };

    $scope.start = function() {
        $scope.started = true;
        $scope.currentQuestion = $scope.quizz.questions[0];
    };

    $scope.createQuestion = function() {
        $scope.create = true;

    };

    $scope.saveQuestion = function() {
        $scope.create = true;
        $scope.arrayQuestions.push($scope.newQuest);
        $scope.newQuest = {
            title: '',
            singleSelect: '',
            checkbox: {
                value1: '',
                value2: '',
                value3: '',
            }
        };
        $scope.counter++;
        $scope.title = '';

    };
    $scope.endCreatingQuestions = function(){

        $scope.create = false;
        $scope.showCreatedQuestions = true;
    }






    function questionIndex() {
        return $scope.quizz.questions.indexOf($scope.currentQuestion);
    }

    function quizzLength() {
        return $scope.quizz.questions.length;
    }

    $scope.questionIndex = questionIndex;

    $scope.questionOddity = function() {
        return questionIndex() % 2 == 0 ? 'even' : 'odd';
    };

    $scope.hasNext = function() {
        return questionIndex() < quizzLength() - 1;
    };

    $scope.hasPrevious = function() {
        return questionIndex() > 0;
    };

    $scope.showNext = $scope.hasNext;

    $scope.showPrevious = function() {
        return $scope.hasPrevious() && $scope.quizz.options.showPrevious;
    };

    $scope.next = function() {
        $scope.currentQuestion = $scope.quizz.questions[questionIndex() + 1];
    };

    $scope.previous = function() {
        $scope.currentQuestion = $scope.quizz.questions[questionIndex() - 1];
    };

    $scope.finish = function() {
        $scope.currentQuestion = null;
        $scope.finished = true;
    };

    function isAnswerCorrect(question) {
        if (question.type == 'radio') {
            return question.selectedAnswer && question.selectedAnswer.correct;
        }
        else if (question.type == 'checkbox') {
            return question.answers.every(function(answer) {
                return ((answer.correct && answer.checked) || (!answer.correct && !answer.checked));
            });
        }
        else if (question.type == 'free') {
            return question.typedAnswer && question.answers.indexOf(question.typedAnswer.trim()) >= 0;
        }
        else {
            return false;
        }
    }

    $scope.isAnswerCorrect = isAnswerCorrect;

    $scope.isAnswerSelected = function(question, answer) {
        if (question.type == 'radio') {
            return question.selectedAnswer === answer;
        }
        else {
            return answer.checked;
        }
    };

    $scope.allResultFilter = function(question) {
        return true;
    };

    $scope.errorsOnlyResultFilter = function(question) {
        return !isAnswerCorrect(question);
    };
}]);
