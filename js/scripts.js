// Business Logic for individual tasks in a list:
function CreateTask(taskName, deadline, description) {
  this.taskName = taskName;
  this.deadline = deadline;
  this.description = description;
}

// Business logic for task lists:
function CreateList() {
  this.tasks = [],
  this.currentId = 0
}

CreateList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

CreateList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks.push(task);
}

CreateList.prototype.findTask =  function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]){
      if (this.tasks[i].id == id) {
        return this.tasks[i];
      }
    }  
  };
  return false;
}

// User interface logic:

var inputTaskList = new CreateList();

function makeListClickable() {
  $("ul#tasks").on("click", "li", function() {
    showTaskDetails(this.id);
  });
};

function showTaskDetails(taskId) {
  var task = inputTaskList.findTask(taskId);
  $("show-task").show();
  $(".name").html(this.taskName);
  $(".deadline").html(this.deadline);
  $(".description").html(this.description);
}

function displayTaskList(taskList) {
  var listOfTasks = $("ul#tasks");
  var htmlForTasks = "";
  taskList.tasks.forEach(function(task) {
    htmlForTasks += "<li id=" + task.id + ">" + task.taskName + "</li>";
  });
  listOfTasks.html(htmlForTasks);
}

$(document).ready(function() {
  makeListClickable();

  $("form").submit(function(event) {
    event.preventDefault();

    var inputName = $("input#name").val();
    var inputDeadline = $("#deadline").val();
    var inputDescription = $("input#description").val();

    var inputTask = new CreateTask(inputName, inputDeadline, inputDescription);

    inputTaskList.addTask(inputTask);

    displayTaskList(inputTaskList);
  });
});