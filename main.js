const toDoForm = document.getElementById('to-do-form');
const toDoInput = document.getElementById('to-do-input');
const toDoGroup = document.getElementById('to-do-group');


//localstorage에 저장되는 list value의 배열
let TODOS = [];




//localstorage에 저장하는 함수
function saveTodo(){
    localStorage.setItem('toDoList', JSON.stringify(TODOS));
    // console.log('로컬스토리지에 저장됨');
}


//list 그리는 함수
function paintTodo(text){
    const newTodo = document.createElement('li');
    const delBtn = document.createElement('button');

    newTodo.innerText = text;
    toDoGroup.appendChild(newTodo);

    const newId = TODOS.length+1;
    newTodo.id = newId; //li의 id값

    const item = {
        text: text,
        id: newId
    }

    TODOS.push(item);

    newTodo.appendChild(delBtn);
    delBtn.innerText = 'X';
    

    delBtn.addEventListener('click', () => {
        newTodo.remove();
        console.log('!!! remove !!!');
    });

}





//todolist 작성하는 input submit 함수
function toDoSubmit(event){
    event.preventDefault();

    const newTodoValue = toDoInput.value;
    
    if(newTodoValue !== ''){
        paintTodo(newTodoValue); //새로 생기는 list가 빈 값으로 들어오는 이슈 > input.value값 인자 누락 = newTodoValue
        toDoInput.value = '';
    }
    console.log(newTodoValue);

    saveTodo();

    
}


function loadTodo(){
    const data = localStorage.getItem(TODOS); //로컬스토리지에서 투두리스트 목록 가져와서 변수 선언

    if(data !== null){ //만약에 위 변수가 빈 값이 아니라면
        const parseTodo = JSON.parse(data); //위 변수를 다시 문자열로 가져와서 변수 선언
        parseTodo.forEach(item => { //위 변수에 반복해서 paintTodo 함수를 호출
            paintTodo(item);
        })
    } else { //변수가 빈 값이면
        console.log(JSON.parse(data)); //콘솔
    }
}



function init(){
    toDoForm.addEventListener('submit', toDoSubmit);
    console.log('!!! init !!!');
}



loadTodo();

init();