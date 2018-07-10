
(function () {
  'use strict';

  var pageApp = angular.module('BlurAdmin.pages.card', ['ngFileUpload']);
  pageApp.directive('customOnChange', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeFunc = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeFunc);
      }
    };
  });
  pageApp.config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('card', {
          url: '/card/:id',
          controller: 'CardCtrl',
          templateUrl: 'app/pages/card/card.html',
          title: 'Card',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
