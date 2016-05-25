'use strict';

angular.module('btford.markdown', []).
    directive('btfMarkdown', function () {
        var converter = new Showdown.converter();
        return {
            restrict: 'AE',
            link: function (scope, element, attrs) {
                if (attrs.btfMarkdown) {
                    scope.$watch(attrs.btfMarkdown, function (newVal) {
                        var html = newVal ? converter.makeHtml(newVal) : '';
                        element.html(html);
                    });
                } else {
                    var html = converter.makeHtml(element.text());
                    element.html(html);
                }
            }
        };
    });
