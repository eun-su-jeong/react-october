import Layout from '../../common/layout/Layout';
import { useRef, useState } from 'react';
import './Department.scss';

export default function Department() {
	console.log('re-render');
	//리액트에 state변경이 일어나면 컴포넌트는 재랜더링됨
	//바뀐 state값은 다음번 렌더링 사이클에서 변경된 값이 적용됨
	//화면의 정보값을 갱신해야 되는 중요한 변경사항이 아닌요소를 state로 변경하면 계속해서 컴포넌트가 재랜더링 되므로 비효율적
	//대표적인 사례 : 단순 모션처리를 위한 state적용
	const rotate = useRef(0);
	// 가상돔 요소는 핸들러안족에서 호출하고 싶을때는 document.querySelector가아닌
	//useRef를 톻나 참조객체에 담아서 호출

	//document.querySelector로 리앧트에서 돔 요소를 선택하면 안되는 이유
	const box = useRef(null);

	const plus = () => {
		++rotate.current;
		box.current.style.transform = `rotate(${45 * rotate.current}deg)`;
	};
	const minus = () => {
		--rotate.current;
		box.current.style.transform = `rotate(${45 * rotate.current}deg)`;
	};

	return (
		<Layout title={'Department'}>
			<button onClick={minus}>minus</button>
			<button onClick={plus}>plus</button>
			<article ref={box}></article>
		</Layout>
	);
}

/*

	useRef : 특정값을 담기 위한 참조객체를 만드는 hook
	- useRef를 통한 참조객체에 담겨있는 값은 컴포넌트가 재호출되더라도 값이 초기화되지 않고 유지가됨 
	- useRef를 통한 참조객체의 값이 변경되더라도 컴포넌트를 재호출하지 않음
	- useRef를 통한 참조객체의 값이 변경이 되면 그 값은 해당 랜더링 사이클에서 바로 적용됨

	useRef써야되는 실사례
	1. 가상돔 요소를 선택해서 제어해야 될때
	2. 특정 값을 변경처리할때 불필요하게 컴포넌트를 재호출하고 싶지 않을때 

*/
