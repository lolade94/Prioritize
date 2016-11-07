var Task =  require('./model/task.js');
var Budget = require('./model/budget.js');

module.exports = function(app){

app.get('/budget', function(req, res){

  Budget.find({},function(err, budgets){
    if(err)
    console.log(err);

    res.json(budgets);
  });
});

app.post('/budget', function(req, res){

 var budget = new Budget({
    month:req.body.mon,
    income: req.body.inc,
    expense: req.body.exp,
    balances:req.body.bal,
    bud: req.body.bud
 });

 budget.save(function(err, budget){
   if(err)
     console.log(err);

    res.json(budget);
 });

});



//Edit task
app.get('/api/tasks/:id',function(req, res){

console.log("id: " + req.params.id);
Task.findById(req.params.id, function (err, task) {
  if(err)
    console.log(err);

  console.log(task);
  res.json(task);
});

});



//Get all tasks
app.get('/api', function(req, res){
 Task.find({}, function(err, tasks){

    if(err)
      console.log(err);

    res.json(tasks);
 });

});


//app.get for each priority app.get('/path/priority', function)
app.get('/api/taskslist/:action', function(req, res){
console.log( 'action' + req.params.action);
  Task.find({action:req.params.action}).sort({date:1}).exec(function(err, tasks){

    if(err)
    console.log(err);

    res.json(tasks);
  });
});//find actions

    
    //add task
app.post('/api/tasks', function(req, res){
//create  a task in memory
  var task = new Task({
    name: req.body.name,
    date: req.body.date,
    action: req.body.action.priority,
    note: req.body.note
  });

//save it to database
task.save(function(err){
  if(err)
    console.log(err);
  else {
    console.log(task);
    res.json(task);
  }
 });
}); //post method

    
    //delete task
app.delete('/api/tasks/:id', function(req, res){
  var date = req.body.date;
  console.log(req.params.id);
 Task.findByIdAndRemove(req.params.id, req.body, function(err, tasks){
     if(err)
        console.log(err);
     res.json(tasks);
  });//remove method
});//delete method

    //delete budget

app.delete('/budgets/:id', function(req, res){
  console.log(req.params.id);
  Budget.findByIdAndRemove(req.params.id, req.body, function(err, budgets){
     if(err)
        console.log(err);
     res.json(budgets);
  });//remove method
});//delete method

//update task
app.put('/api/tasks', function(req, res){
  Task.findOneAndUpdate({_id: req.body._id},
    {$set: {"name": req.body.name,
            "action": req.body.action.priority,
            "date": req.body.date,
            "note": req.body.note}},
    function(err, task){
       if(err)
           console.log(err);
       console.log(task);
       res.json(task);
    });

 });//update



};
