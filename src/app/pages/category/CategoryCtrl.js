(function () {
    'use strict';

    angular.module('BlurAdmin.pages.category')
    .controller('CategoryCtrl', CategoryCtrl);

    function CategoryCtrl($scope,$rootScope,$state,$stateParams, $http, $uibModal,toastr) {
      $scope.smartTablePageSize = 10; //set the total page

      $scope.gotoCard = function( id ,event){

        $state.go('card', {id:id});   //navigate when the user clicks the category name
      }
      $scope.removeCard = function(i){
        $http.delete($rootScope.hostAddress + 'cards/' + $scope.cardsInfo[i]['_id'])
            .success(function(response) {
                $scope.cardsInfo.splice(i, 1);
                toastr.success('Removed successfully!');
        });
      }
      $scope.editCard = function( id ,event){

        $state.go('card', {id:'edit_' + id});   //navigate when the user clicks the category name
      }
      $http.get($rootScope.hostAddress + 'cardsIn/' + $stateParams.id)  //send http get request to get all cards belong to the category
            .success(function(response) {
                $scope.cardsInfo = response;
      })
      .error(function(err){
        $scope.cardsInfo = {};
      })
      ;
    }
})();