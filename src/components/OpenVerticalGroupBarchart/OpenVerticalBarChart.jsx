import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OpenVerticalGroupBarChart = () => {
  const data = {
    labels: ['Процентные расходы по депозитам', 'Процентные расходы по счетам к оплате в другие банки', 'Процентные расходы по кредитам к оплате', 'Процентные расходы по выпущенным ценным бумагам','Другие процентные расходы'],
    datasets: [
      {
        label: 'PLAN',
        data: [2400, 1398, 3908, 4800,8000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        barThickness: 15, // Adjust this value to make bars thicker
      },
      {
        label: 'FACT',
        data: [1200, 2300, 5000, 3600,7500],
        backgroundColor: 'rgba(144, 238, 144, 0.6)', // Light green color
        borderColor: 'rgba(144, 238, 144, 1)', // Light green border color
        borderWidth: 2,
        barThickness: 15, // Adjust this value to make bars thicker
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // This ensures the chart will fill the container's height
    plugins: {
      legend: {
        display: true, // Show the legend
        position: 'top', // Position the legend at the top
        align: 'end', // Align the legend to the right
        labels: {
          usePointStyle: true, // Use point styles instead of box styles
          pointStyle: 'circle', // Set the point style to circle
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default OpenVerticalGroupBarChart;
