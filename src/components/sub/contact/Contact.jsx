import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;

	const mapOption = {
		center: new kakao.maps.LatLng(37.5609223, 126.9811389),
		level: 3,
	};
	const marker = new kakao.maps.Marker({
		position: mapOption.center,
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
