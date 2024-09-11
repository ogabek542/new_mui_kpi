import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';
import { useTranslation } from "react-i18next";

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData }) => {

  const {t} = useTranslation()

  const data = {
    // labels: ['Расходы на сотрудников','Аренда и содержание','Транспортные расходы','Административные расходы','Репрезентация и благотворительность','Расходы на износ','Другие операционные расходы',],
    labels:[
      t("employeExpenses"),
      t("rentMaintanance"),
      t("transportationExpenses"),
      t("administrativExpenses"),
      t("charitableExpenses"),
      t("obsolescenceExpenses"),
      t("otherExpenses"),
    ],
    datasets: [
      {
        data: chartData, 
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)', // Orange
          'rgba(144, 238, 144, 0.6)', // Light Green
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 206, 86, 1)', // Yellow
          'rgba(75, 192, 192, 1)', // Green
          'rgba(153, 102, 255, 1)', // Purple
          'rgba(255, 159, 64, 1)', // Orange
          'rgba(144, 238, 144, 1)', // Light Green
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,  // Smaller box size can give more space for text
          padding: 8,   // Increase padding for better spacing
          maxWidth: 150, // Increase maxWidth to prevent truncation
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return ` ${tooltipItem.raw}`;
          },
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      onHover: function (event, chartElement) {
        if (chartElement.length) {
          console.log('Hovered over:', chartElement[0].index);
        }
      },
    },
  };
  
  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
