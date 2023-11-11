import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;

	const mapOption = {
		//위치값 정밀하게 보정하는 법
		//기존 구글지도 위치값 복사뒤 카카오예제의 클릭한위치 마커표소 직접해보기에서
		//해당 코드 붙여넣기하고 원하는 지점을 찍으면 아래와같이 정밀한 수치값을 확인가능
		center: new kakao.maps.LatLng(37.56087805104125, 126.98114395004761),
		level: 3,
	};
	// 마커이미지 인스턴스를 생성하기 위한 정보값들
	const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
	const imageSize = new kakao.maps.Size(64, 69);
	const imageOption = { offset: new kakao.maps.Point(27, 69) };
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	const marker = new kakao.maps.Marker({
		position: mapOption.center,
		image: markerImage,
	});

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, mapOption);
		marker.setMap(map);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
