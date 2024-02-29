const todoInput = document.querySelector(".todo__title");
const todoButton = document.querySelector(".todo__create");
const todoBody = document.querySelector(".todo__body");
const todoBodyCompleted = document.querySelector(".todo__body--completed");

function todoButtons(parent) {
  const todoButtons = document.createElement("div");
  todoButtons.classList.add("todo__buttons");

  const todoDelete = document.createElement("button");
  todoDelete.classList.add("btn", "todo--delete");
  todoDelete.innerHTML = '<span class="sr-only">todo delete</span>';

  const todoComplete = document.createElement("button");
  todoComplete.classList.add("btn", "todo--complete");
  todoComplete.innerHTML = '<span class="sr-only">mark as completed</span>';

  todoButtons.append(todoDelete, todoComplete);
  parent.append(todoButtons);

  todoDelete.addEventListener("click", function (event) {
    parent.classList.add("todo__item--remove");
    parent.addEventListener("transitionend", function () {
      parent.remove();
    });
  });

  todoComplete.addEventListener("click", function (event) {
    parent.classList.toggle("is_completed");
  });
}

function addTodo() {
  if (todoInput.value === "") {
    alert("Please add activity");
    return;
  } else {
    const li = document.createElement("li");
    li.innerHTML = `<p>${todoInput.value}</p>`;
    li.classList.add("todo__item");
    todoButtons(li);
    todoBody.prepend(li);
  }
  todoInput.value = "";
}

function completeTodo() {}

todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
