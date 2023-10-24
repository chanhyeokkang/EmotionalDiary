import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0]; // 문서의 title 엘리먼트를 선택
        titleElement.innerHTML = `감정 일기장 - 새로운 일기`; // title 엘리먼트의 내용을 변경하여 페이지 제목을 설정
      },[]);

    return (
        <div>
            <DiaryEditor />
        </div>
    )
};

export default New;