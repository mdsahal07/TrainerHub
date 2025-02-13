import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ onNotificationClick }) => {
	const [userDetails, setUserDetails] = useState(null);
	const [accounts, setAccounts] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [userRole, setUserRole] = useState('');
	const navigate = useNavigate();


	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			setUserRole(decodedToken.role);
		}
	}, []);
	const handleProfileClick = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleAccountSwitch = (account) => {
		// Logic to switch account
		console.log('Switching to account:', account);
	};

	const handleAddNewAccount = () => {
		navigate('/login');
	};

	return (
		<nav className="flex items-center bg-gray-800 p-4">
			<h1 className="text-white text-5xl font-bold">Trainer Hub</h1>
			<div className="container mx-auto flex justify-end items-center pr-4 m-4">
				<div className="text-white text-lg flex items-center space-x-4">
					<Link className="hover:underline" to="/">Home</Link>
					<Link className="hover:underline" to={`/dashboard/${userRole}`}>Dashboard</Link>
					<button className="text-white hover:underline" onClick={onNotificationClick}>Notification</button>
					<Link className="hover:underline" to="/about">About</Link>
					<div className="relative">
						{userDetails ? (
							<img
								src={userDetails.profilePicture || '/default-profile.png'}
								alt="Profile"
								className="h-10 w-10 rounded-full cursor-pointer"
								onClick={handleProfileClick}
							/>
						) : (
							<div
								className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
								onClick={handleProfileClick}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 24 24"
									className="h-6 w-6"
								>
									<path
										d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.2c-2.7 0-8.4 1.4-8.4 4.2v1.2c0 .6.6 1.2 1.2 1.2h14.4c.6 0 1.2-.6 1.2-1.2v-1.2c0-2.8-5.7-4.2-8.4-4.2z"
									/>
								</svg>
							</div>
						)}
						{dropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
								{accounts.map((account, index) => (
									<button
										key={index}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
										onClick={() => handleAccountSwitch(account)}
									>
										{account.email}
									</button>
								))}
								<button
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
									onClick={handleAddNewAccount}
								>
									Add New Account
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
