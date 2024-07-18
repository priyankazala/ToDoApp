let todo = JSON.parse(globalThis.window.localStorage.getItem("todo")) || []; //will give the to do list from localstorage or an empty array
// get all the  buttons and inputs

let todoInput = document.getElementById("todoInput");
var todoCount = document.getElementById("todoCount");
let todoList = document.getElementById("todoList");
let addbutton = document.querySelector(".btn");
let deletebutton = document.getElementById("deleteBtn");

document.addEventListener("DOMContentLoaded", function () {
  addbutton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deletebutton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

const addTask = () => {
  let newTask = todoInput.value.trim();
  if (newTask.length > 0) {
    todo.push({
      text: newTask,
      disabled: false,
    });
    savetoLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
};

const savetoLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

const deleteAllTasks = () => {
  todo = [];
  savetoLocalStorage();
  displayTasks();
};

const displayTasks = () => {
  todoList.innerHTML = "";
  todo.forEach((item, idx) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class = "todo-container">
        <input type= "checkbox" class = "todo-checkbox"
        id = "input-${idx}" ${item.disabled ? "checked" : ""} > 
    <p id="todo-${idx}" class = "${
      item.disabled ? "disabled" : ""
    }" onclick = "editTask(${idx})"> 
        ${item.text}
        </p>
      </div>
      `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(idx);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
};

const toggleTask = (idx) => {
  todo[idx].disabled = !todo[idx].disabled;
  savetoLocalStorage();
  displayTasks();
};

const editTask = (idx) => {
  const currElem = document.getElementById(`todo-${idx}`);

  const currText = todo[idx].text;

  const inputElem = document.createElement("input");
  inputElem.value = currText;
  console.log(inputElem);
  currElem.replaceWith(inputElem);
  inputElem.focus();
  inputElem.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      const updatedText = inputElem.value.trim();
      if (updatedText) {
        todo[idx].text = updatedText;
        savetoLocalStorage();
      }
      displayTasks();
    }
  });
};
