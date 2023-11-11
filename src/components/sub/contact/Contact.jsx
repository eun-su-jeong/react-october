import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;

	const info = [
		{
			latlang: new kakao.maps.LatLng(37.56087805104125, 126.98114395004761),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			mgPos: { offset: new kakao.maps.Point(116, 33) },
		},
	];

	const marker = new kakao.maps.Marker({
		position: info[0].latlang,
		image: new kakao.maps.MarkerImage(info[0].imgSrc, info[0].imgSize, info[0].imgPos),
	});

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, { center: info[0].latlang });
		marker.setMap(map);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
