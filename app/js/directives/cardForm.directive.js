;(function() {

    angular.module('todoApp')
        .directive('cardForm', function() {
            return {
                transclude: true,
                replace: true,
                templateUrl: '/templates/card-form.html',
                scope: {
                    title: '='
                }
            }
        })

}());