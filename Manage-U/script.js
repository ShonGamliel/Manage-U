import Task from "./classes/Task.js";
import TasksManager from "./classes/TasksManager.js";

let manager = new TasksManager();

window.showCompleted = true
window.showActives = true

for (let task of JSON.parse(sessionStorage.getItem("Tasks")).tasks) {
  let addedTask = new Task(task.name);
  manager.addTask(addedTask);
  addedTask.active = task.active;
}

updateTasks();

window.add_task = function add_task(name) {
  if (name.length > 2) {
    let newTask = new Task(name);
    manager.addTask(newTask);
    document.getElementById("add-task-input").value = "";
    window.showCompleted = true
    window.showActives = true
    updateTasks();
  }
};

window.completeTask = function completeTask(id) {
  manager.completeTask(id);
  updateTasks();
};

window.renameTask = function renameTask(id, newName) {
  manager.renameTask(id, newName);
  updateTasks();
};

window.deleteTask = function deleteTask(id) {
  manager.deleteTask(id);
  updateTasks();
};

window.allowRename = function allowRename(id) {
  let inputEl = document.getElementById(`input_${id}`);
  inputEl.removeAttribute("disabled");
  inputEl.setAttribute("onkeypress", `handleInputKey(event, ${id})`);
};

window.newTaskInput = function newTaskInput(e){
  if (e.code == "Enter") {
    let inputEl = document.getElementById(`add-task-input`);
    if (inputEl.value.length > 2) {
      add_task(inputEl.value);
    }
  }
}

window.clearAll = function clearAll(){
  manager.tasks = []
  updateTasks()
}

window.handleInputKey = function handleInputKey(e, id) {
  if (e.code == "Enter") {
    let inputEl = document.getElementById(`input_${id}`);
    if (inputEl.value.length > 2) {
      inputEl.setAttribute("disabled", "disabled");
      inputEl.removeAttribute("onkeypress");
      renameTask(id, inputEl.value);
    }
  }
};

window.onlyComplete = function onlyComplete(){
  window.showCompleted = true 
  window.showActives = false
  updateTasks()
}

window.onlyPending = function onlyPending(){
  window.showCompleted = false 
  window.showActives = true
  updateTasks()
}

window.showAll = function showAll(){
  window.showActives = true
  window.showCompleted = true
  updateTasks()
}


function updateTasks() {
  let activesTitle = document.getElementById("active-title");
  let completedTitle = document.getElementById("completed-title");
  activesTitle.style.display = "none";
  completedTitle.style.display = "none";

  let showAllButton = document.getElementById("button-show-all");
  let clearButton = document.getElementById("button-clear-all");
  let pendingButton = document.getElementById("button-pending");
  let completedButton = document.getElementById("button-completed");
  clearButton.style.display = "none";
  pendingButton.style.display = "none";
  completedButton.style.display = "none";
  showAllButton.style.display = "none";

  let activesElement = document.getElementById("active-tasks-container");
  let completedElement = document.getElementById("completed-tasks-container");
  activesElement.innerHTML = "";
  completedElement.innerHTML = "";
  let actives = 0;
  let completed = 0;
  manager.tasks.map((task) => {
    if (task.active == true && window.showActives == true) {
      actives += 1;
      activesTitle.style.display = "block";
      activesElement.innerHTML =
        activesElement.innerHTML +
        `
            <div class="task center">
                <input id="input_${task.id}" type="text" disabled="disabled" value="${task.name}">
                <img class="btn" src="buttons/check-button.png" alt="" onclick="completeTask(${task.id})">
                <img class="btn" src="buttons/edit-button.png" alt="" onclick="allowRename(${task.id})">
                <img class="btn" src="buttons/trash-button.png" alt="" onclick="deleteTask(${task.id})">
            </div>
        `;
    } else if (task.active == false && window.showCompleted == true) {
      completed += 1;
      completedTitle.style.display = "block";
      completedElement.innerHTML =
        completedElement.innerHTML +
        `
            <div class="task-completed center">
              <input type="text" disabled="disabled" value="${task.name}" />
              <img
                class="btn"
                src="buttons/double-check-button-blur.png"
                alt=""
              />
              <img class="btn" src="buttons/edit-button-blur.png" alt="" />
              <img class="btn" onclick="deleteTask(${task.id})" style="cursor:pointer;" src="buttons/trash-button.png" alt="" />
            </div>
        `;
    }
  });
  if(manager.tasks.length > 2){
    clearButton.style.display = "block";
  }
  if(actives > 0 && completed > 0)
  {
    pendingButton.style.display = "block";
    completedButton.style.display = "block";
  }

  if((window.showCompleted == true && window.showActives == false) || (window.showCompleted == false && window.showActives == true))
  {
    showAllButton.style.display = "block";
  }

  if(window.showCompleted == true && actives > 0 && completed > 0)
  {
    pendingButton.style.display = "block";
  }

  if(window.showActives == true && completed > 0 && actives > 0)
  {
    completedButton.style.display = "block";
  }

  sessionStorage.setItem("Tasks", JSON.stringify(manager));
}