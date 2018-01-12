;(function() {

    angular.module('todoApp')
        .directive('cardPanel', function() {
            return {
                transclude: true,
                replace: true,
                templateUrl: '/templates/card-panel.html'
            }
        })

}());