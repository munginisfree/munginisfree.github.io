import taskData from "./taskData.js";
import createTaskLi from "./detailListCreateLi.js";

const $calendarDates = [...document.querySelectorAll("#calendarMain .date")];
const $taskModal = document.getElementById("task_modal");
let selctedDateData = null;
let selectedDay = null;

$calendarDates.forEach(($date) => {
  $date.addEventListener("click", (e) => {

    if (!e.target.closest('.date')) return;
    e.stopPropagation()

    const target = e.target;
    console.log('target :',target);

    selctedDateData = getDateDatas(target);
    // console.log("selctedDateData:", selctedDateData);
    $taskModal.classList.add("is-active");

    if (selctedDateData) {
      selectedDay = taskData.find((task) => {
        return (
          task.date.month === selctedDateData.month &&
          task.date.day === selctedDateData.day
        );
      });
      console.log("selectedDay =" + JSON.stringify(selectedDay));
      // h3 설정
      const $h3Date = document.getElementById("h2Date");
      $h3Date.innerHTML = `${selctedDateData.month}월 ${selctedDateData.day}일`;

      setListNull();
    }
  });
});

function getDateDatas(target) {
  return {
    year: target.dataset.year,
    month: target.dataset.month,
    day: target.dataset.day,
  };
}

// 캘린더에서 받아 온 선택된 날짜 == 수정 요함
const $taskList = document.getElementById("task_list");
function setListNull() {
  const $nothingLi = document.querySelector(
    "#task_list .task_list-item-nothing"
  );

const $listItmes = document.querySelectorAll('#task_list .task_list-item')

  if ($listItmes){
    $listItmes.forEach($item=>{$item.remove()})
  }
  if (taskData.includes(selectedDay)) {
    // 해당 날짜에 일정이 있는 경우 ui
    $nothingLi.style.display = "none";
    addList();
  } else {
    // 해당 날짜에 일정이 없는 경우 ui
    $nothingLi.style.display = "flex";
  }
}
// 리스트 추가 메서드
function addList() {
 
  if (selectedDay) {
    selectedDay.todoList.forEach((task) => {
      $taskList.append(createTaskLi(task));
    });
  }
}
const $detailTaskModalCloseBtn = document.querySelector('.task_modal-head .close_btn')

$detailTaskModalCloseBtn.addEventListener('click',function(){
  $taskModal.classList.remove('is-active')
})
export { selectedDay, $taskList, setListNull };
