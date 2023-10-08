import Layout from '../../common/layout/Layout';
import { useRef, useState } from 'react';
import './Department.scss';
import Modal from '../../common/modal/Modal';

export default function Department() {
	const [Open, setOpen] = useState(false);

	return (
		<Layout title={'Department'}>
			<button onClick={() => setOpen(!Open)}>{Open ? 'close' : 'open'}</button>
			{Open && <Modal />}
		</Layout>
	);
}
/*
	return문 바깥에는 모든 스크립트 구문을 활용가능
	단 JSX구문 안쪽에는 {}를 통해서 할수있는 연산 3가지
	1. 변수치환
	2. map으로 반복처리
	3. 삼항연산자, &&연산자를 통한 분기처리
*/
