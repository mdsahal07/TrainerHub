import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onNotificationClick }) => {
	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg">
					<Link className="mr-4 hover:underline" to="/">Home</Link>
					<button className="text-white hover:underline" onClick={onNotificationClick}>Notification</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
