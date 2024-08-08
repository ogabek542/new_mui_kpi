import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

// Register necessary components for Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 90, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red
        borderColor: 'rgba(255, 99, 132, 1)', // Red
        borderWidth: 1,
        fill: true, // Fill area under the line
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 96, 27, 100],
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        borderWidth: 1,
        fill: true, // Fill area under the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false, // Hide the radial ticks if needed
        },
        pointLabels: {
          display: true,
          font: {
            size: 14, // Font size for the labels
            weight: 'bold', // Font weight for the labels
          },
          color: '#333', // Font color for the labels
          padding: 10, // Padding around the labels
        },
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Radar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RadarChart;
