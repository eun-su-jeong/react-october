import Layout from '../../common/layout/Layout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	//const fetchData = useFetch();
	console.log(Vids);

	useEffect(() => {
		const api_key = 'AIzaSyB8xA7qwVyKagOQgD0wf24bhfV34LUiNCI';
		const pid = 'PLOxpgiGbqu-ameN2uXir3qLqajelhrjAq';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		//fetchData(baseURL, setVids);

		fetch(baseURL)
			.then((data) => data.json())
			.then((json) => setVids(json.items));
	}, []);

	return (
		<Layout title={'Youtube'}>
			{Vids.map((data, idx) => {
				return (
					<article key={idx}>
						<h2>{data.snippet.title}</h2>
						<p>{data.snippet.description}</p>
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
