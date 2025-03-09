// kumpulan semua UI
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput= document.querySelector("#todo-input");
const todoClear = document.querySelector("#clear-todos");
const filterInput = document.querySelector("#filter-input");

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", todoDelete);
todoClear.addEventListener("click", clearTodos);
filterInput.addEventListener("keyup", filterTodos);

function addTodo(e){
  e.preventDefault();

  //jika yang diinputkan user bukanlah sesuatu yg kosong 
  if(todoInput.value){
    //membuat element li dan memberi class
  const li = document.createElement("li");
  li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

  li.appendChild(document.createTextNode(todoInput.value)); // membuat teks didalam li berdasarkan input user

  //membuat delete button
  const a = document.createElement("a"); //membuat element / tag a di javascript
  a.href = "#"; //memberikan alamat pada element a
  a.className = "badge badge-danger delete-todo"; //memberikan class pada element a
  a.innerHTML = "delete"; //memberikan tulisan "delete" pada element a

  li.appendChild(a); //menyelipkan element a kedalam children element li

  todoList.appendChild(li); // memasukkan element li

  addTodoLocalStorage(todoInput.value); 

  todoInput.value = ""; // otomatis menghapus teks pada kolom input setelah mensubmit todo list
  } else {
    alert("jangan kosong gitu le..");
  }
  
};

function addTodoLocalStorage(todoInputValue){
  let todos;

  if(localStorage.getItem("todos") == null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todoInputValue);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function todoDelete(e){
  e.preventDefault();
  if(e.target.classList.contains("delete-todo")){
    if(confirm("apakah kamu yakin ingin menghapus?")){
      const parent = e.target.parentElement;
      parent.remove()
    }
  }
  
};

function clearTodos(){
  todoList.innerHTML = "";
};

function filterTodos(e){
  const filter = e.target.value.toLowerCase()
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
   const textTodos = item.firstChild.textContent.toLowerCase();

    if(textTodos.indexOf(filter) !== -1){
      item.setAttribute("style", "display: block;");
    }else {
      item.setAttribute("style", "display: none !important;")
    }
  })
  console.log(filter)
}