let form = document.getElementById('addForm');
let list = document.getElementById('todo-list');
let doneList = document.getElementById('done-list');
let filter = document.getElementById('filter');
let body = document.querySelector('body');


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

    li.className = 'list-group-item fs-3';

    li.appendChild(document.createTextNode(newTodo));

    let span = document.createElement('span');
    let deleteIcon = document.createElement('i');
    let doneIcon = document.createElement('i');

    deleteIcon.className = 'fa-solid fa-square-xmark delete me-2 fs-2';
    doneIcon.className = 'fa-solid fa-square-check done fs-2'

    span.appendChild(deleteIcon);
    span.appendChild(doneIcon);

    li.appendChild(span);

    

    if(newTodo.length && char_count(newTodo, " ") !== newTodo.length){
        list.appendChild(li);
        form.reset();
    }else{
        // alert('Please don"t leave the input empty');
        let toastDiv = document.createElement('div');
        toastDiv.className = 'toast';
        toastDiv.setAttribute('role', 'alert');
        toastDiv.setAttribute('aria-live', 'assertive');
        toastDiv.setAttribute('id','warning');
        toastDiv.setAttribute('aria-atomic', 'true');

        let toastBody = document.createElement('div');
        toastDiv.className = 'toast-body text-center rounded-3';
        toastBody.textContent= "Please don't leave the input empty";

        let buttonDOM = document.createElement('div')
        buttonDOM.className = 'button'

        let buttonOk = document.createElement('button');
        buttonOk.className = 'ok mt-2';
        buttonOk.textContent = 'OK';
        
        toastDiv.appendChild(toastBody);
        buttonDOM.appendChild(buttonOk);
        toastDiv.appendChild(buttonDOM);  

        let body = document.body;
        body.appendChild(toastDiv);

        let toast = new bootstrap.Toast(toastDiv);
        toast.show();
        
        toastDiv.addEventListener('click', warningFunction);

        function warningFunction(e) {
            if(e.target.classList.contains('ok')) {
                toastDiv.remove();
            } else 
                toastDiv.remove(); 
        }    
    }
    
}

function removeandDoneTodo(e) {
    if(e.target.classList.contains('delete')){
        let li = e.target.parentElement.parentElement;

        let toastDiv = document.createElement('div');
        toastDiv.className = 'toast';
        toastDiv.setAttribute('role', 'alert');
        toastDiv.setAttribute('aria-live', 'assertive');
        toastDiv.setAttribute('id','confirmation');
        toastDiv.setAttribute('aria-atomic', 'true');

        let toastBody = document.createElement('div');
        toastDiv.className = 'toast-body text-center rounded-3';
        toastBody.textContent= 'Are you sure?';

        let buttonsDOM = document.createElement('div');
        buttonsDOM.className = 'buttons';
        buttonsDOM.setAttribute('id', 'buttons');

        let buttonYes = document.createElement('button');
        buttonYes.className = 'yes mt-2';
        buttonYes.textContent = 'Yes';

        let buttonNo = document.createElement('button');
        buttonNo.className = 'no mt-2';
        buttonNo.textContent = 'No';

        toastDiv.appendChild(toastBody);
        toastDiv.appendChild(buttonsDOM);
        buttonsDOM.appendChild(buttonYes);
        buttonsDOM.appendChild(buttonNo);
        
        let body = document.body;
        body.appendChild(toastDiv);

        toastDiv.addEventListener('click', confirmationFunction);

        function confirmationFunction(e) {
            if(e.target.classList.contains('yes')){
                list.removeChild(li);
                toastDiv.remove();
            }else{
                toastDiv.remove();
            }
        }
    
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
        let toastDiv = document.createElement('div');
        toastDiv.className = 'toast';
        toastDiv.setAttribute('role', 'alert');
        toastDiv.setAttribute('aria-live', 'assertive');
        toastDiv.setAttribute('id','confirmation');
        toastDiv.setAttribute('aria-atomic', 'true');

        let toastBody = document.createElement('div');
        toastDiv.className = 'toast-body text-center rounded-3';
        toastBody.textContent= 'Are you sure?';

        let buttonsDOM = document.createElement('div');
        buttonsDOM.className = 'buttons';
        buttonsDOM.setAttribute('id', 'buttons');

        let buttonYes = document.createElement('button');
        buttonYes.className = 'yes mt-2';
        buttonYes.textContent = 'Yes';

        let buttonNo = document.createElement('button');
        buttonNo.className = 'no mt-2';
        buttonNo.textContent = 'No';

        toastDiv.appendChild(toastBody);
        toastDiv.appendChild(buttonsDOM);
        buttonsDOM.appendChild(buttonYes);
        buttonsDOM.appendChild(buttonNo);
        
        let body = document.body;
        body.appendChild(toastDiv);

        let toast = new bootstrap.Toast(toastDiv);
        toast.show();

        console.log(toast);

        toastDiv.addEventListener('click', confirmationFunction);

        function confirmationFunction(e) {
            if(e.target.classList.contains('yes')){
                doneList.removeChild(li); 
                toastDiv.remove();
            }else{
                toastDiv.remove();
            }
        }


    }
}

function filterTodo(e){
    // convert text to lowercase
    let text = e.target.value.toLowerCase();
    // Get list items
    let todos = body.getElementsByTagName('li');

    // CONVERT TO AN ARRAY
    Array.from(todos).forEach(function(todo){
        let todoName = todo.firstChild.textContent;
        if(todoName.toLowerCase().indexOf(text) != -1){
            todo.style.display = '';
        }else {
            todo.style.display = 'none';
        }
    })
}

