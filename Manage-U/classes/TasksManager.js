export default class TasksManager {
  constructor() {
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push(task);
  }
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => {
      return task.id != id;
    });
  }
  renameTask(id, newName) {
    for (let task of this.tasks) {
      if (task.id == id) {
        task.name = newName;
        break;
      }
    }
  }
  completeTask(id) {
    for (let task of this.tasks) {
      if (task.id == id) {
        task.active = false;
        break;
      }
    }
  }
}
