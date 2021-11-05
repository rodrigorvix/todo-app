const html = document.querySelector("html");
const buttonTheme = document.querySelector(".btn-theme");
const inputTask = document.querySelector("#input-new-task");
const listTasks = document.querySelector(".list-tasks");
const numberTasks = document.querySelector(".number-tasks");

let countTasks = 0;

buttonTheme.addEventListener("click", changeTheme);
inputTask.addEventListener("keypress", addNewTask);

getDataStorage();

function changeTheme() {
  const iconDark = document.querySelector(".theme-dark");
  const iconLight = document.querySelector(".theme-light");

  iconDark.classList.toggle("show-icon");
  iconLight.classList.toggle("show-icon");
  html.dataset.theme = html.dataset.theme !== "dark" ? "dark" : "light";
  localStorage.setItem('theme', html.dataset.theme)
}

function addNewTask({ key }) {
  if(key === "Enter" && inputTask.value.trim() !== "") {

    const listTasks = document.querySelector(".list-tasks");
    const newTask = document.createElement("li");

    newTask.innerHTML = `
    <label class="task-container">
      <input type="checkbox" class="task-checkbox">
      <span class="checkmark">
        <img src="./images/icon-check.svg" alt="icon check" class="icon-check">
      </span>
      <span class="task-name">${inputTask.value.substring(0, 50)}</span>
    </label>
    <button class="btn-delete">
      <img src="./images/icon-cross.svg" alt="icon cross">
    </button>`;

    listTasks.appendChild(newTask);

    countTasks++;
    showCountTasks(countTasks);
   
    inputTask.value = "";
    addEventButtonDelete();
    addEventTaskCheckbox();
    saveTasksStorage();
  }
}

function removeTask() {
  const taskRemove = this.parentNode;
  listTasks.removeChild(taskRemove);
  countTasks--;

  saveTasksStorage();

  if(countTasks > 0) {
    numberTasks.innerHTML = `${countTasks} tarefa(s) adicionada(s).`;
  } else {
    numberTasks.classList.remove("show-number-tasks");
  }
}
function showCountTasks(countTasks) {
  numberTasks.classList.add("show-number-tasks");
  numberTasks.innerHTML = `${countTasks} tarefa(s) adicionada(s).`;
}

function addEventButtonDelete() {
  const buttonRemoveTask = document.querySelectorAll(".btn-delete");
  buttonRemoveTask.forEach((button) =>
    button.addEventListener("click", removeTask)
  );
}

function addEventTaskCheckbox(){
  const taskCheckbox = document.querySelectorAll('.task-checkbox');

  taskCheckbox.forEach((checkbox) =>
  checkbox.addEventListener("change", toggleCheckbox)
  );
}
function toggleCheckbox() {
  const checked = this.checked;

  if(checked) {
    this.setAttribute("checked", checked);
  } else {
    this.removeAttribute("checked");
  }
  
  saveTasksStorage()
}

function getDataStorage() {
  html.dataset.theme = localStorage.theme ? localStorage.theme : "dark";

if(localStorage.listTasks) {
  listTasks.innerHTML = localStorage.listTasks;
  addEventButtonDelete();
  addEventTaskCheckbox();

  countTasks = listTasks.childElementCount;
  showCountTasks(countTasks);
}
}

function saveTasksStorage() {
  const listTasksStorage = listTasks.innerHTML;
  
  localStorage.setItem('listTasks', listTasksStorage); 
}
