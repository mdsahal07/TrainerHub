import { React, useState } from 'react';
import { ReqButton } from './ReqButton.jsx';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainerProf = ({ trainer, onClose }) => {

	const [isReportOpen, setIsReportOpen] = useState(false);
	const [reportText, setReportText] = useState('');
	const token = localStorage.getItem('token');
	const [isAccepted, setIsAccepted] = useState(false);

	const navigate = useNavigate();
	const handleRate = () => {
		navigate(`/ratings/${trainer._id}`);
	};
	const handleStatusChange = (status) => {
		setIsAccepted(status === 'accepted');
	};
	const handleReport = async () => {
		try {
			const decodetoken = jwtDecode(token);
			const clientId = decodetoken.userId;
			await axios.post(
				'http://localhost:5000/report',
				{ trainerId: trainer._id, clientId, reportText },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			alert('Trainer reported successfully.');
			setIsReportOpen(false);
			setReportText('');
			onClose();
		} catch (err) {
			alert('Failed to report client.');
			console.error(err);
		}
	};

	return (
		<>
			<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
				<div className="relative bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
					<button
						onClick={() => setIsReportOpen(true)}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="12" cy="12" r="10" strokeWidth="2" />
							<line x1="12" y1="8" x2="12" y2="13" strokeWidth="2" strokeLinecap="round" />
							<circle cx="12" cy="16" r="1.5" fill="currentColor" />
						</svg>
					</button>
					<div className="text-center mb-6 relative z-10 bg-gray-900 rounded-xl ">
						<h2 className="text-3xl font-bold text-white mb-2">{trainer.username}{trainer.verified && <img src="/approve.png" alt="Verified" className="inline h-6 w-6 ml-2" />}</h2>
						<p className="text-lg text-white">{trainer.specialization}</p>
					</div>
					<div className="space-y-4 relative z-10">
						<p className="text-gray-300"><strong className="text-white">Name:</strong> {trainer.fname}</p>
						<p className="text-gray-300"><strong className="text-white">Specialization:</strong> {trainer.specialization}</p>
						<p className="text-gray-300"><strong className="text-white">Experience:</strong> {trainer.experience}</p>
						<p className="text-gray-300"><strong className="text-white">Qualifications:</strong> {trainer.qualifications}</p>
						<p className="text-gray-300"><strong className="text-white">Rating:</strong> {trainer.rating} ⭐</p>
						<p className="text-gray-300"><strong className="text-white">Availability:</strong> {trainer.availability ? 'Available' : 'Not Available'}</p>
						{trainer.availability && <ReqButton trainerId={trainer._id} onStatusChange={handleStatusChange} />}
						{isAccepted && (
							<button
								onClick={handleRate}
								className="bg-yellow-500 text-white px-6 py-2 ml-4 rounded-lg hover:bg-yellow-600 transition duration-200"
							>
								Rate
							</button>
						)}
					</div>
					<div className="mt-6 text-center relative z-10">
						<button
							onClick={onClose}
							className="bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
						>
							Close
						</button>
					</div>
				</div>
			</div>

			{
				isReportOpen && (
					<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
						<div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg overflow-hidden border border-black">
							<h3 className="text-xl font-bold text-white mb-4">Report Trainer</h3>
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
				)
			}
		</>
	);
};

export default TrainerProf;
