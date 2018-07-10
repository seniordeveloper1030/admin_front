/**
 * @author v.lugovsky
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.categorymanagement', ['ngFileUpload'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('categorymanagement', {
          url: '/categories',
          controller: 'CategoryManagementCtrl',
          templateUrl: 'app/pages/categorymanagement/categorymanagement.html',
          title: 'Category Management',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
