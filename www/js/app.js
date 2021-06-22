

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var appModule = angular.module('starter', ['ionic','ngStorage'])

var expression = 0;
var result = 0;
var historyText="";
var expressionObj = [];
var resultObj = [];
var count =0;
var numCheck = true;
var histCount=0;
appModule.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
	

	
})



appModule.controller('CalController', function($scope, $ionicModal,LocalStorage) {
	
			
	
	
	$scope.showHistory = function()
	{
	   var element = document.getElementById('para');
	   var text="";
	   var i;
		
		for(i=0; i < expressionObj.length; i++)
		{
		   text += expressionObj[i]+"<br><br>"+ "= "+resultObj[i]+"<br>"+"<hr>"+ "<br> <br>";	
		}
		
       //historyText = $scope.getAll();
		
		element.innerHTML = text;
	}//END OF SHOW HISTORY
	
	$scope.clearHistory = function()
	{
		var element = document.getElementById('para');
		element.innerHTML = "";
		expressionObj =[];
		resultObj = [];	
		histCount=0;
	}//END OF CLEAR HISTORY
	
	
	
  $ionicModal.fromTemplateUrl('template/historyModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });	

	//******************LOCAL STORAGE FUNCTIONS*************************
	
  $scope.things = LocalStorage.getAll();
	
  $scope.add = function (saveHistory) 
  {
	var i = resultObj.length -1;
    var addLastData;
	
    addLastData = expressionObj[i]+"<br>" + "=" + "<br" + resultObj[i] + "<br> <br>";	
	  
        LocalStorage.add(addLastData);
  };
	
  $scope.remove = function (saveHistory) 
  {
    LocalStorage.remove(saveHistory);
  };  
	
	$scope.getAll = function () 
  {
    LocalStorage.getAll();
  };
	
	
})


//=====================LOCAL STORAGE SERVICE=======================================
.factory('LocalStorage',function($localStorage)
{
 //Initialize the key to be used and be watched by $localStorage.
	$localStorage = $localStorage.$default({
  things: []
});
	
		var _getAll = function ()
		{
		    return $localStorage.things;
		};
	
		var _add = function (thing) 
		{
		    $localStorage.things.push(thing);
		}
		
		var _remove = function (thing) 
		{
		    $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
		}
		
		return {
			getAll: _getAll,
			add: _add,
			remove: _remove
		  };
})


function clearOne(){
	
      var in1 = document.getElementById("input1");
	  var in2 = document.getElementById("input2");
	  var len = in1.value.length;
 numCheck = true;
	 count =0;
	
	if(in2.value > 0)
	{
		in1.value = in2.value;
		in2.value = "";
	}
	else
	  if(len >1)
	  {
	    in1.value = in1.value.substr(0, len -1);
	  }
	  else
		  if(len<=1)
			{
		       	in1.value = "";	  
		    }
		  
}



function returnResult(){
	var in1 = document.getElementById("input1");
	
	var in2 = document.getElementById("input2");
	
	if(in1.value != "")
		{
			in2.value = eval(in1.value); //eval function calculate whatever in in the text filed and return the result
			count =0;

			expression = in1.value;
			result = in2.value;

			expressionObj.push(expression);
			resultObj.push(result);

			console.log(expressionObj[histCount]);
			console.log(resultObj[histCount]);
			histCount++;
			console.log(histCount);
			numCheck = false;
		}
	else
		{
			console.log("Empty Field");
		}

		
}


function clearBox()
{
	var in2 = document.getElementById("input2");
	var in1 = document.getElementById("input1");
	
	in1.value="";
	in2.value="";
	numCheck = true;
	count =0;
}


function negateValue()
{
	var in1 = document.getElementById("input1");
	var temp = in1.value;
	
	if(temp > 0)
	{
		in1.value ="";
  
		in1.value = in1.value.concat("-",temp);		
	}
	
	if(temp < 0)
	{
		in1.value = temp;		
	}
	
	
}
//=================================FUNCTIONS FOR ARITHMETIC OPERATORS=====================================


function arithmeticOperator(arithOperator)
{
	var in1 = document.getElementById("input1");
	var in2 = document.getElementById("input2");
    var len = in1.value.length;
	var input = in1.value;
	 
	
	
	if(count === 0 )
	{
		

		if(in1.value === "")
		{
		   console.log("Empty Field");		
		}
		else if(len >= 1)
			{
				if(eval(in1.value) == in2.value)
					{
						console.log("Expression detected");
						in1.value ="";
						in1.value = in1.value.concat(in2.value,arithOperator);
						in2.value ="";
						numCheck = true;
					}//END OF OF
				else 
				{
					
					in1.value = "";
					in1.value = in1.value.concat(input,arithOperator);
					 count = count +1;
					numCheck = true;
				}//END OF ELSE


			}//END OF ELSE IF
	}
	else
		{
			console.log("count not != 0");
		}
}//END OF arithmeticOperator


//=======================================NUMBERS ERROR CHECK=============================================

var printNumbers = function(number)
{
    var in1 = document.getElementById("input1");
	var in2 = document.getElementById("input2");	
    var input = in1.value;

	if(input.length >= 1 && numCheck === true)
		{
			in1.value +=number;
			count = 0;
			numCheck = true;
		}

    else 
	{

			in1.value ="";
		    in2.value ="";
			in1.value =number;
		    count = 0;
			console.log("Expression detected");
			numCheck = true;
	}//END OF IF
}

;





