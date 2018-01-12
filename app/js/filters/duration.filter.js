;(function() {

    angular.module('todoApp')
        .filter('duration', function() {

            return function(items, duration) {
                if(!items) return '';
                var dur;
                duration = Number(duration);
                switch(duration) {
                    case 1:
                        dur = 5 * 60 * 1000;
                        break;
                    case 2:
                        dur = 7 * 24 * 60 * 60 * 1000;
                        break;
                    default:
                        dur = Date.now();
                }
                return items.filter(function(item) {
                    var diff = new Date - new Date(item.updated);
                    return diff < dur;
                });
            }
        })

}());