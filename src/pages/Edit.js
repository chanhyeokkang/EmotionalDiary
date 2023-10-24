import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    // 'useState' 훅을 사용하여 상태 변수 'originData'를 선언하고 초기화
    const [originData, setOriginData] = useState();

    // 'useNavigate'와 'useParams' 훅을 해당 라이브러리에서 가져와서 사용
    const navigate = useNavigate();
    const {id} = useParams();

    // 'DiaryStateContext'를 'useContext' 훅을 통해 액세스
    const diaryList = useContext(DiaryStateContext);

    // 'useEffect' 훅을 사용하여 문서 제목을 동적으로 변경
    useEffect(() => {
         // 문서의 타이틀 엘리먼트를 가져와서 'id'를 이용하여 동적으로 제목을 설정
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
      },[]);

    // 'id' 또는 'diaryList'가 변경될 때 다이어리 데이터를 로드하기 위해 'useEffect' 훅을 사용
    useEffect(() => {
        if (diaryList.length >= 1) {
            // 일치하는 'id'를 가진 다이어리를 찾음
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if (targetDiary) {
                // 찾은 다이어리로 'originData' 상태 변수를 설정
                setOriginData(targetDiary);
            } else {
                // 다이어리를 찾지 못한 경우 알림을 표시하고 홈페이지로 이동
                alert("없는 일기입니다.");
                navigate("/", {replace:true});
            }
        }
    },[id,diaryList])

    // 'originData'가 사용 가능한 경우 'DiaryEditor' 컴포넌트를 렌더링
    return <div>{originData && <DiaryEditor isEdit={true} originData={originData}/>}</div>;
};

export default Edit;