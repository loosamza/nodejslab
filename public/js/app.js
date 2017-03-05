var app = angular.module('myApp', []);

app.controller('Ctrl', function ($scope, $http) {
        $scope.angTxt = "Hello";
        console.log('Hello im working now');
        $scope.post = function (model) {
                console.log(model);
                /*$http.post('/call', model).then(function (success) {
                        console.log('done !!');
                });*/
                $http.get('/call', {
                        name: 'Mr. X'
                })

        }

        $scope.submit = function (model) {
                console.log(angular.toJson(model));

                $http.post('/data/add',
                        angular.toJson(model)
                ).then(successCallback, errorCallback);

                function successCallback(response) {
                        console.log('success');
                }

                function errorCallback(error) {
                        console.log('Error: ' + error);
                }


        }





});