angular.module('appCtrl', [])
.controller('appCtrl', function($mdSidenav, $stateParams, $rootScope) {

    var self = this;

    // Update title using rootscope
    self.updateTitle = function() {
        $rootScope.title = $stateParams.title;
    }

    // Run updateTitle on each state change
    $rootScope.$on('$stateChangeSuccess', self.updateTitle);

	self.toggleLeft = function() {
    	$mdSidenav('left').toggle();
    }

    self.toggleRight = function() {
    	$mdSidenav('right').toggle();
    }

    //START
    self.traitsNum = 1;

    self.parent1 = {
      "traits": [
        {
          "traitName" : '',
          "dominant" : false,
          "alleles" : ['','']
        }
      ]
    }

    self.parent2 = {
      "traits": [
        {
          "traitName" : '',
          "dominant" : false,
          "alleles" : ['','']
        }
      ]
    }

    self.assignAlleles = function() {
      self.xAxis = buildAxis(self.parent1.traits[0].alleles);
      self.yAxis = buildAxis(self.parent2.traits[0].alleles);

      punnettCalc(self.xAxis, self.yAxis);
    }

    function buildAxis(parent) {
      var alleles = parent;

      return alleles;
    }

    function punnettCalc(x,y) {
      var xAxis = x;
      var yAxis = y;

      self.position1 = xAxis[0] + yAxis[0];
      self.position2 = xAxis[1] + yAxis[0];
      self.position3 = xAxis[0] + yAxis[1];
      self.position4 = xAxis[1] + yAxis[1];
    }

})
