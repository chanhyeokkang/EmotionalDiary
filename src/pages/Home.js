import { useContext, useEffect, useState } from "react";

import { DiaryStateContext } from "../App";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from "../components/DiaryList";

const Home = () => {

    const diaryList = useContext(DiaryStateContext); // "DiaryStateContext"에서 데이터를 가져와 "diaryList" 변수에 저장

    const [data, setData] = useState([]); // "data"와 "setData" 상태 변수를 초기화
    const [curDate, setCurDate] = useState(new Date()); // "curDate"와 "setCurDate" 상태 변수를 초기화하고 현재 날짜로 설정
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월` // "headText"에 현재 연도와 월을 포함한 문자열을 저장

    useEffect(() => { // 컴포넌트가 렌더링될 때 한 번만 실행되는 효과를 정의
        const titleElement = document.getElementsByTagName("title")[0]; // 문서의 title 엘리먼트를 선택
        titleElement.innerHTML = `감정 일기장`; // title 엘리먼트의 내용을 변경하여 페이지 제목을 설정
      },[]); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행


    useEffect(() => { // "diaryList"나 "curDate"가 변경될 때 실행되는 효과를 정의
        if (diaryList.length >= 1) { // "diaryList"의 길이가 1 이상인 경우에만 실행

            const firstDay = new Date( // 현재 월의 첫 번째 날짜를 생성
                curDate.getFullYear(), // 현재 연도
                curDate.getMonth(), // 현재 월
                1 // 첫 번째 날
            ).getTime(); // 날짜를 밀리초로 변환

            const lastDay = new Date( // 현재 월의 마지막 날짜를 생성
                curDate.getFullYear(), // 현재 연도
                curDate.getMonth() + 1, // 다음 달
                0, // 마지막 날
                23, // 시간을 23(마지막 시간)으로 
                59, // 분을 59(마지막 분)으로
                59 // 초를 59(마지막 초)으로
            ).getTime(); // 날짜를 밀리초로 변환

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
            // "diaryList"에서 현재 월에 해당하는 데이터를 필터링하여 "data" 상태를 업데이트
            );
        }
    }, [diaryList, curDate]); // "diaryList"와 "curDate"가 변경될 때 실행

    useEffect(() => { // "data"가 변경될 때 실행되는 효과
        console.log(data); // "data"를 콘솔에 출력
    }, [data]); // "data"가 변경될 때 실행

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())) // "curDate"를 한 달 뒤로
    };
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())) // "curDate"를 한 달 전으로
    };

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
                rightChild={<MyButton text={">"} onClick={increaseMonth} />}
            />

            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;