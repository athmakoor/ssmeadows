var app = angular.module("main-app", []);

app.service('apiServices', function () {
    this.getHomeData = function (callback) {
        var request = {}, errCb, successCb;
        errCb = function (error) {
            callback(error);
        };

        successCb = function (data) {
            callback(null, data);
        };

        request.type = "get";
        request.url = "/api/home-data";
        request.success = successCb;
        request.error = errCb;
        $.ajax(request);
    };
});

app.controller("homeCtrl", ['$scope', 'apiServices', '$timeout',function ($scope, apiServices, $timeout) {
    apiServices.getHomeData(function (error, data) {
        $scope.plots = data.plots;
        $scope.stats = data.stats;
        $scope.$apply();
    });
}]);
