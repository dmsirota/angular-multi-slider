'use strict';

angular.module('multiSliderDemo', ['angularMultiSlider', 'ngAnimate', 'ui.bootstrap']);

angular.module('multiSliderDemo')
  .controller('DemoCtrl', function ($rootScope, $scope, $uibModal) {

    //Needed for uib-tabs only
    $scope.activeTabs = [true, false];

    $scope.slider = [{value: 200}];

    $scope.sliders = [
      {title: 'Folder: ', value: 10, color: '#ccc'},
      {title: 'Weight: ', value: 100, color: 'red'},
      {title: 'File: ', value: 240, color: '#00FF00'},
      {title: 'Test: ', value: 250, color: 'blue'}
    ];

    $scope.modalSliders = [
      {title: 'Weight: ', value: 1},
      {title: 'File: ', value: 1.2}
    ];

    // ceiling / floor is for demo for binding to slider with adjustable floor / ceiling
    $scope.ceiling = 365;
    $scope.floor = 0;

    $scope.tabSliders = [
      {value: 10,  title: 'Brainstorming: ', component: 'Proposal Making'},
      {value: 40,  title: 'Working groups formation: ', component: 'Proposal Making'},
      {value: 100, title: 'Proposal drafting: ', component: 'Proposal Making'},
      {value: 130, title: 'Proposal editing: ', component: 'Versioning'},
      {value: 160, title: 'Proposal selection: ', component: 'Versioning'},
      {value: 200, title: 'Discussion of proposals: ', component: 'Deliberation'},
      {value: 250, title: 'Technical assessment: ', component: 'Deliberation'},
      {value: 300, title: 'Voting on proposals: ', component: 'Voting'}
    ];

    // date conversions for filter
    $scope.getDateOffset = function(daysFromNow) {
      var today = new Date();
      return today.valueOf() + (daysFromNow * 86400000);
    };

    $scope.dateFloor = $scope.getDateOffset(0);
    $scope.dateCeiling = $scope.getDateOffset(365);

    $scope.dateSliders = angular.copy($scope.tabSliders);

    //Copy tabSlider, use value but convert to javascript date primitive
    //*Note: The primitive value is returned as the number of millisecond since midnight January 1, 1970 UTC.
    angular.forEach($scope.dateSliders,function(slider){
      slider.value = $scope.getDateOffset(slider.value);
    });

    $scope.openModal = function() {
      var modalDlg = $uibModal.open({
        templateUrl: 'sliderModal.html',
        controller: function ($scope, $uibModalInstance, sliders) {
          //Copy of the object in order to keep original values in $scope.percentages in parent controller.
          $scope.mSliders = angular.copy(sliders);

          $scope.ok = function () {
            $uibModalInstance.close($scope.mSliders);
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('Canceled');
          };
        },
        resolve: {
          sliders: function () {
            return $scope.modalSliders;
          }
        }
      });

      modalDlg.result.then(function (updatedSliders) {
        $scope.modalSliders = updatedSliders;
      });
    };
  });
