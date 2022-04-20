let form = document.getElementById('addForm');
let list = document.getElementById('todo-list');
let doneList = document.getElementById('done-list');
let filter = document.getElementById('filter');


form.addEventListener('submit', addTodo);
list.addEventListener('click', removeandDoneTodo);
doneList.addEventListener('click', removeTodo);
filter.addEventListener('keyup', filterTodo);

function char_count(str, letter) 
{
 var letter_Count = 0;
 for (var position = 0; position < str.length; position++) 
 {
    if (str.charAt(position) == letter) 
      {
      letter_Count += 1;
      }
  }
  return letter_Count;
}


function addTodo(e) {
    e.preventDefault();

    let newTodo = document.getElementById('new-todo').value;

    let li = document.createElement('li');

    li.className = 'list-group-item d-flex justify-content-between align-items-center fs-3';

    li.appendChild(document.createTextNode(newTodo));

    let span = document.createElement('span');
    let deleteIcon = document.createElement('i');
    let doneIcon = document.createElement('i');

    deleteIcon.className = 'fa-solid fa-square-xmark delete text-danger me-2 fs-2';
    doneIcon.className = 'fa-solid fa-square-check done text-success fs-2'

    span.appendChild(deleteIcon);
    span.appendChild(doneIcon);

    li.appendChild(span);

    if(newTodo.length && char_count(newTodo, " ") !== newTodo.length){
        list.appendChild(li);
    }else{
        alert('Please don"t leave the input empty');
    }
    
}

function removeandDoneTodo(e) {
    if(e.target.classList.contains('delete')){
        let li = e.target.parentElement.parentElement;
        list.removeChild(li);
    }else if(e.target.classList.contains('done')){
        let li = e.target.parentElement.parentElement;
        let span = e.target.parentElement;
        let doneList = document.getElementById('done-list');
        // let doneIcon = document.querySelector('.done');

        let liDone = span.removeChild(e.target)
        
        doneList.appendChild(li);
    }    
}

function removeTodo(e){
    if(e.target.classList.contains('delete')){
        let li = e.target.parentElement.parentElement;
        doneList.removeChild(li);
    }
}

function filterTodo(e){
    // convert text to lowercase
    let text = e.target.value.toLowerCase();
    // Get list items
    let todos = list.getElementsByTagName('li');

    // CONVERT TO AN ARRAY
    Array.from(todos).forEach(function(todo){
        let todoName = todo.firstChild.textContent;
        if(todoName.toLowerCase().indexOf(text) != -1){
            todo.style.display = 'flex';
            console.log('+')
        }else {
            todo.style.display = 'none';
            console.log('-')
        }
    })
}