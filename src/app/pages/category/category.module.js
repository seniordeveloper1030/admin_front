
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.category', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('category', {
          url: '/category/:id',
          controller: 'CategoryCtrl',
          templateUrl: 'app/pages/category/category.html',
          title: 'Category',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
