// Business Logic for individual tasks in a list:
function CreateTask(taskName, taskDeadline, taskDescription) {
  this.taskName = taskName;
  this.taskDeadline = taskDeadline;
  this.taskDescription = taskDescription;
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

CreateList.prototype.deleteTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if(this.tasks[i].id == id) {
        delete this.tasks[i];
        return true;
      }
    };
  }
  return false;
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
  $("ul#all-tasks").on("click", "li", function() {
    showTaskDetails(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    inputTaskList.deleteTask(this.id);
    $("#show-task").hide();
    displayTaskList(inputTaskList);
  });
};

function showTaskDetails(taskId) {
  var task = inputTaskList.findTask(taskId);
  $("#show-task").show();
  $(".name").html(task.taskName);
  $(".deadline").html(task.taskDeadline);
  $(".description").html(task.taskDescription);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + +task.id + ">Mark task as complete</button>");
}

function displayTaskList(taskList) {
  var listOfTasks = $("ul#all-tasks");
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

    console.log(inputTask);

    inputTaskList.addTask(inputTask);

    console.log(inputTaskList);

    displayTaskList(inputTaskList);
  });
});