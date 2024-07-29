const todoForm = document.querySelector("#todo__form");
const todoInput = document.querySelector(".todo__title");
const todoButton = document.querySelector(".todo__create");
const todoBody = document.querySelector(".todo__body");
const todoBodyCompleted = document.querySelector(".todo__body--completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue === "") {
    return;
  }

  const task = {
    name: inputValue,
    isCompleted: false,
    id: new Date().getTime(),
  };

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);

  todoForm.reset();
  todoInput.focus();
});

function createTask(task) {
  const taskEl = document.createElement("li");

  taskEl.setAttribute("id", task.id);
  taskEl.setAttribute("class", "todo__item");

  if (task.isCompleted) {
    taskEl.classList.add("is_completed");
  }

  const taskElMarkup = `
    <p>${task.name}</p>

    <div class="todo__buttons">
      <button class="btn todo--delete"><span class="sr-only">delete ${task.name} task</span></button>
      <button class="btn todo--complete"><span class="sr-only">mark ${task.name} as completed</span></button>
    </div>
  `;

  taskEl.innerHTML = taskElMarkup;

  if (task.isCompleted) {
    todoBodyCompleted.appendChild(taskEl);
  } else {
    todoBody.appendChild(taskEl);
  }
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => {
    return task.id != parseInt(taskId);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById(taskId).remove();
}

function completeTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id == parseInt(taskId)) {
      task.isCompleted = !task.isCompleted;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById(taskId).classList.toggle("is_completed");

  const taskEl = document.getElementById(taskId);

  if (taskEl.classList.contains("is_completed")) {
    todoBodyCompleted.appendChild(taskEl);
  } else {
    todoBody.appendChild(taskEl);
  }
}

todoBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("todo--delete")) {
    const taskId = e.target.closest("li").id;

    removeTask(taskId);
  }

  if (e.target.classList.contains("todo--complete")) {
    const taskId = e.target.closest("li").id;

    completeTask(taskId);
  }
});

todoBodyCompleted.addEventListener("click", function (e) {
  if (e.target.classList.contains("todo--delete")) {
    const taskId = e.target.closest("li").id;

    removeTask(taskId);
  }

  if (e.target.classList.contains("todo--complete")) {
    const taskId = e.target.closest("li").id;

    completeTask(taskId);
  }
});
