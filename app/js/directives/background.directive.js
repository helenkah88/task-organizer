;(function() {

    angular.module('todoApp')
        .directive('background', function() {
            return {
                link: function(scope, el) {
                    var images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
                    var rand = Math.floor(Math.random() * 9) + 1;
                    var imageUrl = '/img/image' + rand + '.jpg';
                    el.css('background-image', 'url(' + imageUrl + ')');
                }
            }
        })

}());