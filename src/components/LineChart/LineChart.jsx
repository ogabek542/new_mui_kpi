import * as React from 'react';
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
  Filler,
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,Filler);

const NoIncomeLineChart = ({ planData, factData }) => {
  const data = {
    labels:["Комиссионные доходы", "Прибыль в иностранной валюте", "Прибыль и дивиденды от инвестиций", "Другие беспроцентные доходы"],
    datasets: [
      {
        
        label: 'ПЛАН',
        data:  planData,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'ФАКТ',
        data: factData,
        backgroundColor: 'rgba(144, 238, 144, 0.4)',
        borderColor: 'rgba(144, 238, 144, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end', // Align the legend to the right
        labels: {
          usePointStyle: true, // Use point styles instead of box styles
          pointStyle: 'circle', // Set the point style to circle
        },
      },
      title: {
        display: false,
      },
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'end',
        formatter: function(value, context) {
          const index = context.dataIndex;
          const dataset = context.dataset;
          if (index === dataset.data.length - 1) {
            return dataset.label;
          }
          return '';
        },
        font: {
          weight: 'bold',
        },
        color: function(context) {
          return context.dataset.borderColor;
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    // animation: {
    //   duration: 2000, // Duration of the animation
    //   easing: 'easeInOutQuad', // Animation easing function
    //   onProgress: function(animation) {
    //     // Optional: Custom function to run during animation progress
    //   },
    //   onComplete: function(animation) {
    //     // Loop the animation indefinitely
    //     const chart = animation.chart;
    //     if (chart.options.animation) {
    //       chart.options.animation.onComplete = function() {
    //         chart.update(); // Re-render the chart
    //       };
    //     }
    //   },
    // },
  };
  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none', padding: '0px' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoIncomeLineChart;



// AreaLineChart
