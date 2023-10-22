import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async () => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = process.env.REACT_APP_FLICKER_KEY;
		const method_interest = 'flickr.interestingness.getList';
		const num = 40;
		const url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='frame'>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }} disableImagesLoaded={false} updateOnEachImageLoad={false}>
					{Pics.map((pic, idx) => {
						return (
							<article key={idx}>
								<div div className='inner'>
									<div className='pic'>
										<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} />
									</div>
									<h2>{pic.title}</h2>
									<div className='profile'>
										<img src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`} alt={pic.owner} />
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
