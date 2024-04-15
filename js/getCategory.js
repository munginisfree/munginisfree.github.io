// 태그의 카테고리 데이터 구하는 함수
function getCategory($tag){
  if ($tag.classList.contains("rest")) {
    return "휴식";
  } else if ($tag.classList.contains("task")) {
    return "일";
  } else if ($tag.classList.contains("exercise")) {
    return"운동";
  }
}
export default getCategory;