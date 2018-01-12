;(function() {

    angular.module('todoApp')
        .directive('myTooltip', function() {
            return {
                template: '<span class="myTooltip">Click on the {{item}} to edit</span><ng-transclude></ng-transclude>',
                transclude: true,
                link: function(scope, el, attr) {
                    scope.item = attr.myTooltip;
                    el.hover(function() {
                        el.find('.myTooltip').css('display', 'inline');
                    }, function() {
                        el.find('.myTooltip').css('display', 'none');
                    });
                    el.click(function() {
                        el.find('.myTooltip').css('display', 'none');
                    })
                }
            }
        })

}());