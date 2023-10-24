import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { id } = useParams(); // React 라우터의 useParams를 사용하여 URL 파라미터 'id'를 가져옴
  const diaryList = useContext(DiaryStateContext); // useContext를 사용하여 공유 상태 DiaryStateContext를 가져옴
  const navigate = useNavigate(); // useNavigate를 사용하여 라우팅을 처리할 함수를 가져옴.
  const [data, setData] = useState(); // useState를 사용하여 'data' 상태와 상태 업데이트 함수 'setData'를 초기화

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`; // 페이지 제목을 동적으로 설정하는 부분
  },[]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      ); // diaryList 배열에서 'id'와 일치하는 일기를 찾는 부분

      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary); // 데이터가 존재할 경우 'data' 상태를 설정
      } else {
        // 일기가 존재하지 않을 때
        alert("존재하지 않는 일기입니다!");
        navigate("/", { replace: true }); // 루트 페이지로 이동하며 현재 페이지를 대체
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩 중입니다.</div>; // 데이터가 없을 때 로딩 중 메시지를 표시
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    ); // emotionList에서 현재 감정 데이터를 찾는 부분
    console.log(curEmotionData); // 현재 감정 데이터를 콘솔에 출력

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}의 기록 `} // 날짜를 포맷팅하여 헤더 텍스트를 설정
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} /> // 커스텀 버튼을 생성하고 클릭 이벤트를 처리
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)} // 수정 페이지로 이동하는 버튼을 생성하고 클릭 이벤트를 처리
            />
          }
        />

        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} /> // 현재 감정의 이미지를 표시
              <div className="emotion_descript"> 
                {curEmotionData.emotion_descript} // 현재 감정의 설명을 표시
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p> // 일기 내용을 표시
            </div>
          </section>
        </article>
        
      </div>
    );
  }
};

export default Diary;