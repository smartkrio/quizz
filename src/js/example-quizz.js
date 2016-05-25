var quizz = {
    show_title: 'Example show survey',
    add_title: 'Example add questions',
    description: 'AngularJS',
    questions: [
        {
            type: 'radio',
            text: '**AngularJS** is a...',
            answers: [
                {
                    text: '**Java** framework',
                    correct: false
                },
                {
                    text: '**JavaScript** Framework',
                    correct: true
                },
                {
                    text: '**Ruby** Framework',
                    correct: false
                }
            ]
        },
        {
            type: 'free',
            text: 'What is the name of the directive used to *loop* over elements?',
            answers: ['ngRepeat', 'ng-repeat']
        },
        {
            type: 'checkbox',
            text: 'Which tools can help develop [AngularJS](http://angularjs.org) applications?',
            answers: [
                {
                    text: 'Excel',
                    correct: false
                },
                {
                    text: 'Grunt',
                    correct: true
                },
                {
                    text: 'Karma',
                    correct: true
                },
                {
                    text: 'A hammer',
                    correct: false
                }
            ]
        }
    ]
};
angular.module("example-quizz", ['quizz', 'btford.markdown', 'ngAnimate']);
angular.module("example-quizz").constant('quizz', quizz);

var quizzWithoutPreviousButton = angular.extend({}, quizz);
quizzWithoutPreviousButton.options = {
    showPrevious: false
};
angular.module("example-quizz").constant('quizzWithoutPreviousButton', quizzWithoutPreviousButton);
