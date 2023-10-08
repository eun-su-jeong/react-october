import './Layout.scss';
import { useEffect, useRef } from 'react';

export default function Layout({ children, title }) {
	let newClass = title.toLowerCase().split(' ').join('_');
	const refFrame = useRef(null);
	const refTitle = useRef(null);

	useEffect(() => {
		let text = refTitle.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-delay:${0.1 * count}s'>${letter}</span>`;
			count++;
		}
		refTitle.current.innerHTML = tags;

		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<section ref={refFrame} className={`layout ${newClass}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</section>
	);
}
