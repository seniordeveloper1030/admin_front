/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope,$rootScope,$http, $timeout, baConfig, baUtil) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.categoriesNumber = 0;
    $scope.cardNumber = 0;
    $scope.charts = [{
      color: pieColor,
      description: 'Categories',
      stats: '57,820',
      icon: 'credit-card',
    }, {
      color: pieColor,
      description: 'Cards',
      stats: '$ 89,745',
      icon: 'money',
    }, {
      color: pieColor,
      description: 'Active Users',
      stats: '13',
      icon: 'credit-card',
    }, {
      color: pieColor,
      description: 'Blocked Users',
      stats: '6',
      icon: 'credit-card',
    }
    ];
    $http.get($rootScope.hostAddress + 'categories')    // Get the number of categories in the db
    .success(function(response) {

       $scope.charts[0] = {
        color: pieColor,
        description: 'Categories',
        stats: response.length.toString(),
        icon: 'credit-card',
      }
    });
    $http.get($rootScope.hostAddress + 'cards')         // Get the number of cards in the db
    .success(function(response) {
      $scope.charts[1] = {
        color: pieColor,
        description: 'Cards',
        stats: response.length.toString(),
        icon: 'credit-card',
      }
    });
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();