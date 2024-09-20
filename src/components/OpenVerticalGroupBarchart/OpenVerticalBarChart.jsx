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
import { useTranslation } from "react-i18next";

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalGroupBarChart = ({  planData, factData }) => {

  const {t} = useTranslation()

  const data = {
    // labels: ["Оценка убытков","Возмещение ранее созданных резервов","Досоздание резервов в текущем году"],
    labels:[
      t("recoveryPreviousReserves"),
      t("assessmentOfLosts"),
      t("currenrYearReserves"),
    ],
    datasets: [
      {
        label:t('planlinechart'),
        data: planData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 45, // Adjust this value to make bars thicker
      },
      {
        label: t('factlinechart'),
        data: factData,
        backgroundColor: 'rgba(144, 238, 144, 0.6)', // Light green color
        borderColor: 'rgba(144, 238, 144, 1)', // Light green border color
        borderWidth: 1,
        barThickness: 45, // Adjust this value to make bars thicker
      },
    ],
  };

  const options = {
    indexAxis: 'x', // Vertical bar chart
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

export default VerticalGroupBarChart;
