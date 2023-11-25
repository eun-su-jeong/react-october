import { useRef, useState } from 'react';

// 인수로 화면의 렌더링 발생시키는 특정 state값을 받아서
export const useDebounce = (value) => {
	// 내부적으로 새로운 state에 옮겨담음
	const [DebounceVal, setDebounceVal] = useState(value);
	const eventBloker = useRef(null);

	// 인수로 받은 state값이 변경될때마다 setTimeout 호출을 계속 초기화
	clearTimeout(eventBloker.current);
	// 아레 setTimeout에 의해서 원래 state값이 0.5초안에 계속 변경되는 중이면
	// 새로운 state로 옮겨담지 않고 변경되는 값이 멈춘 뒤 0.5초가 지나야지만 새로운 state로 옮겨줌(debouncing처리)
	eventBloker.current = setTimeout(() => {
		setDebounceVal(value);
	}, 500);

	//debouncing이 적용된 새로우 state를 반환
	return DebounceVal;
};
