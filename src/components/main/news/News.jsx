import './News.scss';
import { useState, useRef, useEffect } from 'react';

function News() {
	const dummyData = useRef([
		{ title: 'title5', content: 'content5', date: new Date() },
		{ title: 'title4', content: 'content4', date: new Date() },
		{ title: 'title3', content: 'content3', date: new Date() },
		{ title: 'title2', content: 'content2', date: new Date() },
		{ title: 'title1', content: 'content1', date: new Date() },
	]);
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		if (data) return JSON.parse(data);
		else return dummyData.current;
	};

	const [News] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(News));
	}, [News]);

	return (
		<section className='news myScroll'>
			<h2>방명록을 남겨주세요😃</h2>
			<article>
				{News.map((post, idx) => {
					if (idx >= 5) return null;
					return (
						<div className={`paper paper-${idx % 5 + 1}`} key={idx}>
							<h3 key={idx}>{post.title}</h3>
							<p>{post.content}</p>
						</div>
					)
				})}
			</article>
		</section>
	);
}

export default News;
