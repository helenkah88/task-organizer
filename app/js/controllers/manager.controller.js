;(function() {

    angular.module('todoApp')
        .controller('ManagerCtrl', ['$scope', 'categoryService', 'currentUserService', function($scope, categoryService, currentUserService) {

            $scope.categories = {};

            var userId = currentUserService.getUserId();

            categoryService.getAllCategories(userId).$promise
                .then(function(data) {
                    $scope.categories = data;
                })
                .catch(function(e) {
                    console.log(e);
                });

            $scope.deleteCat = function(category) {
                categoryService.deleteCategory(category).$promise
                    .then(function(data) {
                        console.log(`removed`);
                        $scope.categories = $scope.categories.filter(function(item) {
                            return item.title != data.title;
                        })
                    })
                    .catch(function(e) {
                        console.log(e);
                    })
            };
        }]);

}());