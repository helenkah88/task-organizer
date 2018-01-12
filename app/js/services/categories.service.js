;
(function() {

    angular.module('todoApp')
        .factory('categoryService', ['$resource', 'currentUserService', function($resource, currentUserService) {

            var resource = $resource('/api/categories/:user_id/:id', { id: '@_id' }, { update: { method: 'PUT' } });

            function getAllCategories(userId) {
                return resource.query({ user_id: userId});
            }

            function createCategory(category) {
                return resource.save(category);
            }

            function updateCategory(category) {
                return resource.update(category);
            }

            function deleteCategory(category) {
                return resource.remove({ id: category._id });
            }

            return {
                getAllCategories: getAllCategories,
                createCategory: createCategory,
                updateCategory: updateCategory,
                deleteCategory: deleteCategory
            }

        }]);

}());