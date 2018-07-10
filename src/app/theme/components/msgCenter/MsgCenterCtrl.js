/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('MsgCenterCtrl', MsgCenterCtrl);

  /** @ngInject */
  function MsgCenterCtrl($scope, $sce) {
    $scope.users = {
      0: {
        name: 'Vlad',
      },
      1: {
        name: 'Kostya',
      },
      2: {
        name: 'Andrey',
      },
      3: {
        name: 'Nasta',
      }
    };

    $scope.notifications = [
      {
        userId: 0,
        template: '&name add a new category.',
        time: '1 min ago'
      },
      {
        userId: 1,
        template: '&name changed 2 cards.',
        time: '2 hrs ago'
      },
      {
        userId: 2,
        template: '&name removed a category.',
        time: '1 day ago'
      },
      {
        userId: 3,
        template: 'Today is &name\'s birthday.',
        time: '2 days ago'
      },
      {
        userId: 1,
        template: '&name added Tips & Tricks.',
        time: '1 week ago'
      }
    ];

    $scope.getMessage = function(msg) {
      var text = msg.template;
      if (msg.userId || msg.userId === 0) {
        text = text.replace('&name', '<strong>' + $scope.users[msg.userId].name + '</strong>');
      }
      return $sce.trustAsHtml(text);
    };
  }
})();