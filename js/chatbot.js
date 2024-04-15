import taskData from "./taskData.js";

// 전역변수 정의
// const $callyResponse = document.getElementById("callyResponse");
const $input = document.getElementById("input");
const $arrow = document.getElementById("arrow");

const $response = document.getElementById("response");
const $close = document.getElementById("close");
const $chatbotContainer = document.getElementById("chatbot-container");

const $chatPart = document.getElementById("chatPart");
const $option = $chatPart.querySelector("li");

var dateObject = {};
var titleByUserViaInput = ``;
var categoryViaChat = '';


// 함수 정의
$close.addEventListener('click', (e)=>{
    $chatbotContainer.classList.remove('is-active');
});

//==================== 날짜 입력받는 폼 =============//

let count = 0;
function getDateFromUser(buttonText) {
    // 날짜를 입력받을 폼 생성
    const $dateForm = document.createElement("div");
    $dateForm.classList.add("callyResponse");

    count++;
    $dateForm.innerHTML = `
    <p class="input_wrap">
    ${buttonText}을 도와드리겠습니다. <br> 원하는 날짜를 선택해주세요: <br>
    <input type="date" id="date_input_chatbot_${count}" />
    <input type="time" id="time_input_chatbot_${count}" />
    <button id="confirm">확인</button>
    </p>`;

    $response.append($dateForm);

    const $confirmButton = document.getElementById("confirm");
    $confirmButton.addEventListener("click", handleConfirmButtonClick);
    // console.log(dateObject);
    return dateObject;
}
//done~
// -=========최근 데이터 불러오기 ============//
function getRecentData(dateObject) {
    let targetIndex = -1;
    // console.log(dateObject);
    // console.log("inputvalue =", JSON.stringify(dateObject));

    const { year, month, day, hour, minute } = dateObject;

    for (let index = 0; index < taskData.length; index++) {
        const { year: Eyear, month: Emonth, day: Eday } = taskData[index].date;
        if (
            year === Eyear &&
            month === Emonth &&
            parseInt(day) === parseInt(Eday)
        ) {
            targetIndex = index;
            console.log("targetIndex", targetIndex);
            break; // 해당 날짜를 찾았으므로 반복문 종료
        }
    }

    let recentData = [];
    if (targetIndex > -1) {
        // 타겟 인덱스가 0보다 큰 경우에만 처리
        if(targetIndex <= 3){
            for (let i = 0; i <= targetIndex; i++) {
                recentData.push(taskData[i]);
            }
        }
        else {
            for (let i = targetIndex-2; i < targetIndex+3; i++) {
                recentData.push(taskData[i]);
            }
        }
    }
    return { targetIndex, recentData };
}

// =================객체형태로 반환 ================//
function handleConfirmButtonClick() {
    // 날짜
    const $dateInput = document.getElementById(`date_input_chatbot_${count}`);
    // 사용자가 입력한 날짜와 시간 가져오기
    const date = new Date($dateInput.value);
    const dateSet = {
        year: String(date.getFullYear()),
        month: String(date.getMonth() + 1).padStart(2, "0"),
        day: String(date.getDate()).padStart(2, "0"),
    };
    // 시간
    const $timeInput = document.getElementById(`time_input_chatbot_${count}`);
    const timeSet = $timeInput.value;
    const [hour, minute] = timeSet.split(":");
    const { year, month, day } = dateSet;

    dateObject.year = year;
    dateObject.month = month;
    dateObject.day = day;

    dateObject.hour = hour;
    dateObject.minute = minute;

    console.log(dateObject);
    return dateObject;
}

//===================== 1. scehdule checker=============//


