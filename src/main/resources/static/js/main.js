var getParameterByName = function (name, fallback) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);

    if (fallback === undefined) {
        fallback = null;
    }

    return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : fallback;
};

var fixMsisdn = function (msisdn) {
    if (msisdn != null && msisdn != undefined && msisdn.length < 10) {
        return "965" + msisdn;
    }

    return msisdn;
}

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

    this.getStats = function ( callback) {
        var request = {}, errCb, successCb;
        errCb = function (error) {
            callback(error);
        };

        successCb = function (data) {
            callback(null, data);
        };

        request.type = "get";
        request.url = "/api/get-stats";
        request.success = successCb;
        request.error = errCb;
        $.ajax(request);
    };

    this.reGenerateOTP = function (msisdn, callback) {
        var request = {}, errCb, successCb;
        errCb = function (error) {
            callback(error);
        };

        successCb = function (data) {
            callback(null, data);
        };

        request.contentType = "application/json";
        request.type = "get";
        request.url = "/api/auth/reGenerateOTP/" + msisdn;
        request.success = successCb;
        request.error = errCb;
        $.ajax(request);
    };

    this.verifyOTP = function (requestData, callback) {
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
        request.url = "/api/auth/verifyOTP";
        request.success = successCb;
        request.error = errCb;
        $.ajax(request);
    };
});

app.controller("mainCtrl", ['$scope', 'apiServices', function ($scope, apiServices) {

}]);

app.controller("homeCtrl", ['$scope', 'apiServices', '$timeout',function ($scope, apiServices, $timeout) {
    apiServices.getHomeData(function (error, data) {
        $scope.plots = data.plots;
        $scope.stats = data.stats;
        $scope.$apply();
    });
}]);

app.controller("authCtrl", ['$scope', 'apiServices', '$timeout',function ($scope, apiServices, $timeout) {
    var id = getParameterByName("view");
    var category = getParameterByName("cat");

    $scope.otpReceived = false;

    $scope.generateOTP = function (redirectToHome) {
        var requestData = {msisdn: fixMsisdn($scope.msisdn), provider: $.cookie("provider"), partner: $.cookie("partner"), partnerTransactionId: $.cookie("pti")};

        if ($scope.msisdn !== undefined && $scope.msisdn !== null && $scope.msisdn !== "") {
            $scope.showLoader = true;
            apiServices.checkAndGenerateOTP(requestData, function (error, data) {
                if (!error) {
                    $.cookie("msisdn", fixMsisdn($scope.msisdn), { path: '/' });
                    if (data.authenticated) {
                        if (redirectToHome) {
                            window.location.href = "/home";
                        } else {
                            window.location.reload();
                        }
                    } else if (data.otpSent){
                        $scope.otpReceived = true;
                    } else {
                        alert("Unable to send OTP. Please check the mobile number.");
                    }
                } else {
                    alert(error.responseJSON.message);
                }
                $scope.showLoader = false;
                $scope.$apply();
            });
        } else {
            $scope.errorMsg = "Please enter your mobile number";
        }
    }

    $scope.regenerateOTP = function () {
        $scope.showLoader = true;
        apiServices.reGenerateOTP(fixMsisdn($scope.msisdn), function (error, data) {
            $scope.showLoader = false;
            $scope.otpReceived = true;
            if (!error) {
                $.cookie("msisdn", fixMsisdn($scope.msisdn), { path: '/' });
                if (data) {
                    if (data.otpSent){
                        alert("OTP sent successfully.");
                        $scope.otpReceived = true;
                    } else {
                        alert("Something went wrong, Try again later.");
                    }
                }
            } else {
                alert(error.responseJSON.message)
            }
            $scope.$apply();
        });
    }

    $scope.verifyOTP = function (redirectToHome) {
        $scope.showLoader = true;
        apiServices.verifyOTP({msisdn: fixMsisdn($scope.msisdn), otpText: $scope.otpText}, function (error, data) {
            if (!error) {
                if (redirectToHome) {
                    window.location.href = "/home";
                } else {
                    window.location.reload();
                }

            } else {
                $scope.showLoader = false;
                $scope.$apply();
                alert(error.responseJSON.message)
            }
        });
    }
}]);

app.controller("playCtrl", ['$scope', 'apiServices', '$timeout',function ($scope, apiServices, $timeout) {
    var id = getParameterByName("view");
    var category = getParameterByName("cat");

    $scope.authenticated = window.authenticated || $.cookie("ra") == null;

    apiServices.getGamesDetailsById(id, function (error, data) {
        $scope.currentSelected = data;
        $timeout(function () {
            var url = "https://mooddit.s3.ap-south-1.amazonaws.com/" + category + "/compressed/" + $scope.currentSelected.videoUrl;
             $(".video video source").attr("src", url);
             $(".video video").attr("src", url);
         }, 100);
        apiServices.getGamesByCategory(category, function (error, data) {
            $scope.videos = data;
            $scope.$apply();
        });
    });
}]);

app.controller("categoryCtrl", ['$scope', 'apiServices',function ($scope, apiServices) {
    $scope.category = window.category;
    apiServices.getGamesByCategory(window.category, function (error, data) {
        $scope.videos = data;
        $scope.$apply();
    });
}]);

app.controller("subscribeCtrl", ['$scope', 'apiServices',function ($scope, apiServices) {
    $scope.confirmSubscription = function () {

    };
}]);

app.controller("responseCtrl", ['$scope', 'apiServices', '$timeout',function ($scope, apiServices, $timeout) {
    console.log(window.msisdn);
    console.log(window.error);
}]);
