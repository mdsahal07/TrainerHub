import React, { useState } from 'react';
import axios from 'axios';

const WeightForm = ({ clientId, onUpdate }) => {
	const [goal, setGoal] = useState('loss weight');
	const [height, setHeight] = useState('');
	const [startingWeight, setStartingWeight] = useState('');
	const [currentWeight, setCurrentWeight] = useState('');
	const [goalWeight, setGoalWeight] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem('token');
			const response = await axios.post(
				`http://localhost:5000/weight/${clientId}`,
				{ clientId, goal, height, startingWeight, currentWeight, goalWeight },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			onUpdate(response.data);
		} catch (error) {
			console.error('Failed to update weight data:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700">Goal:</label>
				<select
					value={goal}
					onChange={(e) => setGoal(e.target.value)}
					className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
				>
					<option value="loss weight">Loss Weight</option>
					<option value="gain weight">Gain Weight</option>
				</select>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Height (cm):</label>
				<input
					type="number"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					required
					className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Starting Weight (kg):</label>
				<input
					type="number"
					value={startingWeight}
					onChange={(e) => setStartingWeight(e.target.value)}
					required
					className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Current Weight (kg):</label>
				<input
					type="number"
					value={currentWeight}
					onChange={(e) => setCurrentWeight(e.target.value)}
					required
					className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Goal Weight (kg):</label>
				<input
					type="number"
					value={goalWeight}
					onChange={(e) => setGoalWeight(e.target.value)}
					required
					className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
				/>
			</div>
			<button
				type="submit"
				className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Update
			</button>
		</form>
	);
};

export default WeightForm;
