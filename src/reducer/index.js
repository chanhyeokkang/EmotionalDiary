const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
      // 'INIT' 액션일 때, 새로운 상태로 주어진 데이터(action.data)를 반환
      case 'INIT': {
        return action.data;
      }
      // 'CREATE' 액션일 때, 새 항목을 기존 상태(state) 앞에 추가
      case 'CREATE': {
        const newItem = {
          ...action.data
        };
        newState = [newItem, ...state];
        break;
      }
      // 'REMOVE' 액션일 때, 주어진 targetId와 일치하지 않는 항목만을 필터링하여 새 상태를 생성
      case 'REMOVE': {
        newState = state.filter((it) => it.id !== action.targetId);
        break;
      }
      // 'EDIT' 액션일 때, 주어진 id와 일치하는 항목을 수정하고 나머지 항목은 변경하지 않은 상태로 유지
      case 'EDIT': {
        newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
        break;
      }
      default:
        return state;
    }
    localStorage.setItem('diary', JSON.stringify(newState));

    return newState;
  };

  export default reducer;