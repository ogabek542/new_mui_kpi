import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Filler, // Import Filler for area chart
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

// Register the necessary components for Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, Legend, Filler);

// Sparkline Component
const Sparkline = ({ data, options }) => {
  return (
    <Card sx={{ width: '100%', height: 'auto', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

// SparklineApp Component
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
    maintainAspectRatio: false, // This ensures the chart will fill the container's height
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
    <Box style={{ width: '100%', height: '100%' }}>
      <Sparkline data={data} options={options} />
    </Box>
  );
};

export default SparklineApp;
