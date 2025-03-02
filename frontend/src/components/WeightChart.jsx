import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const WeightChart = ({ weightData }) => {
  const data = {
    labels: weightData.weightHistory.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight',
        data: weightData.weightHistory.map(entry => entry.weight),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '900px' }}
      className="flex justify-center"
    > {/* Adjust the height here */}
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightChart;
