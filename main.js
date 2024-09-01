const addTodoButton = document.getElementById("add-todo-btn");
const addInput = document.getElementById("add-input");
const todoList = document.getElementById("todo-list");
const editFormWrapper = document.getElementById("edit-form-wrapper");
const editInput = document.getElementById("edit-input");
const editForm = document.getElementById("edit-form");
const alertText = document.querySelector(".alert-text");

// all todos to show
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// save todos into local storage
const saveTodosToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// show todos
const displayTodos = () => {
  todoList.innerHTML = "";
  // get all todos from todos array and show it
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList = "todo-item";

    todoItem.innerHTML = `
      <span class='todo-text'>${todo}</span>
      <button type='button' class='todo-btn' id='edit-btn' data-index=${index}  onClick='editTodo(this)'>
        <i class='fa fa-edit'></i>
      </button>
      <button type='button' class='todo-btn' id='delete-btn' data-index=${index} onClick='deleteTodo(this)'>
        <i class='fa fa-trash'></i>
      </button>
    `;
    todoList.appendChild(todoItem);
  });
  if (todos.length === 0) {
    alertText.classList.add("show-alert-text");
    alertText.textContent = "Todo list is Empty!";
  }
};
displayTodos();

// add new todo
addTodoButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = addInput.value.trim();

  // if value was correct add new into todolist
  if (value !== "") {
    todoList.innerHTML = "";

    // add new todo value innto todos array
    todos.push(value);

    // save todos to local storage and update todos
    saveTodosToLocalStorage();
    displayTodos();

    // reset todo input value
    addInput.value = "";
    alertText.classList.remove("show-alert-text");
  } else {
    // if input was empty:
    alertText.classList.add("show-alert-text");
    alertText.textContent = "Please write Something";
    alertText.classList.add("alert-animation");
    alertText.addEventListener("animationend", () => {
      alertText.classList.remove("alert-animation");
    });
  }
});

// delete todo
const deleteTodo = (btn) => {
  const index = btn.dataset.index;

  todos.splice(index, 1);

  //save exist todos to local storage and show exist todos
  saveTodosToLocalStorage();
  displayTodos();
};

// edit todo
const editTodo = (btn) => {
  // getindex of clicked todo and show edit form
  const index = btn.dataset.index;
  // showw edit form

  editFormWrapper.classList.add("show-form");
  editInput.value = todos[index];
  // set dataset into editInput to save it later
  editInput.dataset.index = index;
  editInput.focus();
};

// Save edited todo
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // hide edit form
  editFormWrapper.classList.remove("show-form");
  // get index of clicked todo
  const todoIndex = editInput.dataset.index;

  // edit clicked todo from todos array
  todos[todoIndex] = editInput.value;

  // show alert when editInput is empty
  if (editInput.value === "") {
    alertText.classList.add("show-alert-text");
    alertText.textContent = "Edit input can't be empty!";
    return;
  }

  //save todos to local storage and update edited todo 
  saveTodosToLocalStorage();
  displayTodos();
});

// close edit for when click outside of input
editFormWrapper.addEventListener("click", (e) => {
  const id = e.target.getAttribute("id");

  if (id === "edit-form-wrapper") {
    editFormWrapper.classList.remove("show-form");
  }
});
