;(function() {

    angular.module('todoApp')
        .controller('CategoriesCtrl', ['$scope', 'categoryService', '$location', 'currentUserService', 'toastr', function($scope, categoryService, $location, currentUserService, toastr) {

            $scope.newClicked = false;
            $scope.categories = [];
            $scope.category = {};

            var userId = currentUserService.getUserId();

            $scope.categoryCopy = angular.copy($scope.category);

            $scope.addNew = function() {
                $scope.newClicked = true;
            }

            categoryService.getAllCategories(userId).$promise
                .then(function(data) {
                    $scope.categories = data;
                })
                .catch(function(e) {
                    console.log(e);
                });

            $scope.resetForm = function(form) {
                if($scope.newClicked) $scope.newClicked = false;
                form.$setUntouched();
                $scope.categoryCopy = angular.copy($scope.category);
            };

            $scope.saveChanges = function(category) {
                categoryService.updateCategory(category).$promise
                    .then(function() {
                        toastr.success('changes saved!');
                    }).catch(function(e) {
                        console.log(e);
                    });
            };

            $scope.createCategory = function(form) {

                if(form.$invalid) return;

                $scope.category = angular.copy($scope.categoryCopy);
                $scope.category.userId = userId;

                categoryService.createCategory($scope.category).$promise
                    .then(function(data) {
                        toastr.success(`category ${$scope.category.title} has been created!`);
                        $location.path(`/categories`);
                        form.$setUntouched();
                        $scope.newClicked = false;
                        $scope.categories.push(data);
                        $scope.category = $scope.categoryCopy = {};
                    })
                    .catch(function(e) {
                        console.log(e);
                    })
            };

            $scope.deleteCategory = function(category) {
                categoryService.deleteCategory(category).$promise
                    .then(function(data) {
                        toastr.success(`category ${category.title} has been removed`);
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