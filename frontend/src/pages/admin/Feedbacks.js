import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbacksList = () => {
	const [feedbacks, setFeedbacks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get('http://localhost:5000/admin/feedbacks', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setFeedbacks(response.data);
				setLoading(false);
			} catch (err) {
				setError(err.response?.data?.message || 'Failed to fetch feedbacks');
				setLoading(false);
			}
		};

		fetchFeedbacks();
	}, []);

	if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
	if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">{error}</p></div>;

	return (
		<div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen p-8">
			<h2 className="text-3xl font-semibold text-gray-800 mb-8">User Feedbacks and Reports</h2>
			<div className="bg-white shadow-md rounded-lg p-6">
				<ul>
					{feedbacks.map((feedback) => (
						<li key={feedback._id} className="border-b border-gray-200 py-4">
							<p className="text-lg font-medium text-gray-800">{feedback.userName}</p>
							<p className="text-gray-600">{feedback.message}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FeedbacksList;