// 스케줄 체크하는 애 최근 애들 검색~
// done~~
function checkSchedule({ targetIndex, recentData }) {
    // // userDate를 보냄
    // console.log(targetIndex);
    if (targetIndex === -1) {
        const $noneTodoTitle = document.createElement("div");
        $noneTodoTitle.classList.add("callyResponse");
        $noneTodoTitle.textContent = "해당 날짜에는 일정이 없습니다!";
        $response.appendChild($noneTodoTitle);
        return;
    }
    // li 묶음을 #callyResponse에 추가
    var $checkedTodoLi = document.createElement("div");
    for (let i = 0; i < recentData.length; i++) {
        for (let j = 0; j < recentData[i].todoList.length; j++) {
            let $checkedTodoLiTitle = document.createElement("div");
            let recentDate = recentData[i].date.day;
            let recentMonth = recentData[i].date.month;
            let recentTitle = recentData[i].todoList[j].title;
            // 객체에 넣어서 올릴까

            $checkedTodoLiTitle.innerHTML = `<br>${recentMonth}월 ${recentDate}일: ${recentTitle}`;
            $checkedTodoLi.appendChild($checkedTodoLiTitle);
            $checkedTodoLi.id = `recentTodoTitleChecked${i}`;
        }
    }
    $checkedTodoLi.classList.add("callyResponse");
    $response.appendChild($checkedTodoLi);
}


//===================2. 스케줄 추가 ================//
function getUserInputTitle() {
    const $categoryOptions = document.getElementById('categoryOptions');
    const $Cbuttons = $categoryOptions.querySelectorAll('button');

    // 각 버튼에 대해 클릭 이벤트를 추가합니다.
    $Cbuttons.forEach($button => {
        $button.addEventListener('click', () => {
            const $askTitle = document.createElement('div');
            $askTitle.classList.add('callyResponse');
            $askTitle.innerHTML = '추가하고 싶은 일의 제목을 채팅으로 보내주세요.<br>캘리가 자동으로 캘린더에 추가해드릴게요;)';
            $response.appendChild($askTitle);


            $input.addEventListener('submit', (e)=>{
                e.preventDefault();
                titleByUserViaInput = $input.querySelector('input').value;
                
            });
            $arrow.addEventListener('click', (e) =>{
                e.preventDefault();
                titleByUserViaInput = $input.querySelector('input').value;

            });
        });
    });
}

// 채팅에서 새로운 스케줄 추가
function returnCheckedCateogry(){
    // 받은 날짜, 년도, month가 해당되는 날짜 객체 가져오기
    const $todo_list = document.createElement("div");
    $todo_list.innerHTML = `<div>
                                    <div>어떤 일을 추가하고 싶으신가요? <br>(일의 카테고리를 먼저 선택해주세요!)</div>
                                    <p id="categoryOptions">
                                        <label>
                                        <button id="task">일</button>                              
                                        </label>
                                        <label>
                                        <button id="exercise">운동</button>
                                        </label>
                                        <label>
                                        <button id="rest">휴식</button>
                                        </label>
                                    </p>
                                </div>`;

    $todo_list.classList.add("callyResponse");
    $response.appendChild($todo_list);

    const $categoryOptions = document.getElementById('categoryOptions');
    const $buttons = $categoryOptions.querySelectorAll('button');

    $buttons.forEach($button => {
        $button.addEventListener('click', () => {
            // 클릭된 버튼에 'checkedCt' 클래스 추가
            $buttons.forEach(btn => btn.classList.remove('checkedCt'));
            categoryViaChat = $button.textContent;
        });
    });
}
    
// 채팅에서 새로운 스케줄 추가
function addNewTodoViaChat(dateObject) {
    returnCheckedCateogry();
    getUserInputTitle(); // 카테고리 선택 이벤트 설정

    // '확인' 버튼 클릭 시
    const $confirmButton = document.getElementById("confirm");
    $confirmButton.addEventListener("click", () => {
        // const category = document.querySelector('.checkedCt').textContent;
        // const title = document.getElementById('input').value;
        
        // 입력 받은 값이 유효한지 확인
        if (!categoryViaChat || !titleByUserViaInput) {
            console.error('카테고리와 제목을 선택해주세요.');
            const $valueOfUserInput = document.createElement("div");
            $valueOfUserInput.classList.add("callyResponse");
            $valueOfUserInput.innerHTML = `카테고리와 제목을 입력해주세요`;
            $response.appendChild($valueOfUserInput);
            return;
        }

        // 입력값을 이용하여 일정 추가
        const { year, month, day, hour, minute } = dateObject;
        const targetDateObject = taskData.find(item => 
            item.date.year === year &&
            item.date.month === month &&
            item.date.day === day
        );

        if (targetDateObject) {
            // 입력 받은 날짜에 이미 일정이 있는 경우
            targetDateObject.todoList.push({
                time: `${hour}:${minute}`,
                title: titleByUserViaInput,
                category: categoryViaChat,
            });
        } else {
            // 입력 받은 날짜에 일정이 없는 경우
            const newTodo = {
                id: taskData.length + 1,
                date: {
                    year: year,
                    month: month,
                    day: day
                },
                todoList: [
                    {
                        time: `${hour}:${minute}`,
                        title: titleByUserViaInput,
                        category: categoryViaChat,
                    },
                ]
            };
            taskData.push(newTodo);
        }

        const $valueOfUserInput = document.createElement("div");
        $valueOfUserInput.classList.add("callyResponse");
        $valueOfUserInput.innerHTML = `해당 일에 ${titleByUserViaInput} 일정을 추가할게요!`;
        $response.appendChild($valueOfUserInput);

        console.log('일정이 추가되었습니다.');
    });
}



