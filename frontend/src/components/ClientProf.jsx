import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ClientProf = ({ client, onClose }) => {
	const [isReportOpen, setIsReportOpen] = useState(false);
	const [reportText, setReportText] = useState('');
	const token = localStorage.getItem('token');

	const handleReport = async () => {
		try {
			const decodetoken = jwtDecode(token);
			const trainerId = decodetoken.userId;
			await axios.post(
				'http://localhost:5000/report',
				{ trainerId, clientId: client._id, reportText },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			alert('Client reported successfully.');
			setIsReportOpen(false);
			setReportText('');
			onClose(); // Close the ClientProf modal
		} catch (err) {
			alert('Failed to report client.');
			console.error(err);
		}
	};

	return (
		<>
			{!isReportOpen && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
					<div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg overflow-hidden border border-black">
						<button
							onClick={onClose}
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								></path>
							</svg>
						</button>
						<div className="text-center mb-6 relative z-10 bg-gray-900 rounded-xl p-4">
							<h2 className="text-3xl font-bold text-white mb-2">{client.fname}</h2>
							<p className="text-lg text-gray-400">{client.email}</p>
						</div>
						<div className="space-y-4 relative z-10">
							<p className="text-gray-300"><strong className="text-white">Username:</strong> {client.username}</p>
							<p className="text-gray-300"><strong className="text-white">Email:</strong> {client.email}</p>
							<p className="text-gray-300"><strong className="text-white">Goal:</strong> {client.goals}</p>
							<button
								onClick={() => setIsReportOpen(true)}
								className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
							>
								Report
							</button>
						</div>
						<div className="mt-6 text-center relative z-10">
							<button
								onClick={onClose}
								className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition duration-200"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
			{isReportOpen && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
					<div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg overflow-hidden border border-black">
						<h3 className="text-xl font-bold text-white mb-4">Report Client</h3>
						<textarea
							className="w-full p-2 rounded-lg bg-gray-700 text-white"
							rows="4"
							placeholder="Describe the issue..."
							value={reportText}
							onChange={(e) => setReportText(e.target.value)}
						></textarea>
						<div className="mt-4 text-right">
							<button
								onClick={() => setIsReportOpen(false)}
								className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 mr-4"
							>
								Cancel
							</button>
							<button
								onClick={handleReport}
								className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
							>
								Send
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ClientProf;
