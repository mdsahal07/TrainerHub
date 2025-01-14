
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const ProgressChart = ({ data, title }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: title || 'Chart',
			},
		},
	};

	return (
		<div className="h-64 mt-8 bg-white p-4 shadow rounded">
			{data ? (
				<Line data={data} options={options} />
			) : (
				<div className="h-64 flex justify-center items-center border rounded">
					<p>Loading chart...</p>
				</div>
			)}
		</div>
	);
};

export default ProgressChart;
