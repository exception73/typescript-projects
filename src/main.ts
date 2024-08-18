import './style.css'


interface Todo{
  title:string;
  isCompleted:boolean;
  readonly id : string;
}

const todoInput : HTMLInputElement= document.getElementById('input') as HTMLInputElement;
const myFrom : HTMLFormElement = document.getElementById('myForm') as HTMLFormElement;
const todoContainer : HTMLDivElement = document.getElementById('todoContainer') as HTMLDivElement;
const noTodoPara : HTMLParagraphElement = document.getElementById('notodo') as HTMLParagraphElement;


const generateTodoItem = (title:string, isCompleted : boolean, id : string) => {
  const todo : HTMLDivElement = document.createElement('div');
  todo.className = 'todo';
  const checkBox : HTMLInputElement = document.createElement('input');

  checkBox.setAttribute('type', 'checkbox');
  checkBox.className='isCompleted';
  checkBox.checked = isCompleted;

  const paragraph : HTMLParagraphElement = document.createElement('p');
  paragraph.innerText = title;
  paragraph.id = id;
  if(isCompleted == true)todo.classList.add('todo-completed')
  else todo.classList.remove('todo-completed');
  checkBox.onclick = () => {
    const idx = todos.findIndex((item) => item.id === id);
    todos[idx].isCompleted = checkBox.checked;
    if( todos[idx].isCompleted == true)todo.classList.add('todo-completed')
      else todo.classList.remove('todo-completed');
    localStorage.setItem('todos', JSON.stringify(todos))

    }
  const btn: HTMLButtonElement = document.createElement('button');

  btn.innerText = 'X';
  btn.className = 'deleteBtn';

  btn.onclick = () => {deleteTodo(id)}

  //joining all btn, list to a single todo


  todo.append(checkBox, paragraph, btn);
  noTodoPara.setAttribute('display', 'none')
  todoContainer.append(todo);

}


const renderTodos = (todos : Todo[]) => {
  todoContainer.innerText = "";
    todos.forEach((item) => {
      generateTodoItem(item.title, item.isCompleted, item.id);
    
    
    })

    localStorage.setItem('todos', JSON.stringify(todos))

}



let todos: Todo[]  =[];
const storedTodos = localStorage.getItem('todos');
if(storedTodos){
  todos = JSON.parse(storedTodos);
  renderTodos(todos);
  console.log(todos)
}


if(myFrom){ 
  myFrom.onsubmit=(e:SubmitEvent) => {
    e.preventDefault(); 
    const todo:Todo = {
      title :todoInput.value,
      isCompleted:false,
      id:String(Math.random()*1000),
    }
    todos.push(todo);

    todoInput.value = "";

    renderTodos(todos);
  } 
}

const deleteTodo = (id:string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodos(todos)
}
