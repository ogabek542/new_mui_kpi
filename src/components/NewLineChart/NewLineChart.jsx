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
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NewLineChart = () => {
  const data = {
    labels: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page A', 'Page B', 'Page C', 'Page D', 'Page E'],
    datasets: [
      {
        label: 'PLAN',
        data: [2000, 1398, 9800, 3908, 4800, 3020, 4014, 8021, 1000, 1250],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0, // Straight line
      },
      {
        label: 'FACT',
        data: [300, 3000, 6200, 7100, 8000, 6000, 10000, 3000, 4500, 5500],
        backgroundColor: 'rgba(144, 238, 144, 0.4)',
        borderColor: 'rgba(144, 238, 144, 1)',
        borderWidth: 2,
        tension: 0, // Straight line
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

export default NewLineChart;
