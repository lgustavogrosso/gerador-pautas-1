angular.module('item.controllers', []).controller('ItemController', function($scope, $state, $stateParams, popupService, $window, $http) {

  $scope.getItens = function () {
    $http.get("item/v1/itens").success(function (data) {
      $scope.itens = data;
    });
  };

  $scope.addItem = function(item) {
    $http.post('item/v1/itens', item).success(function() {
      $state.go('itens');
    });
  };

  $scope.getItem = function() {
    $http.get("item/v1/itens/" + $stateParams.id).success(function (data) {
      $scope.item = data;
    })
  }

  $scope.deleteItem = function(item) {
    if (popupService.showPopup('Quer realmente deletar?')) {
        $http.delete("item/v1/itens/" + item.id).success(function(){
        $state.reload();
      });
    }
  }

  $scope.editItem = function(item) {
    $http.put('item/v1/itens/' + item.id, item).success(function() {
      $state.go('itens');
    });
  };

});
