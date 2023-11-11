import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	//JSX컴포넌트에서는 cdn을 통해 window전역 객체에 받아지는 KAKAO객체에 자동 접근이 안되니
	// 비구조화할당으로 직접 해당 객체 추출
	const mapFrame = useRef(null);
	const { kakao } = window;
	// api 적용할 요소도 가상돈이기때문에 참조 객체에 연결
	const mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	useEffect(() => {
		// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
		new kakao.maps.Map(mapFrame.current, mapOption);
	}, []);
	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
