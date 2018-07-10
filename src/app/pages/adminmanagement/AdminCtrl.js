(function () {
    'use strict';

    angular.module('BlurAdmin.pages.admin')
    .controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($scope,$rootScope,$state,$stateParams, $http, $uibModal,toastr) {
        $scope.admin = {oldusername:"admin"};
        $scope.oldusername_checked = true;
        $scope.submitAdmin = function(){
            
        }
    }
})();