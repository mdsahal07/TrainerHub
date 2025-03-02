import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ReqButton = ({ trainerId, onStatusChange }) => {
	const [status, setStatus] = useState(''); // Possible states: 'request', 'requested', 'accepted', 'declined'
	const token = localStorage.getItem('token');
	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/request/status/${trainerId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const currentStatus = response.data.status;
				setStatus(currentStatus); // Backend should return { status: 'request' | 'requested' | 'accepted' | 'declined' }
				onStatusChange(currentStatus);
			} catch (error) {
				console.error('Failed to fetch connection status:', error);
				setStatus('request'); // Default to 'request' if fetching fails
			}
		};

		fetchStatus();
	}, [trainerId, token, onStatusChange]);

	// Handle button click to update status
	const handleClick = async () => {
		try {
			if (status === 'request') {
				// Send a connection request
				await axios.post(
					`http://localhost:5000/request/send-req`,
					{ trainerId },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				const newStatus = 'requested';
				setStatus(newStatus);
				onStatusChange(newStatus);
			} else if (status === 'requested') {
				// Cancel the connection request
				await axios.post(
					`http://localhost:5000/request/cancel-req`,
					{ trainerId },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				const newStatus = 'request';
				setStatus(newStatus);
				onStatusChange(newStatus);
			}
		} catch (error) {
			console.error('Failed to update connection status:', error);
		}
	};

	return (
		<button
			className={`
        px-4 py-2 rounded-lg transition duration-200
        ${status === 'request' && 'bg-blue-500 text-white hover:bg-blue-600'}
        ${status === 'requested' && 'bg-blue-900 text-white hover:bg-gray-400'}
        ${status === 'accepted' && 'bg-green-500 text-white cursor-not-allowed'}
        ${status === 'declined' && 'bg-red-500 text-white cursor-not-allowed'}
      `}
			onClick={handleClick}
			disabled={status === 'accepted' || status === 'declined'}
		>
			{status === 'request' && 'Request'}
			{status === 'requested' && 'Requested'}
			{status === 'accepted' && 'Accepted'}
			{status === 'declined' && 'Declined'}
		</button>
	);
};