// ===============챗봇 추천 파트==================//
function getRecentCategory(dateObject){
    const { year, month } = dateObject;
    const recentCategory = [];

    for (let i = 0; i < taskData.length; i++) {
        const { date, todoList } = taskData[i];
        const { year: taskYear, month: taskMonth } = date;

        // 입력받은 날짜의 연도와 월이 해당 taskData의 연도와 월과 같으면 카테고리를 추가
        if (year === taskYear && month === taskMonth) {
            for (let j = 0; j < todoList.length; j++) {
                recentCategory.push(todoList[j].category);
            }
        }
    }

    return recentCategory;
}

// 최근동안 어떠한 일을 적게 했는지 알아봄
function checkRecentMinWork(recentCategory) {
    let workCount = 0;
    let exerciseCount = 0;
    let restCount = 0;

    recentCategory.forEach((todo) => {
        if (todo === "일") {
            workCount++;
        } else if (todo === "운동") {
            exerciseCount++;
        } else if (todo === "휴식") {
            restCount++;
        }
    });

    const min = Math.min(workCount, exerciseCount, restCount);
    let minV = "휴식";
    if (min === exerciseCount) {
        minV = "운동";
    }
    if (min === workCount) {
        minV = "일";
    }
    const $recommendation = document.createElement("div");
    $recommendation.innerHTML = `최근동안 가장 적게 활동한 ${minV}을 해보시는 건 어떨까요?
                                <div id = confirmBtnRecommend> 
                                <button id="likeBtn">좋아요</button> 
                                <button id="disBtn">실어요</button>
                                </div> `;
    $recommendation.classList.add("callyResponse");
    $response.appendChild($recommendation);

    const $likeBtn = document.getElementById("likeBtn");
    const $disBtn = document.getElementById("disBtn");

    console.log($likeBtn);

    // 좋아요 버튼 클릭 시
    $likeBtn.addEventListener("click", () => {
    
            const $Need = document.createElement("div");
            $Need.classList.add("callyResponse");
            $Need.innerHTML = `카테고리가 정해졌으니 연관된 일을 캘린더에 추가해보세요 ;)`;
            $response.appendChild($Need);
        
    });

    // 싫어요 버튼 클릭 시
    $disBtn.addEventListener("click", () => {
        
            const $noNeed = document.createElement("div");
            $noNeed.classList.add("callyResponse");
            $noNeed.innerHTML = `필요 없으시군요! 그럼 다음에 이용해보세요 ;)`;
            $response.appendChild($noNeed);
        
    });

}








// ========================4. 사용자가 궁금한 사항 직접 입력함 ====================//
function customByUser(buttonText) {
    // 아직 지원하지 않는 기능입니다.
    const $notYet = document.createElement("div");
    $notYet.innerHTML = `${buttonText}은 <br>현재 지원하지 않는 기능입니다. <br>업데이트 예정입니다. <br> '처음으로' 입력 시 처음 메뉴로 돌아갑니다.`;
    $notYet.classList.add("callyResponse");
    $response.appendChild($notYet);
}

