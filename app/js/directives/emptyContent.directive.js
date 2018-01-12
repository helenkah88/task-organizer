;(function() {

    angular.module('todoApp')
        .directive('emptyContent', function() {
            return {
                template: '<h4 class="text-light">{{message}}</h4>',
                scope: {
                    message: '='
                }
            }
        })

}());