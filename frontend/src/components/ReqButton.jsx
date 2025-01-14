import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ReqButton = ({ trainerId }) => {
	const [status, setStatus] = useState(''); // Possible states: 'request', 'requested', 'accepted', 'declined'
	const token = localStorage.getItem('token');

	// Fetch the current status when the component mounts
	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/request/status/${trainerId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setStatus(response.data.status); // Backend should return { status: 'request' | 'requested' | 'accepted' | 'declined' }
			} catch (error) {
				console.error('Failed to fetch connection status:', error);
				setStatus('request'); // Default to 'request' if fetching fails
			}
		};

		fetchStatus();
	}, [trainerId, token]);

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
				setStatus('requested');
			} else if (status === 'requested') {
				// Cancel the connection request
				await axios.post(
					`http://localhost:5000/request/cancel-req`,
					{ trainerId },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				setStatus('request');
			}
		} catch (error) {
			console.error('Failed to update connection status:', error);
		}
	};

	return (
		<button
			className={`req-button req-${status}`}
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
