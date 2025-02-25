import React from 'react';
import { ReqButton } from './ReqButton.jsx';

const TrainerDetailModal = ({ trainer, onClose }) => {
	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
			<div className="relative bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
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
				<div className="text-center mb-6 relative z-10 bg-gray-900 rounded-xl ">
					<h2 className="text-3xl font-bold text-white mb-2">{trainer.username}</h2>
					<p className="text-lg text-white">{trainer.specialization}</p>
				</div>
				<div className="space-y-4 relative z-10">
					<p className="text-gray-300"><strong className="text-white">Name:</strong> {trainer.fname}</p>
					<p className="text-gray-300"><strong className="text-white">Specialization:</strong> {trainer.specialization}</p>
					<p className="text-gray-300"><strong className="text-white">Experience:</strong> {trainer.experience}</p>
					<p className="text-gray-300"><strong className="text-white">Qualifications:</strong> {trainer.qualifications}</p>
					<p className="text-gray-300"><strong className="text-white">Rating:</strong> {trainer.rating} ⭐</p>
					<p className="text-gray-300"><strong className="text-white">Availability:</strong> {trainer.availability ? 'Available' : 'Not Available'}</p>
					{trainer.availability && <ReqButton trainerId={trainer._id} />}
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
	);
};

export default TrainerDetailModal;
