
const todoList = [{
    name:'ok',
    date:'2015-09-12'
}, {
    name:'da',
    date:'2025-10-12'
}];



showTodoList();

document.querySelector('.add-todo-button').addEventListener('click', () => {addTodo();});


function showTodoList() {
    let todoListHTML ='';

    todoList.forEach((todoObject,index) => {
        const {name,date} = todoObject;
        const html = `<div>${name}</div> <div>${date}</div>
            <button class="delete-todo-button"
            >Delete</button>
`;
        todoListHTML += html;
    })

    document.querySelector('.js-div-html').innerHTML = todoListHTML;
    document.querySelectorAll('.delete-todo-button')
        .forEach((deleteTodo,index) => {
            deleteTodo.addEventListener('click', (e) => {
                todoList.splice(index,1);
                showTodoList();
            })
        })
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    const dateInputElement = document.querySelector('.js-date-input');
    const date = dateInputElement.value;

    todoList.push({
        name,
        date
    });

    console.log(todoList);

    inputElement.value = '';
    showTodoList();
}