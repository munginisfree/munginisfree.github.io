import getCategory from "./getCategory.js";
import { selectedDay, $taskList, setListNull } from "./detailList.js";
import taskData from "./taskData.js";
import { $addTaskModal, setModalInitaial } from "./addTaskModal.js";

// 수정 모달 ui 설정
const $editBox = document.getElementById("edit_box");

const $rewriteInput = $editBox.querySelector(".rewrite_input");
const $rewriteText = $editBox.querySelector(".text span:first-child");
const $rewriteDate = $editBox.querySelector(".date");
const $rewritetime = $editBox.querySelector(".time");

let $selectedLi;
let initialValue;
let selectedLiData;
let selectedLiSet = {};
function positionEditBox(e,$tag){
  $tag.style.left = e.clientX  + "px";
  $tag.style.top = e.clientY  + "px";
}

function matchingSelectedData(data){
  return selectedDay.todoList.find(
    (todo) =>
      todo.time === data.time &&
      todo.title === data.text &&
      todo.category === data.category
  );
}
function getSelectedLi(e){
  $selectedLi = e.target.closest(".task_list-item");
  return {
    text: $selectedLi.querySelector(".text").textContent,
    time: $selectedLi.querySelector(".time").textContent,
    category: getCategory($selectedLi)
  };
}
$taskList.addEventListener("click", (e) => {
  if (!e.target.closest(".task_list-item")) return;

  e.stopPropagation();
  $addTaskModal.classList.remove('is-active')
  setModalInitaial()

  positionEditBox(e,$editBox)

  $editBox.classList.add("is-active");

  selectedLiSet = getSelectedLi(e);
  selectedLiData = matchingSelectedData(selectedLiSet)

  

  $rewritetime.textContent = selectedLiSet.time;
  $editBox.classList.remove('task','rest','exercise')
  const theme = ()=>{
    if(selectedLiSet.category === "일"){
      return "task";
    } else if(selectedLiSet.category === "휴식"){
      return "rest";
    } else if(selectedLiSet.category === "운동"){
      return "exercise";
    }
  }
  $editBox.classList.add(theme())
  initialValue = selectedLiSet.text;
  $rewriteText.textContent = selectedLiSet.text;
  $rewriteInput.value = selectedLiSet.text;
$rewriteDate.textContent = `${selectedDay?.date.month}.${selectedDay?.date.day}`;

});

// 모달 외 영역 클릭시 닫힘
document.addEventListener("click", (e) => {
  if (e.target.closest(".task_list-item") || e.target.closest("#edit_box"))
    return;
  $editBox.classList.remove("is-active");
  setIsNotEditMode()
});

const $rewriteBtn = $editBox.querySelector(".rewrite_btn ");
const $rewriteSubmitBtn = $editBox.querySelector(".check_btn");
const $rewriteCancelBtn = $editBox.querySelector(".cancel_btn");
// 수정 아이콘
$rewriteBtn.addEventListener("click", () => {
  $editBox.classList.add("is-edit");
});
// 수정 취소
function setIsNotEditMode(){
  $editBox.classList.remove("is-edit");
  $rewriteInput.value = initialValue;
}
$rewriteCancelBtn.addEventListener("click", () => {
  setIsNotEditMode()
});
// 수정 완료
$rewriteSubmitBtn.addEventListener("click", () => {
  $editBox.classList.remove("is-edit");

  const newTitle = $rewriteInput.value;
  $rewriteText.textContent = newTitle;
  $selectedLi.querySelector(".text").textContent = newTitle;
  selectedLiData.title = newTitle;
});
// 삭제 버튼

const $taskDelBtn = document.getElementById('del_btn')

$taskDelBtn.addEventListener("click",function(e){
  selectedLiData = matchingSelectedData(selectedLiSet)
  
  
  $selectedLi.remove()
  setIsNotEditMode()
  $editBox.classList.remove("is-active");
  $editBox.classList.remove("is-edit");

  

  selectedDay.todoList.splice(selectedDay.todoList.indexOf(selectedLiData),1)
  // 그 날짜 데이터 삭제??? 놉???
  if (selectedDay.todoList.length === 0){
    taskData.splice(taskData.indexOf(selectedDay),1)

   
    setListNull()
  }
})