import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Cards';
import TrainerProf from './TrainerProf';

const TrainerList = ({ clientId }) => {
	const [trainers, setTrainers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedTrainer, setSelectedTrainer] = useState();
	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const response = await axios.get('http://localhost:5000/clientDash/your-trainer', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setTrainers(response.data.trainers);
				setLoading(false);
			} catch (err) {
				setError(err.response?.data?.message || 'Failed to fetch clients');
				setLoading(false);
			}
		};

		fetchClients();
	}, [clientId]);

	const handleClientClick = async (trainerId) => {
		try {
			console.log("Running : ", trainerId)
			const response = await axios.get(`http://localhost:5000/trainer/${trainerId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setSelectedTrainer(response.data);
			console.log("Selected Client : ", selectedTrainer);
		} catch (err) {
			alert('Failed to fetch client details');
			console.error(err);
		}
	};
	if (loading) return <p>Loading trainers...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{trainers.map((trainer) => (
					<Card
						key={trainer._id}
						title={trainer.fname}
						specialization={trainer.specialization}
						path={`#`}
						onClick={() => handleClientClick(trainer._id)}
						icon={<i className="fas fa-user"></i>}
					/>

				))}
			</div>
			{selectedTrainer && (
				<TrainerProf trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />
			)}

		</div>
	);
};

export default TrainerList;
