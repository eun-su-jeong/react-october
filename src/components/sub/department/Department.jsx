import './Department.scss';
import Layout from '../../common/layout/Layout';
import React, { useEffect, useState } from 'react';
import { useFecth } from '../../hooks/useFetch';

const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Title, setTitle] = useState('');
	const [Department, setDepartment] = useState([]);
	const [History, setHistory] = useState([]);
	const fetchData = useFecth();
	console.log(History);

	useEffect(() => {
		fetchData(`${path}/DB/history.json`, setHistory);
		fetchData(`${path}/DB/department.json`, setDepartment, setTitle);
	}, []);

	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				<h2>History</h2>
				<div className='con'>
					{History.map((data, idx) => {
						return (
							<React.Fragment key={idx}>
								<h2>{Object.keys(data)[0]}</h2>
								<ul>
									{Object.values(data)[0].map((val, idx) => (
										<li key={idx}>{val}</li>
									))}
								</ul>
							</React.Fragment>
						);
					})}
				</div>
			</section>

			<section id='memberBox'>
				<h2>{Title.charAt(0).toUpperCase() + Title.slice(1)}</h2>

				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<h3>{member.name}</h3>
							<p>{member.position}</p>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
