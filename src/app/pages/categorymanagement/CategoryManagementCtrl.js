(function () {
    'use strict';

    angular.module('BlurAdmin.pages.categorymanagement')
    .controller('CategoryManagementCtrl', CategoryManagementCtrl);

    function CategoryManagementCtrl($rootScope,$scope,$state, $uibModal,toastr,$http) {
        
        $scope.numberOfCategories = 12;
        $scope.categoryMode = "Add";
        
        $http.get($rootScope.hostAddress + 'categories')
            .success(function(response) {
                $scope.metricsTableData = response;
        });
        
        $scope.removeCategory = function( i ){
            $http.delete($rootScope.hostAddress + 'categories/' + $scope.metricsTableData[i]['_id'])
            .success(function(response) {
                $scope.metricsTableData.splice(i, 1);
                toastr.success('Removed successfully!');
            });
            
        }
        $scope.getURL = function( uri ){
            return $rootScope.hostAddress + "uploads/" + uri;
        }
        $scope.gotoCategory = function(event, id ){
            $state.go('category', {id:id});
        }

        $scope.addCategory = function(){
            $scope.categoryMode = "Add";
            var modalInstance = $uibModal.open({
                templateUrl: 'app/pages/categorymanagement/categoryModal/categoryModal.html',
                size: "sm",
                resolve: {
                    categoryMode: function () {
                        return $scope.categoryMode;
                    },
                    metricsTableData: function(){
                        return $scope.metricsTableData;
                    },
                    selectedIndex: function(){
                        return -1;
                    }
                },
                controller: categoryModalController,                
              })
            modalInstance.result.then(function () {
               
            }, function () {
                
            });
        }
        $scope.editCategory = function( i ){
            $scope.categoryMode = "Edit";
            var modalInstance = $uibModal.open({
                templateUrl: 'app/pages/categorymanagement/categoryModal/categoryModal.html',
                size: "sm",
                controller: categoryModalController,
                resolve: {
                    categoryMode: function () {
                        return $scope.categoryMode;
                    },
                    metricsTableData: function(){
                        return $scope.metricsTableData;
                    },
                    selectedIndex: function(){
                        return i;
                    }
                }
              })
            modalInstance.result.then(function () {
               
            }, function () {
                
            });
        }
    }
    
    var categoryModalController = function($scope,$rootScope,$http,$uibModal,toastr,Upload,selectedIndex, metricsTableData,fileReader,$filter, $uibModalInstance, categoryMode) {
        $scope.categoryMode = categoryMode;
        $scope.categoryInfo = {name:"", picture:$filter('appImage')('theme/no-photo.png')};
        if(selectedIndex > -1){
            $scope.categoryInfo.name =  metricsTableData[selectedIndex]['categoryName'];
        }
        $scope.onOk = function () {
            $scope.submit();
            

        };
        var CustomModalController = function($scope, $uibModal,toastr,$http, content, title, modalMode) {
            $scope.content = content;
            $scope.title = title;
            $scope.modalMode = modalMode;
        }

        $scope.submit = function(){
            if ( $scope.isLoadPicture() ) { //check if image is valid
                $scope.upload($scope.file); //call upload funtion
                $uibModalInstance.close();
            }else{
                $uibModal.open({
                    templateUrl: 'app/theme/modals/customModal.html',
                    size: "sm",
                    controller: CustomModalController,
                    resolve: {
                        modalMode: function () {
                            return 2;
                        },
                        title: function(){
                            return "Category"
                        },
                        content: function(){
                            return "Please upload image.";
                        }
                    }
                })
            }
        }
        $scope.isLoadPicture = function(){
            return $scope.categoryInfo.picture != $filter('appImage')('theme/no-photo.png');
        }
        $scope.onCancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.uploadPicture = function(){
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();
        }
        $scope.removePicture = function(){
            $scope.categoryInfo.picture = $filter('appImage')('theme/no-photo.png');
            document.getElementById("uploadFile").value = "";
        }
  
        $scope.getFile = function () {

            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                  $scope.categoryInfo.picture = result;
                });
        };

        $scope.upload = function (file) {

            Upload.upload({
                url: $rootScope.hostAddress + 'upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    toastr.success("Image Uploaded");
                    var body = {
                        categoryName: $scope.categoryInfo.name,
                        categoryIcon: resp.data.filename
                    };
                    if(selectedIndex > -1){
                        $http.put($rootScope.hostAddress + 'categories/' + metricsTableData[selectedIndex]['_id'], body)
                        .success(function(response) {
                                metricsTableData[selectedIndex] = response;
                                toastr.success($scope.categoryMode + 'ed successfully!');
                            })
                            .error(function(data, status) {
                                toastr.warning("Failed to " + $scope.categoryMode);
                            })
                    }else {
                        $http.post($rootScope.hostAddress + 'categories', body)
                            .success(function(response) {
                                metricsTableData.push(response);
                                toastr.success($scope.categoryMode + 'ed successfully!');
                            })
                            .error(function(data, status) {
                                toastr.warning("Failed to " + $scope.categoryMode);
                            })  
                    }
                    
                    
                } else {
                    toastr.warning("Image Upload failed");
                }
            });
        };
      };    

     

})();