function backToFirst(){
    $input.addEventListener('submit', (e)=>{
        e.preventDefault();
        const inputInit = $input.querySelector('input').textContent;
        if(inputInit === '처음으로' || inputInit === '메뉴');
        $response.innerHTML = '';
    });
    $arrow.addEventListener('click', (e) =>{
        const inputInit = $input.querySelector('input').textContent;
        if(inputInit === '처음으로' || inputInit === '메뉴');
        $response.innerHTML = '';
    });
}


// =============== 5. 처음으로 입력 ===============//

// =================== 함수실행==================//
    $chatPart.addEventListener("click", (e) => {
    // Check if the clicked element is a <button> tag
    const $clicked = e.target.closest("li");
    
    if ($clicked) {
        // Retrieve the text content of the clicked <button> tag
        const buttonText = e.target.textContent.trim();
        // Perform different actions based on the text content
        switch (buttonText) {
            case "일정 조회":
                getDateFromUser(buttonText);
                // Wait for user confirmation and then get the updated dateObject
                const $confirmButton1 = document.getElementById("confirm");
                $confirmButton1.addEventListener("click", () => {
                    const updatedDateObject = handleConfirmButtonClick();
                    // Use the updated dateObject to get recent data
                    const { targetIndex, recentData } =
                        getRecentData(updatedDateObject);
                    const min = checkSchedule({ targetIndex, recentData });
                    console.log(min);
                });
                break;
            // case "2. 일정 추가":
            //     // console.log(e.target);

            //     getDateFromUser(buttonText);
            //     const $confirmButton2 = document.getElementById("confirm");
            //     $confirmButton2.addEventListener("click", () => {
            //         const dateObject = handleConfirmButtonClick();
            //         console.log(`hihi`,dateObject);

            //         addNewTodoViaChat(dateObject);
            //     });
            //     break;
            case "일정 추천":
                getDateFromUser(buttonText);
                const $confirmButton3 = document.getElementById("confirm");
                $confirmButton3.addEventListener("click", () => {
                disableButtonsExcept($clicked);

                    const updatedDateObject3 = handleConfirmButtonClick();
                    const recentCategory = getRecentCategory(updatedDateObject3);
                    checkRecentMinWork(recentCategory);
                });
                break;
            case "직접 입력":
                customByUser(buttonText);
                backToFirst();
                break;
            case "처음으로 이동":
                $response.innerHTML = '';
                break;
            default:
                showFirstChat();
                break;
        }
    }
})


function returnNewTodo() {
    const newTodo = $input.querySelector("input").value;

    // 저장해둔 input 값을 채팅 li에 추가
    const $newResponse = document.createElement("li");
    $newResponse.textContent = newTodo;
    $response.appendChild($newResponse);
    
    
    $input.querySelector("input").value = "";

}


$input.addEventListener("input", handleInputEvent);

function handleInputEvent(e) {
    const trimedInput = e.target.value.trim();
    if (trimedInput !== "") {
        $arrow.classList.remove("hidden");
    }
}

$input.parentElement.addEventListener("submit", handleSubmitEvent);

function handleSubmitEvent(e) {
    e.preventDefault();
    returnNewTodo();
}

$arrow.addEventListener("click", handleClickEvent);

function handleClickEvent(e) {
    e.preventDefault();
    returnNewTodo();
}

$input.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputInit = $input.querySelector('input').textContent;
    if(inputInit === '처음으로' || inputInit === '메뉴');
    $response.innerHTML = '';
});
$arrow.addEventListener('click', (e) =>{
    const inputInit = $input.querySelector('input').textContent;
    if(inputInit === '처음으로' || inputInit === '메뉴');
    $response.innerHTML = '';
});

// 다른 버튼들을 비활성화하는 함수
function disableButtonsExcept($clicked) {
    $chatPart.querySelectorAll("li").forEach($button => {
        if ($button !== $clicked) {
            $button.removeEventListener("click", handleClickEvent);
            // 시각적으로 비활성화 상태를 나타내기 위한 스타일 변경
            $button.classList.add("disabled");
        }
    });
}

// 입력란을 수정할 수 없도록 하는 함수
function disableInput() {
    $input.querySelector("input").setAttribute("disabled", "true");
}

// 입력란을 수정할 수 있도록 하는 함수
function enableInput() {
    $input.querySelector("input").removeAttribute("disabled");
}