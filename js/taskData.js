const taskData = [
  {
    id: 1,
    date: {
      year: "2024",
      month: "04",
      day: "05",
    },
    todoList: [
      {
        time: "12:00",
        title: "자바스크립트 예제 풀기",
        category: "일",
      },
    ],
  },
  {
    id: 2,
    date: {
      year: "2024",
      month: "04",
      day: "10",
    },
    todoList: [
      {
        time: "06:00",
        title: "선거하러 가기",
        category: "일",
      },
      {
        time: "18:00",
        title: "영화 보기",
        category: "휴식",
      },
      {
        time: "22:00",
        title: "과제 제출",
        category: "일",
      },
    ],
  },
  {
    id: 3,
    date: {
      year: "2024",
      month: "04",
      day: "20",
    },
    todoList: [
      {
        time: "14:00",
        title: "헬스장 가기",
        category: "운동",
      },
    ],
  },

  {
    id: 4,
    date: {
      year: "2024",
      month: "04",
      day: "13",
    },
    todoList: [
      {
        time: "17:00",
        title: "면접",
        category: "일",
      },
    ],
  },
  {
    id: 5,
    date: {
      year: "2024",
      month: "04",
      day: "11",
    },
    todoList: [
      {
        time: "14:00",
        title: "수영 가기",
        category: "운동",
      },
      {
        time: "19:00",
        title: "지은이랑 저녁약속",
        category: "휴식",
      },
    ],
  },
  {
    id: 6,
    date: {
      year: "2024",
      month: "04",
      day: "29",
    },
    todoList: [
      {
        time: "14:00",
        title: "자소서 쓰기",
        category: "일",
      },
    ],
  },
  {
    id: 7,
    date: {
      year: "2024",
      month: "04",
      day: "18",
    },
    todoList: [
      {
        time: "14:00",
        title: "학교 서류 제출",
        category: "일",
      },
    ],
  },
  {
    id: 8,
    date: {
      year: "2024",
      month: "04",
      day: "24",
    },
    todoList: [
      {
        time: "14:00",
        title: "승연이랑 점심 약속",
        category: "휴식",
      },
    ],
  },
  {
    id: 9,
    date: {
      year: "2024",
      month: "04",
      day: "22",
    },
    todoList: [
      {
        time: "14:00",
        title: "테니스",
        category: "운동",
      },
      {
        time: "19:00",
        title: "정인이랑 저녁약속",
        category: "휴식",
      },
    ],
  },
  {
    id: 10,
    date: {
      year: "2024",
      month: "04",
      day: "27",
    },
    todoList: [
      {
        time: "17:00",
        title: "학원 서류 등록",
        category: "일",
      },
    ],
  },
  {
    id: 11,
    date: {
      year: "2024",
      month: "04",
      day: "19",
    },
    todoList: [
      {
        time: "10:00",
        title: "늦잠자기",
        category: "휴식",
      },
    ],
  },
  {
    id: 12,
    date: {
      year: "2024",
      month: "04",
      day: "09",
    },
    todoList: [
      {
        time: "09:00",
        title: "헬스장",
        category: "운동",
      },
    ],
  },
  {
    id: 13,
    date: {
      year: "2024",
      month: "04",
      day: "21",
    },
    todoList: [
      {
        time: "21:00",
        title: "과제 제출",
        category: "일",
      },
    ],
  },
  {
    id: 14,
    date: {
      year: "2024",
      month: "04",
      day: "25",
    },
    todoList: [
      {
        time: "12:00",
        title: "국취제 신청",
        category: "일",
      },
    ],
  },
  {
    id: 15,
    date: {
      year: "2024",
      month: "11",
      day: "06",
    },
    todoList: [
      {
        time: "01:00",
        title: "정인이 생일~",
        category: "휴식",
      },
      {
        time: "18:00",
        title: "저녁 약속",
        category: "휴식",
      },
    ],
  },
];

taskData.sort((a, b) => {
  // a와 b의 년도를 비교하여 정렬
  if (a.date.year !== b.date.year) {
    return parseInt(a.date.year) - parseInt(b.date.year);
  }
  
  // 년도가 같은 경우, 월을 비교하여 정렬
  if (a.date.month !== b.date.month) {
    return parseInt(a.date.month) - parseInt(b.date.month);
  }
  
  // 년도와 월이 같은 경우, 일을 비교하여 정렬
  return parseInt(a.date.day) - parseInt(b.date.day);
});


// console.log(JSON.stringify(taskData));

export default taskData;
