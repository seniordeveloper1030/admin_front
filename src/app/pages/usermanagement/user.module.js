
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.user', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('usermanagement', {
            url: '/user',
            controller: 'UserCtrl',
            templateUrl: 'app/pages/usermanagement/usermanagement.html',
            title: 'User Management',
            sidebarMeta: {
              icon: 'ion-android-home',
              order: 0,
            },
          });
    }
  
  })();
  