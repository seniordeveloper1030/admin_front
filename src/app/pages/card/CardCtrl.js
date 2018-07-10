(function () {
    'use strict';

    angular.module('BlurAdmin.pages.card')
    .controller('CardCtrl', CardCtrl);

    function CardCtrl($scope,$filter,$rootScope,$stateParams, $http, fileReader, $uibModal,toastr,$timeout, Upload) {
        $scope.card = {};
        $scope.cardMode = 1; // 1 . When user create a new card 2. When user edit a card 3. When user see a card 
        $scope.cardModel = {};
        $scope.card.picture = $filter('appImage')('theme/no-photo.png'); //set picture as default image
        $scope.card.tippicture = $filter('appImage')('theme/no-photo.png');
        $scope.uploadedItems = 0;
        $http.get($rootScope.hostAddress + 'categories')
                .success(function(response) {
                    $scope.categories = response;
        });
        if($stateParams.id != 'new'){
            $scope.cardId = $stateParams.id;
            if($stateParams.id.toLowerCase().indexOf('edit') !== -1){   //check the url if it contains edit
                $scope.cardMode = 2;
                $scope.cardId = $stateParams.id.split('_')[1];
            }else{
                $scope.cardMode = 3;
            }
            $http.get($rootScope.hostAddress + 'cards/' + $scope.cardId)  //send http request to get details of specific card
            .success(function(response) {
                $scope.cardModel = response;
                $scope.card.picture = $rootScope.hostAddress + 'uploads/' + $scope.cardModel.cardPicture;
                $scope.card.tippicture = $rootScope.hostAddress + 'uploads/' + $scope.cardModel.tipPicture;
            });
        }
    
      $scope.isLoadPicture = function(){ //Check if the card picture is selected
        return $scope.card.picture != $filter('appImage')('theme/no-photo.png');
      }
      $scope.addCard = function(){
        if($scope.cardMode == 2)
            return $scope.updateCard();
        
        $http.post($rootScope.hostAddress + 'cards', $scope.cardModel)
            .success(function(response) {
                $scope.uploadedItems = 0;
                toastr.success('Added successfully!');
            })
            .error(function(data, status) {
                toastr.warning("Failed to submit");
        })  
      }
      $scope.updateCard = function(){
        $http.put($rootScope.hostAddress + 'cards/' + $scope.cardId, $scope.cardModel)
            .success(function(response) {
                $scope.uploadedItems = 0;
                toastr.success('Updated successfully!');
            })
            .error(function(data, status) {
                toastr.warning("Failed to submit");
        })  
      }
      $scope.uploadPicture = function(){ //Emits the click event
        if( $scope.cardMode === 3)    return;
        var fileInput = document.getElementById('uploadCardFile');
        fileInput.click();
      }
      $scope.removePicture = function(){
        if( $scope.cardMode === 3)    return;
          $scope.card.picture = $filter('appImage')('theme/no-photo.png');
          document.getElementById("uploadCardFile").value = "";
      }                     
      $scope.isLoadTipPicture = function(){ //Check if the card picture is selected
        return $scope.card.tippicture != $filter('appImage')('theme/no-photo.png');
      }
      $scope.uploadTipPicture = function(){ //Emits the click event
        if( $scope.cardMode === 3)    return;
          var fileInput = document.getElementById('uploadTipFile');
          fileInput.click();
      }
      $scope.removeTipPicture = function(){
        if( $scope.cardMode === 3)    return;
          $scope.card.tippicture = $filter('appImage')('theme/no-photo.png');
          document.getElementById("uploadTipFile").value = "";
      }    
      $scope.showModal = function(title, content){
        $uibModal.open({
          templateUrl: 'app/theme/modals/customModal.html',
          size: "sm",
          controller: CustomModalController,
          resolve: {
              modalMode: function () {
                  return 2;
              },
              title: function(){
                  return title;
              },
              content: function(){
                  return content;
              }
          }
        })
      }
      $scope.progressFunction = function() { //Calls when form submits
        if($scope.cardModel.cardLocation.split(',').length !== 2){
          $scope.showModal("Card", "Input correct location with latitude and longitude.");
          return;
        }
        $timeout(function() {}, 1000);
        if ( $scope.isLoadPicture() ) { //check if image is valid
          if($scope.isLoadTipPicture()){
            if($scope.card.picture.indexOf('http://') === -1) $scope.upload($scope.file);
            else {
                $scope.cardModel.cardPicture = $scope.card.picture.split('/')[$scope.card.picture.split('/').length - 1];
                $scope.uploadedItems ++;
            }
            if($scope.card.tippicture.indexOf('http://') === -1) $scope.uploadTip($scope.tipfile);
            else{
                $scope.cardModel.tipPicture = $scope.card.tippicture.split('/')[$scope.card.tippicture.split('/').length - 1];
                if( ($scope.uploadedItems ++) == 1 ) $scope.addCard();
            } 
            
          }else{
            $scope.showModal("Tips & Tricks", "Please import tips & tricks image.");
          }
        }else{
            $scope.showModal("Card", "Please import card image.");
        }
      };
      var CustomModalController = function($scope, $uibModal,toastr,$http, content, title, modalMode) {
        $scope.content = content;
        $scope.title = title;
        $scope.modalMode = modalMode;
      }
      $scope.upload = function (file) {
        Upload.upload({
            url: $rootScope.hostAddress + 'upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                toastr.success("Image uploaded");
                $scope.cardModel.cardPicture = resp.data.filename;
                if(($scope.uploadedItems ++) == 1){   //increase count of uploaded item
                  $scope.addCard();
                }
                
            } else {
                toastr.warning("Image Upload failed");
            }
        });
      };
      $scope.uploadTip = function (file) {
  
        Upload.upload({
            url: $rootScope.hostAddress + 'upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                toastr.success("Image uploaded");
                $scope.cardModel.tipPicture = resp.data.filename; //Save uploaded filename to card model
                if(($scope.uploadedItems ++) == 1){   //increase count of uploaded item
                  $scope.addCard();
                }
            } else {
                toastr.warning("Image Upload failed");
            }
        });
      };
      $scope.uploadFile = function(){ //When user imports image, get url of selected image and set the preview image

          var id = event.target.id;
          if(id == "uploadTipFile") $scope.tipfile = event.target.files[0];
          else $scope.file = event.target.files[0];

          fileReader.readAsDataUrl(event.target.files[0], $scope)
          .then(function (result) {
            if(id == "uploadTipFile")
              $scope.card.tippicture = result;
            else
              $scope.card.picture = result;
          });
      };
    }

  
})();