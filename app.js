const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

const getTodos = () => {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"><i/>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashdButton = document.createElement("button");
    trashdButton.innerHTML = `<i class="fas fa-trash"><i/>`;
    trashdButton.classList.add("trash-btn");
    todoDiv.appendChild(trashdButton);

    todoList.appendChild(todoDiv);
  });
};

const saveLocalTodos = (todo) => {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (event) => {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  if (!todoInput.value) {
    return;
  } else {
    newTodo.innerText = todoInput.value;
  }
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"><i/>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashdButton = document.createElement("button");
  trashdButton.innerHTML = `<i class="fas fa-trash"><i/>`;
  trashdButton.classList.add("trash-btn");
  todoDiv.appendChild(trashdButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
};

const deleteCheck = (event) => {
  const item = event.target;
  //   console.dir(item);
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentNode;
    todo.classList.add("fall");
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
    // todo.remove();
  } else if (item.classList.contains("fa-trash")) {
    const todo = item.parentNode.parentNode;
    todo.classList.add("fall");
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentNode;
    todo.classList.toggle("completed");
    console.log(todo);
  } else if (item.classList.contains("fa-check")) {
    const todo = item.parentNode.parentNode;
    todo.classList.toggle("completed");
    console.log(todo);
  }
};

const filterTodo = (event) => {
  const todos = todoList.childNodes;
  //   console.log(todos);
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
    }
  });
};

const removeLocalTodos = (todo) => {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo.innerText);
  console.log(todos.indexOf(todo.innerText));
  const todoIndex = todos.indexOf(todo.innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);
};

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
