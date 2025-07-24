const toDoForm = document.getElementById('to-do-form');
const toDoInput = document.getElementById('to-do-input');
const toDoGroup = document.getElementById('to-do-group');


//localstorage에 저장되는 list value의 배열
let TODOS = [];







//list 그리는 함수
function paintTodo(item){ 
    const newTodo = document.createElement('li');
    const newSpan = document.createElement('span');
    const delBtn = document.createElement('button');


    newSpan.innerText = item.text;
    newTodo.id = item.id;

    toDoGroup.appendChild(newTodo);
    newTodo.appendChild(newSpan);
    newTodo.appendChild(delBtn);

    newTodo.setAttribute('draggable', true);
    newTodo.classList.add('list');

    // const newId = Date.now();
    const newId = TODOS.length + 1;
    newTodo.id = newId;

    
    //로컬스토리지 키값
    const toDoObj = {
        text: item.text,
        id: newId
    }

    TODOS.push(toDoObj);
    saveTodo();


    delBtn.classList.add('del');
    delBtn.innerText = 'X';

    delBtn.addEventListener('click', removeTodo);

    // console.log(toDoObj);
    // console.log('로컬: ' + item.text)
    
}


//list & localStorage 삭제하는 함수
function removeTodo(event){
    const li = event.target.parentNode;
    li.remove();
    TODOS = TODOS.filter((toDo) => { 
        return toDo.id !== parseInt(li.id);
    });

    saveTodo();
}



//todolist 작성하는 input submit 함수
function toDoSubmit(event){
    event.preventDefault();

    const newTodoValue = toDoInput.value;
    
    if(newTodoValue !== ''){
        const newItem = {
            text: newTodoValue,
            id: Date.now()
        }
        paintTodo(newItem);
        toDoInput.value = '';
    }
    // console.log(newTodoValue);
    saveTodo();

    
}

//localstorage에 저장하는 함수, JSON 형태로 문자화 시켜서 저장
function saveTodo(){
    localStorage.setItem('toDoList', JSON.stringify(TODOS));
    // console.log('로컬스토리지에 저장됨');
}

//새로고침해도 이전에 작성된 list & localStorage 값 유지
function loadTodo(){
    const parseTodo = JSON.parse(localStorage.getItem('toDoList'));

    if(parseTodo){
        parseTodo.forEach(item => { 
            paintTodo((item));
            //paintTodo(parseInt(item)); > 새로고침 시, span = undefineded & localstorage도 변경됨
            //parseInt > item 객체가 아닌 숫자열로 불러와서 오류
        })
    } else {
        console.log('~~~ empty ~~~');
    }
}


                //모든 드래그가 가능한 li class들 선택
                let dragList = document.querySelectorAll('.list');
                // let list = document.getElementsByTagName('li');

                //현재 드래그 중인 li를 저장하기 위한 변수 선언하기
                let draggedState = null;

                //드래그를 시작하는 이벤트 핸들러 정의하기
                dragList.forEach(draggable => {
                    draggable.addEventListener('dragstart', (e) => {
                        draggedState = draggable;
                        setTimeout(() => {
                            draggable.style.display = 'none';
                        }, 0);
                    });

                    //드래그 끝날 때의 이벤트 핸들러 정의하기
                    draggable.addEventListener('dragend', () => {
                        setTimeout(() => {
                            draggedState.style.display = 'flex';
                            draggedState = null;
                        }, 0);
                    });

                    //드래그 list가 다른 list 위로 올라왔을 때의 이벤트 핸들러 정의하기
                    draggable.addEventListener('dragover', (e) => {
                        e.preventDefault();
                    });

                    //드래그 list가 다른 list 안으로 들어갔을 때의 이벤트 핸들러 정의하기
                    draggable.addEventListener('dragenter', (e) => {
                        e.preventDefault();
                        draggable.classList.add('drag-over');
                    });

                    //드래그 list가 다른 list를 떠날 때의 이벤트 핸들러 정의하기
                    draggable.addEventListener('dragleave', () => {
                        draggable.classList.remove('drag-over');
                    });

                    //drop event
                    draggable.addEventListener('drop', (item) => {
                        draggable.classList.remove('drag-over');

                        if(draggedState !== null) {
                            //드래그 중인 list와 현재 드래그가 놓인 list의 위치 바꾸기
                            const container = document.getElementById('to-do-group'); //ul
                            const allDraggables = Array.from(container.querySelectorAll('.list')); //container dom 요소 안에서 리스트들을 모두 찾아 배열화
                            const currentPos = allDraggables.indexOf(draggable);
                            const draggedPos = allDraggables.indexOf(draggedState);


                            let items = localStorage.getItem('toDoList');
                            let itemsArray = items ? JSON.parse(items) : []; //로컬스토리지에 값이 있는지 확인, 없으면 빈 배열


                            if (currentPos < draggedPos) { //현재 인덱스보다 드래그하는 list의 인덱스가 더 클 때
                                container.insertBefore(draggedState, draggable);

                            } else {
                                container.insertBefore(draggedState, draggable.nextSibling);
                            }

                            // localStorage.setItem('toDoList', JSON.stringify(itemsArray));
                        }

                        //새로운 list 배열 만들기
                        let list = document.getElementsByTagName('li');

                        const newArrays = Array.from(document.querySelectorAll('.list')).map(list => {
                            const span = list.getElementsByTagName('span');
                            return {
                                text: span.innerText,
                                id: list.id
                            }

                        });

                        localStorage.setItem('toDoList', JSON.stringify(newArrays));

                        saveTodo();
                        console.log(newArrays);
                    });


                });


//초기값
function init(){
    loadTodo();
    toDoForm.addEventListener('submit', toDoSubmit);
}




init();