angular.module('chatapp', [
    'ngSanitize',
    'ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.tpl.html",
            controller: "chatctrl"
        })
}])
.controller('chatctrl', ['$scope', '$http', function($scope, $http) {

    // VARIABLES
    $scope.topics = null;
    $scope.chatData = null;
    $scope.selectedTopic = null;

    // FLAGS
    $scope.showChatWindow = false;

    // HELPER FUNCTIONS

    /**
     * Gets all chat topics
     */
    const getAllTopics = () => {
        $http.get("/getAllTopics")
            .then(success => {
                $scope.topics = success.data;
            }, failure => {
                // Failure
                console.log(failure)
            })
    }
    
    // INIT FUNCTIONS
    getAllTopics();
   
    // Get all topics

    // MAIN FUNCTIONS

    /**
     * Get chat data for particular topic
     * @param {string} key 
     */
    $scope.getChatData = (key) => {
        $scope.selectedTopic = key;
        $http.post("/getChatData", {"key": key})
            .then(data => {
                $scope.chatData = R.values(data.data);
                $scope.showChatWindow = true;
            }, err => {
                console.log(err)
            })
    }

    /**
     * Check if From header is valid
     * @param {number} index
     */
    $scope.isFromValid = (index) => {
        if(index === 0 || index === 1) {
            return true;
        } else if(angular.isDefined($scope.chatData[index - 1]) && $scope.chatData[index].from != $scope.chatData[index - 1].from && $scope.chatData[index].from == $scope.chatData[index + 1].from) {
            return true;
        } else {
            return false;
        }
    }

}]);