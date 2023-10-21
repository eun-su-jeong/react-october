import './Youtube.scss';
import Layout from '../../common/layout/Layout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	//const fetchData = useFetch();
	console.log(Vids);

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_KEY;
		const pid = process.env.REACT_APP_PLAYLIST_KEY;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setVids(json.items);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			{Vids.map((data, idx) => {
				const title = data.snippet.title;
				const desc = data.snippet.description;
				const [date, time] = data.snippet.publishedAt.split('T');
				return (
					<article key={idx}>
						<h2>{title}</h2>

						<div className='txt'>
							<p>{desc.length > 250 ? desc.substr(0, 100) + '...' : desc}</p>
							<div className='info'>
								<span>{date.split('-').join('.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							{/* 썸네일 링크 클리시 url로 detail/고유 유튜브데이터 id */}
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
