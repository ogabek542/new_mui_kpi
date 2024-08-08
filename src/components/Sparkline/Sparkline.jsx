import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Box, Card } from '@mui/material';

// Register necessary components for Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

const Sparkline = ({ data, options }) => {
  return (
    <Card sx={{ width: '100%', height: 'auto', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <Box sx={{ width: '100%', height: 'auto', bgcolor: 'transparent', border: 'none' }}>
        <Line data={data} options={options} />
      </Box>
    </Card>
  );
};

// Usage Example
const SparklineApp = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 20, 15, 30, 25, 35, 30],
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
        borderWidth: 2,
        pointRadius: 0, // No points
        fill: true, // Fill the area under the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.2, // Line smoothing
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '100px' }}>
      <Sparkline data={data} options={options} />
    </div>
  );
};

export default SparklineApp;
