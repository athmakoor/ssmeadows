var getParameterByName = function (name, fallback) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);

    if (fallback === undefined) {
        fallback = null;
    }

    return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : fallback;
};

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

    this.updatePlot = function (requestData, callback) {
        var request = {}, errCb, successCb;
        errCb = function (error) {
            callback(error);
        };

        successCb = function (data) {
            callback(null, data);
        };

        request.data = JSON.stringify(requestData);
        request.contentType = "application/json";
        request.type = "POST";
        request.url = "/admin/api/plot/update";
        request.success = successCb;
        request.error = errCb;
        $.ajax(request);
    };

    this.login = function (requestData, callback) {
            var request = {}, errCb, successCb;
            errCb = function (error) {
                callback(error);
            };

            successCb = function (data) {
                callback(null, data);
            };

            request.data = JSON.stringify(requestData);
            request.contentType = "application/json";
            request.type = "POST";
            request.url = "/admin/api/login";
            request.success = successCb;
            request.error = errCb;
            $.ajax(request);
        };

    this.updateStats = function (requestData, callback) {
            var request = {}, errCb, successCb;
            errCb = function (error) {
                callback(error);
            };

            successCb = function (data) {
                callback(null, data);
            };

            request.data = JSON.stringify(requestData);
            request.contentType = "application/json";
            request.type = "POST";
            request.url = "/admin/api/stats/update";
            request.success = successCb;
            request.error = errCb;
            $.ajax(request);
        };
});

app.controller("adminCtrl", ['$scope', 'apiServices', '$timeout',function ($scope, apiServices, $timeout) {
    $scope.selectedPlot = {};
    $scope.msg = "";
    $scope.details={};

    if ($.cookie("auth") != "true") {
        window.location.href = "/login";
    }
    apiServices.getHomeData(function (error, data) {
        $scope.plots = data.plots;
        $scope.stats = data.stats;
        $scope.$apply();
    });

    $scope.updateSelectedPlot = function (plot) {
        $scope.selectedPlot = plot;

        var targetBox = $("." + plot.status);
        $(".box1").not(targetBox).hide();
        $(targetBox).show();
    }

    $scope.updatePlot = function () {
        apiServices.updatePlot($scope.selectedPlot, function (error, data) {
            if (!error) {
                $scope.msg = "Updated Plot Status";
                $scope.errMsg = "";
            } else {
                $scope.msg = "";
                $scope.errMsg = "Something went wrong.";
            }
            $scope.$apply();
        });
    }

    $scope.updateStats = function () {
        apiServices.updateStats($scope.stats, function (error, data) {
            if (!error) {
                $scope.msg = "Updated Stats";
                $scope.errMsg = "";
            } else {
                $scope.msg = "";
                $scope.errMsg = "Something went wrong.";
            }
        });
    }
}]);

app.controller("authCtrl", ['$scope', 'apiServices', '$timeout',function ($scope, apiServices, $timeout) {
    $.cookie("auth", undefined, { path: '/' });
    $scope.login = function () {
        apiServices.login($scope.details, function (error, data) {
            if (data) {
                $.cookie("auth", true, { path: '/' });
                window.location.href = "/admin";
            } else {
                $scope.msg = "Invalid credentials"
                $scope.$apply();
            }
        });
    }
}]);
