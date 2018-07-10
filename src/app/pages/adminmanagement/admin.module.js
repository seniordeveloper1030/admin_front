
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.admin', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('adminmanagement', {
            url: '/admin',
            controller: 'AdminCtrl',
            templateUrl: 'app/pages/adminmanagement/adminmanagement.html',
            title: 'Admin Management',
            sidebarMeta: {
              icon: 'ion-android-home',
              order: 0,
            },
          });
    }
  
  })();
  