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

    var traitSchema = {
      "traitName" : '',
      "dominant" : false,
      "alleles" : ['','']
    };

    self.parent1 = {
      "traits": []
    }

    self.parent2 = {
      "traits": []
    }

    self.appInit = function() {
      clearParents();
      buildParents();

    }

    self.changeTraitsNum = function() {
      if (self.traitsNum != '') {
        self.appInit();
        findTotalTiles(self.traitsNum);
        //console.log(self.parent1.traits);
      }
    };

    function clearParents() {
      self.parent1.traits = [];
      self.parent2.traits = [];
    }

    // Called by init (onchage traitsnum); populates traits array according to traitsnum
    function buildParents() {
      for(var i = 0; i < self.traitsNum; i++) {
        self.parent1.traits.push(angular.copy(traitSchema));
        self.parent2.traits.push(angular.copy(traitSchema));
      }
    }

    self.submitClick = function() {
      if ((self.traitsNum < 1) || (self.traitsNum > 5)) {
        alert("You must choose 1 to 5 traits to calculate.");
      }
      else {
        assignAlleles();
        //console.log(self.parent1.traits[0].alleles);
      }
    };

    function assignAlleles() {
      var parent1Alleles = [];
      var parent2Alleles = [];

      for (var i = 0; i < self.traitsNum; i++) {
        parent1Alleles.push(self.parent1.traits[i].alleles);
        parent2Alleles.push(self.parent2.traits[i].alleles);

      }

      //buildAxis();
      //punnettCalc(self.xAxis, self.yAxis);
    }

    function buildAxis(parent) {

    }

    function punnettCalc(x,y) {
      var xAxis = x; //(T,t) xAxis[0] + yAxis[0]
      var yAxis = y; //(t,t)

      self.positions = [];

      self.genotypes = [];

      for(var i = 0; i < xAxis.length; i++) {
        for(var j = 0; j < yAxis.length; j++) {
          self.genotypes.push(xAxis[i] + yAxis[j]);

        }
      }

      //console.log(self.genotypes);


      self.position1 = xAxis[0] + yAxis[0];
      self.position2 = xAxis[1] + yAxis[0];
      self.position3 = xAxis[0] + yAxis[1];
      self.position4 = xAxis[1] + yAxis[1];
    }


    function findTotalTiles(traitsNum) {
      self.colNum = 2;
      self.totalTiles = 4;

      if ((traitsNum > 0) & (traitsNum <= 5)) {
        self.colNum = (2 ** traitsNum); // +1 because of the parent label row and column
        self.totalTiles = self.colNum ** 2;

        console.log("columns: " + self.colNum);
        console.log("total squares: " + self.totalTiles);
      }
      else {
        //alert("Please choose a number of traits between 1 and 5.");
      }

      self.tiles = createTilesArray(self.totalTiles);
    }

    function createTilesArray(tilesNum) {
      var tiles = [];

      for(var i = 0; i < tilesNum; i++) {
        tiles.push(i);
      }

      return tiles;
    }



    self.appInit();

})
