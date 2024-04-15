import taskData from "./taskData.js";

const date = new Date();
// import taskData from './taskData.js';

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector(".yearMonth").textContent = `${viewYear}. ${
    viewMonth + 1
  }`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PrevLastDate = prevLast.getDate();
  const PrevLastDay = prevLast.getDay();

  const ThisLastDate = thisLast.getDate();
  const ThisLastDay = thisLast.getDay();

  const PDates = [];
  const TDates = [...Array(ThisLastDate + 1).keys()].slice(1);
  const NDates = [];

  if (PrevLastDay !== 6) {
    for (let i = 0; i < PrevLastDay + 1; i++) {
      PDates.unshift(PrevLastDate - i);
    }
  }

  for (let i = 1; i < 7 - ThisLastDay; i++) {
    NDates.push(i);
  }

  const dates = PDates.concat(TDates, NDates);

  // 각 날짜에 대한 데이터셋 설정
  const modifiedDates = dates.map((day) => {
    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.textContent = day;
    dateElement.dataset.year = viewYear;
    dateElement.dataset.month = String(viewMonth + 1).padStart(2, "0");

    dateElement.dataset.day = String(day).padStart(2, "0");

    if (viewYear === new Date().getFullYear() && viewMonth === new Date().getMonth() && day === new Date().getDate()) {
      dateElement.classList.add("today");
    }


    return dateElement.outerHTML;
  });
  // const modifiedDates = dates.map(date => `<div class="date" >${date}</div>`); // 년도 월 날짜 각각 데이터셋으로 (2024-)

  document.querySelector(".dates").innerHTML = modifiedDates.join("");
  renderTodoList ()
};


const $prevBtn = document.getElementById('prevBtn')
$prevBtn.addEventListener('click',prevMonth)
function prevMonth(){
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const $nextBtn = document.getElementById('nextBtn')
$nextBtn.addEventListener('click',nextMonth)
function nextMonth (){
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  window.location.reload(); // 페이지를 다시 로드하여 오늘 날짜로 이동
};

// 초기 렌더링
renderCalendar();

function renderTodoList (){
// 일정 추가
const $clendarDays = document.querySelectorAll("#calendarMain .date");

taskData.forEach((task) => {
  const { year, month, day } = task.date;

  $clendarDays.forEach(($day) => {
    const dayData = {
      dayYear: $day.dataset.year,
      dayMonth: $day.dataset.month,
      dayDay: $day.dataset.day,
    };
    const { dayYear, dayMonth, dayDay } = dayData;
    if (year === dayYear && month === dayMonth && day === dayDay) {
      const $ul = document.createElement("ul");
      $ul.classList.add("task_list");
      $ul.dataset.year = year
      $ul.dataset.month = month
      $ul.dataset.day = day
      $day.append($ul)
    }
  });

});
const $taskListWrap = document.querySelectorAll(".task_list");

$taskListWrap.forEach(($listWrap)=>{
  const dayData = {
    dayYear: $listWrap.dataset.year,
    dayMonth: $listWrap.dataset.month,
    dayDay: $listWrap.dataset.day,
  };
  const matchedTaskData = taskData.find((task)=>{
    const taskDate = task.date;
    if (taskDate.year === dayData.dayYear && taskDate.month === dayData.dayMonth && taskDate.day === dayData.dayDay){
      return task;
    }
  })
  const matchedTodoList = matchedTaskData.todoList
  
  console.log(matchedTodoList);
  matchedTodoList.forEach(todo=>{
    const $li = document.createElement('li')
    if(todo.category === "일"){
      $li.classList.add("task")
    } else if(todo.category === "휴식"){
      $li.classList.add("rest")
    } else if(todo.category === "운동"){
      $li.classList.add("exercise")
    }
    $li.textContent = todo.title;
    $listWrap.append($li)
  })

})
}


