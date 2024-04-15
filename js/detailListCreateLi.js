// 리스트 태그 생성 메서드
function createTaskLi(task) {
  const $taskLi = document.createElement("li");
  // 태그 세팅
  $taskLi.classList.add("task_list-item");
  $taskLi.innerHTML = `
    <span class="time">${task.time}</span>
    <span class="label"></span>
    <span class="text">${task.title}</span>
    `;
  // 라벨 세팅
  if (task.category === "일") {
    $taskLi.classList.add("task");
  } else if (task.category === "휴식") {
    $taskLi.classList.add("rest");
  } else if (task.category === "운동") {
    $taskLi.classList.add("exercise");
  }
  return $taskLi;
}
export default createTaskLi;