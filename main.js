// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption= document.querySelector('.filter-todo');
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions

function addTodo(event){
    //Prevent form to not be submited
    event.preventDefault();
    // Todo DIV
    const todoDiv=  document.createElement('div');
    todoDiv.classList.add('todo');
    //Create li
    const newTodo= document.createElement('li');
    newTodo.innerText= todoInput.value ;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add TODO localstorage
    saveLocalTodos(todoInput.value);
    // Checked Button
    const checkedButton= document.createElement('button');
    checkedButton.innerHTML= '<i class="fas fa-check"></i>';
    checkedButton.classList.add('checked-btn');
    todoDiv.appendChild(checkedButton);
    //Delete
    const deleteButton= document.createElement('button');
    deleteButton.innerHTML= '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    // Append to todoList
    todoList.appendChild(todoDiv);
    //Clear Todo Input
    todoInput.value='';
}

function deleteCheck(e){
    const item = e.target;

    // Delete todo
    if(item.classList[0]=== 'delete-btn'){
        const todo= item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){// When transition it's over
            todo.remove();
        });
    }

    // Check todo
    if(item.classList[0] === 'checked-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display= 'flex';
                }else{
                    todo.style.display= 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display= 'flex';
                }else{
                    todo.style.display= 'none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    // Check todo
    let todos;

    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
    // Todo DIV
    const todoDiv=  document.createElement('div');
    todoDiv.classList.add('todo');
    //Create li
    const newTodo= document.createElement('li');
    newTodo.innerText= todo ;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Checked Button
    const checkedButton= document.createElement('button');
    checkedButton.innerHTML= '<i class="fas fa-check"></i>';
    checkedButton.classList.add('checked-btn');
    todoDiv.appendChild(checkedButton);
    //Delete
    const deleteButton= document.createElement('button');
    deleteButton.innerHTML= '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    // Append to todoList
    todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex= todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}