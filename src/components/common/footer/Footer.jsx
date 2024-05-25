import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter } from 'react-icons/fa6';
import './Footer.scss';

export default function Footer() {
	const title = process.env.REACT_APP_TITLE;
	return (
		<footer>
			<h1>{title}</h1>

			<p>2023 EunSujeong &copy; All Rights Reserved.</p>

			<ul>
				<li>
					<Link to='/'>
						<FaYoutube size={20} />
					</Link>
				</li>
				<li>
					<Link to='/'>
						<FaTwitter size={20} />
					</Link>
				</li>
			</ul>
		</footer>
	);
}
