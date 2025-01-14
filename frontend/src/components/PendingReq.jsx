import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingRequests = ({ trainerId, onClose }) => {
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		const fetchRequests = async () => {
			const { data } = await axios.get(`http://localhost:3000/pending-req/trainer/${trainerId}/pending`);
			setRequests(data);
		};
		fetchRequests();
	}, [trainerId]);

	const handleAction = async (requestId, action) => {
		await axios.patch(`http://localhost3000/pending-req/trainer/${trainerId}/requests/${requestId}`, { status: action });
		setRequests(requests.filter(req => req._id !== requestId));
	};

	const viewClientProfile = async (clientId) => {
		const { data } = await axios.get(`/api/clients/${clientId}`);
		alert(JSON.stringify(data, null, 2)); // Replace with profile modal
	};

	return (
		<div className="modal">
			<h2>Pending Requests</h2>
			<ul>
				{requests.map(req => (
					<li key={req._id}>
						<span onClick={() => viewClientProfile(req.clientId._id)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
							{req.clientId.name}
						</span>
						<button onClick={() => handleAction(req._id, 'accepted')}>Accept</button>
						<button onClick={() => handleAction(req._id, 'declined')}>Decline</button>
					</li>
				))}
			</ul>
			<button onClick={onClose}>Close</button>
		</div>
	);
};

export default PendingRequests;
