import taskData from "./taskData.js";
import getCategory from "./getCategory.js";
import createTaskLi from "./detailListCreateLi.js";
import { selectedDay, $taskList, setListNull } from "./detailList.js";

// 추가 버튼

// 추가 버튼
const $addTaskBtn = document.getElementById("add_task");
const $addTaskModal = document.getElementById("add_task_modal");
const $addTaskModalCloseBtn = $addTaskModal.querySelector(".close_btn");
const $addTaskModalSubmitBtn = $addTaskModal.querySelector(".check_btn");

const $addTaskByUserBtn = document.getElementById("add_task_by_user");
const $categoryInputs = document.querySelectorAll(
  'input[type="radio"][name="category"]'
);

// 일정 추가 모달 활성화
[$addTaskByUserBtn, $addTaskBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    $addTaskModal.classList.add("is-active");
  });
});
// 일정 추가 모달 비활성화
$addTaskModalCloseBtn.addEventListener("click", () => {
  setModalInitaial();
  setNow();
});
function setModalInitaial() {
  $addTaskModal.classList.remove("is-active");
  $addTaskModal.querySelector(".add_task-head > input").value = "";
  $categoryInputs.forEach((input) => {
    input.checked = false;
  });
  $addTaskModal.classList.remove("task", "rest", "exercise");
}

$categoryInputs.forEach(($input) => {
  $input.addEventListener("click", () => {
    if ($input.checked) {
      const className = $input.id;
      console.log(className);
      $addTaskModal.classList.remove("rest", "task", "exercise");
      $addTaskModal.classList.add(className);
    }
  });
});

// 추가모달의 날짜/시간 인풋
const $dateInput = document.getElementById("date_input");
const $timeInput = document.getElementById("time_input");

function setNow() {
  // 현재 날짜와 시간을 가져와서 초깃값 설정
  const now = new Date();

  $dateInput.value = now.toISOString().slice(0, 10);
  $timeInput.value = now.toISOString().slice(11, 16);
}

setNow();

// 추가 확인 버튼 클릭시
$addTaskModalSubmitBtn.addEventListener("click", () => {
  const title = $addTaskModal.querySelector(".add_task-head input").value;

  console.log("addBtn:",selectedDay);

  // category
  let category = getCategory($addTaskModal);
  if (!category) {
    alert("분류를 선택해주세요");
    return;
  }

  // 날짜
  const date = new Date($dateInput.value);
  console.log("date:"+date);

  const dateSet = {
    year: String(date.getFullYear()),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
  };
  const { year, month, day } = dateSet;
  console.log(year, month, day);
  // 시간
  const time = $timeInput.value;
  const [hour, minute] = time.split(":");

  // 같은 날짜의 데이터 찾기
  let matchedDayTaskData = false;
  matchedDayTaskData = taskData.find((task) => year === task.date.year && month === task.date.month && day === task.date.day);
  console.log('matching: ',matchedDayTaskData);

  const newTodoList = {
    time: `${hour}:${minute}`,
    title,
    category,
  };

  // 데이터 푸시
  if (matchedDayTaskData) {
    console.log('있');
 
    matchedDayTaskData.todoList.push(newTodoList);


  } else {
    console.log('없');
    // 같은 날짜의 데이터가 없다면
    const newTaskData = {
      id: taskData.length + 1,
      date: {
        year,
        month,
        day,
      },
      todoList: [newTodoList],
    };
    taskData.push(newTaskData);


  }
  // // 현재 선택된 날짜의 투두 리스트 추가시 ui 추가
  // console.log("sd:", selectedDay);
  $taskList.append(createTaskLi(newTodoList));
  // if (dateSet)
  // console.log(createTaskLi(newTodoList));
  setModalInitaial();
  const $nothingLi = document.querySelector(
    "#task_list .task_list-item-nothing"
  );
  if ($nothingLi){
    $nothingLi.style.display = "none";

  }
  // setListNull()
  // $addTaskModal.classList.remove("is-active");

  // console.log(taskData);
});
export {setModalInitaial,$addTaskModal}