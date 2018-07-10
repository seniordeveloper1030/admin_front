(function () {
    'use strict';

    angular.module('BlurAdmin.pages.user')
    .controller('UserCtrl', UserCtrl);

    function UserCtrl($scope,$rootScope,$state,$stateParams, $http, $uibModal,toastr) {
        $scope.peopleTableData = [
            {
              id: 1,
              firstName: 'Mark',
              lastName: 'Otto',
              username: '@mdo',
              email: 'mdo@gmail.com',
              age: '28',
              status: 'info'
            },
            {
              id: 2,
              firstName: 'Jacob',
              lastName: 'Thornton',
              username: '@fat',
              email: 'fat@yandex.ru',
              age: '45',
              status: 'primary'
            },
            {
              id: 3,
              firstName: 'Larry',
              lastName: 'Bird',
              username: '@twitter',
              email: 'twitter@outlook.com',
              age: '18',
              status: 'success'
            },
            {
              id: 4,
              firstName: 'John',
              lastName: 'Snow',
              username: '@snow',
              email: 'snow@gmail.com',
              age: '20',
              status: 'danger'
            },
            {
              id: 5,
              firstName: 'Jack',
              lastName: 'Sparrow',
              username: '@jack',
              email: 'jack@yandex.ru',
              age: '30',
              status: 'warning'
            }
          ];
    }
})();