//Declare Priority App
var app = angular.module('priority',[]);


app.controller('mainController', function($scope, $http){
//Select menu array of options
  $scope.actions=[
    {priority:"Do First"},
    {priority:'Do Next'},
    {priority:'Do Later'},
    {priority:"Don't Do"}
  ];


//test select value change
 $scope.selectAction  = function(){
   console.log($scope.task.action);
 };

//Refresh to get update task list
  var refresh = function(){
   $http.get('/api').success(function(response){
   console.log("I got the data I requested");
    $scope.tasklist = response;
   $scope.task = "";
   });
  };

    //call function when page loads
  refresh();

// Add a task and check for duplicates
  $scope.addTask = function(){

    var found = $scope.tasklist.reduce(function(previous, i){

         if($scope.task.name === i.name)
           return true;
         return previous;
       },
     false
   );

  if (found){
    alert('Duplicate value!');
  }
  else{
    console.log($scope.task);
    $http.post('/api/tasks', $scope.task).success(function(response){
      console.log(response);
    });
  }
    refresh();
  };

    //Remove task by task id 
  $scope.remove = function(id){
     console.log(id);
     $http.delete('/api/tasks/' + id).success(function(response){
         refresh();
     });
  };
    
//Remove budget by budget id
  $scope.removeBud = function(id){
     console.log(id);
     $http.delete('/budgets/' + id).success(function(response){
         reBudget();
     });
  };

// Edit task through form
  $scope.edit = function(id){
    $http.get('/api/tasks/' + id).success(function(response){
      $scope.task = response;
    });
  };

//Update Task
  $scope.update= function(){
    $http.put('/api/tasks', $scope.task).success(function(response){
      $scope.task = response;
    });
    refresh();
  };

//Get task by priority actio and sort tasks
$scope.getAction = function(action){
 console.log(action);
 $scope.tasklist=[];
   $http.get('/api/taskslist/' + action).success(function(response){
     console.log(response);
     $scope.tasklist = response;

     if($scope.tasklist.length ===0){
        alert ("No responses");
     }
   });

};

//Get all tasks
$scope.getAll = function(){
 refresh();
};

//Calculate Account Balances
$scope.calBal= function(){

var total=0;
total += parseInt(document.getElementById('check').value) +  parseInt(document.getElementById('save').value) +  parseInt(document.getElementById('oth').value);
console.log(total);

$scope.bkTotal = total;
 return total;
};

//Caclculate Income
$scope.calIncome= function(){

var total=0;
total += parseInt(document.getElementById('employ').value) +  parseInt(document.getElementById('inOther').value) +  parseInt(document.getElementById('disable').value);
console.log(total);

$scope.inTotal = total;
 return parseInt(total);
};

    
//Calculate Expenses
$scope.calExp= function(){

var total=0;
total += parseInt(document.getElementById('rent').value) +  parseInt(document.getElementById('car').value) +  parseInt(document.getElementById('util').value) +
parseInt(document.getElementById('grocer').value) +  parseInt(document.getElementById('cable').value) +  parseInt(document.getElementById('phone').value) +
  parseInt(document.getElementById('necess').value) +  parseInt(document.getElementById('othExp').value);

console.log(total);

$scope.expTotal = total;
 return  total;
};

//Calculate monthly budget
$scope.calBud = function(){
   var total =0;
   var month= document.getElementById('month').value;
   var expense = $scope.expTotal;
   var income = $scope.inTotal;
   var balances = $scope.bkTotal;

  total +=income + balances;
  $scope.budTotal =  total - expense;

  $scope.budget = {
     mon: month,
     exp: expense,
     inc: income,
     bal: balances,
     bud: $scope.budTotal
   };

//Check for duplicates
 var found = $scope.budgetList.reduce(function(prev, i){
   console.log($scope.budget.mon + " | " + i.month);
    if($scope.budget.mon == i.month)
       return true;
  return prev;

 },false);

   console.log($scope.budget);

if(found){
 alert('Duplicate Month and Year!');
}
else{
  $http.post('/budget', $scope.budget).success(
    function(response){
       console.log(response);
    });
}
 reBudget();

};

//Gets all the budgets for each month
var reBudget = function(){
 $http.get('/budget').success(function(response){
 console.log("I got the data I requested");
  $scope.budgetList= response;
  console.log($scope.budgetList);
 $scope.budget = "";
 });
};

//When DOM loads get the list of budgets
reBudget();



////**********************Tabs*************************/
$scope.tab = 1;

$scope.setTab = function(newTab){
  $scope.tab = newTab;
};


$scope.isSet = function(tabNum){
  return $scope.tab === tabNum;
};


});
