//모든 드래그가 가능한 li class들 선택
let dragList = document.querySelectorAll('.list');
let list = document.getElementsByTagName('li');

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

            localStorage.setItem('toDoList', JSON.stringify(itemsArray));

        }
    });


    //새로운 list 배열 만들기
    const newArrays = Array.from(document.querySelectorAll('.list')).map(list => {
        const span = list.getElementsByTagName('span');
        return {
            text: span.innerText,
            id: list.id
        }

    });

    localStorage.setItem('toDoList', JSON.stringify(newArrays));


    //소스트리 테스트

});