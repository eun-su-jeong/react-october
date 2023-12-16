import { combineReducers } from 'redux';

const initMemberDta = {
	members: [
		{
			name: 'David',
			position: 'President',
			pic: 'member1.jpg'
		},
		{
			name: 'Julia',
			position: 'Vice President',
			pic: 'member2.jpg'
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg'
		},
		{
			name: 'Michael',
			position: 'Front-end Developer',
			pic: 'member4.jpg'
		},
		{
			name: 'Emma',
			position: 'Back-end Developer',
			pic: 'member5.jpg'
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg'
		}
	]
};

// 초기 데이터를 전역 state에 저장하고 추후 action객레가 넘어오면 action의 tyoe에 따라서 전역데이터를 변경해주는 변형자 함수 생성 : reducer
// 액션 {type : 'SET_MEMBERS', payload: [memberData]}
const memberReducer = (state = initMemberDta, action) => {
	if (action.type === 'SET_MEMBERS') {
		return { ...state, members: action.payload };
	} else {
		return state;
	}
};

//해당 리듀서함수가 반환하는 객체를 외부로 export
const reducers = combineReducers({ memberReducer });
export default reducers;
