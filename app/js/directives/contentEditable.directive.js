;(function() {

    angular.module('todoApp')
        .directive('contenteditable', function() {
            return {
                require: '^ngModel',
                link: function(scope, el, attrs, ctrl) {

                    // ctrl.$setViewValue(el.html());

                    ctrl.$render = function() {
                        el.html(ctrl.$viewValue);
                    };

                    el.on('blur', function() {
                        ctrl.$setViewValue(el.html());
                    })
                }
            }
        })

}());