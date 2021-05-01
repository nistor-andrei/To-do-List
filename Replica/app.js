const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Events
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


// Functions

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Li
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);

    //Checked Button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('checked-btn');
    todoDiv.appendChild(checkButton);

    //Delete
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear input
    todoInput.value = '';

}

function deleteCheck(e) {
    const item= e.target;
console.log(item);
    if(item.classList[0] === 'delete-btn'){
        const todo=item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })
        //Check

        if(item.classList[0] === 'checked-btn'){
            const todo=item.parentElement;
            todo.classList.toggle('completed');
        }
    }
}

function filterOption(e){

}