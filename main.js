let $todoInput;
let $alertInfo;
let $addBtn;
let $ulList;
let $newTask;
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;
let $allTasks;
let allTask = [];

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  $todoInput = document.querySelector(".todoInput");
  $alertInfo = document.querySelector(".alertInfo");
  $addBtn = document.querySelector(".addBtn");
  $ulList = document.querySelector(".todoList ul");
  $popup = document.querySelector(".popup");
  $popupInfo = document.querySelector(".popupInfo");
  $popupInput = document.querySelector(".popupInput");
  $addPopupBtn = document.querySelector(".accept");
  $closeTodoBtn = document.querySelector(".cancel");
  $allTasks = $ulList.getElementsByTagName("li");
};

const prepareDOMEvents = () => {
  $addBtn.addEventListener("click", addNewTask);
  $ulList.addEventListener("click", checkClick);
  $closeTodoBtn.addEventListener("click", closePopup);
  $addPopupBtn.addEventListener("click", changeTodotask);
  $todoInput.addEventListener("keyup", checkEnter);
};

window.addEventListener("DOMContentLoaded", () => {
  const localStorage = localStorage.getItem("allTasks");
  console.log(localStorage);
});

console.log(localStorage);

const addNewTask = () => {
  if ($todoInput.value !== "") {
    allTask.push({ id: allTask.length, value: $todoInput.value });
    allTask.forEach((task) => {
      $newTask = document.createElement("li");
      $newTask.innerText = task.value;
      $newTask.setAttribute("id", `todo-${task.id}`);
      $ulList.appendChild($newTask);
      $todoInput.value = "";
      $alertInfo.innerText = "";
      createToolsArea();
    });

    localStorage.setItem("allTasks", JSON.stringify(allTask));
  } else {
    $alertInfo.innerText = "Podaj treść zadania.";
    $alertInfo.style.color = "#cc0000";
  }
};

const checkEnter = () => {
  if (event.keyCode === 13) {
    addNewTask();
  }
};

const createToolsArea = () => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  $newTask.appendChild(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML = "EDIT";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.appendChild(completeBtn);
  toolsPanel.appendChild(editBtn);
  toolsPanel.appendChild(deleteBtn);
};

const checkClick = (event) => {
  if (event.target.closest("button").classList.contains("complete")) {
    event.target.closest("li").classList.toggle("completed");
    event.target.closest("button").classList.toggle("completed");
  } else if (event.target.closest("button").className === "edit") {
    editTask(event);
  } else if (event.target.closest("button").className === "delete") {
    deleteTask(event);
  }
};

const editTask = (event) => {
  const oldTodo = event.target.closest("li").id;
  $editedTodo = document.getElementById(oldTodo);
  $popupInput.value = $editedTodo.firstChild.textContent;
  $popup.style.display = "flex";
};

const changeTodotask = () => {
  if ($popupInput.value !== "") {
    $editedTodo.firstChild.textContent = $popupInput.value;
    $popup.style.display = "none";
    $popupInfo.innerText = "";
  } else {
    $popupInfo.innerText = "Musisz podać treść zadania.";
  }
};

const closePopup = () => {
  $popup.style.display = "none";
  $popupInfo.innerText = "";
};

const deleteTask = (event) => {
  const deleteTodo = event.target.closest("li");
  deleteTodo.remove();

  if ($allTasks.length === 0) {
    $alertInfo.innerText = "Brak zadań na liście.";
  }
};

document.addEventListener("DOMContentLoaded", main);
