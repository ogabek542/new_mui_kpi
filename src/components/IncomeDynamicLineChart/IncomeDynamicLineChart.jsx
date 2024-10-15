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
  Filler,
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Custom plugin to draw static labels on top of each data point
ChartJS.register({
  id: 'staticDataLabels',
  afterDatasetsDraw: (chart) => {
    const { ctx, data } = chart;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      chart.getDatasetMeta(datasetIndex).data.forEach((dataPoint, index) => {
        const { x, y } = dataPoint.tooltipPosition();
        const value = dataset.data[index];

        ctx.save();
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = dataset.borderColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(value, x, y - 10);
        ctx.restore();
      });
    });
  },
});

const IncomeDynamicLineChart = () => {
  const data = {
    labels: [
      "Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5", "Cat 6", "Cat 7", "Cat 8",
      "Cat 9", "Cat 10", "Cat 11", "Cat 12", "Cat 13", "Cat 14", "Cat 15", "Cat 16", 
      "Cat 17", "Cat 18", "Cat 19", "Cat 20", "Cat 21", "Cat 22", "Cat 23", "Cat 24"
    ],
    datasets: [
      {
        label: 'ДОХОДЫ', // Label for the first line (income data)
        data: [933, 972, 975, 996, 1001, 951, 1050, 1005, 1065, 1062, 1103, 1066, 1096, 1147, 1134, 1123, 1190, 1097, 1204, 1183, 1313, 1274, 1313, 1328],
        backgroundColor: 'rgba(219, 226, 245, 0.5)',
        borderColor: 'rgba(81, 122, 191, 1)',
        borderWidth: 2,
        fill: true,
        pointRadius: 6,
        pointBorderWidth: 2,
        pointBorderColor: 'rgba(81, 122, 191, 1)',
        pointBackgroundColor: '#fff',
      },
    //   {
    //     label: 'РАСХОДЫ', // Label for the second line (expenses data)
    //     data: [477, 493, 526, 521, 537, 503, 596, 573, 632, 628, 654, 660, 645, 675, 692, 655, 734, 680, 726, 722, 828, 807, 881, 889],
    //     backgroundColor: 'rgba(251, 229, 206, 1)',
    //     borderColor: 'rgba(227, 100, 30, 1)',
    //     borderWidth: 2,
    //     fill: true,
    //     pointRadius: 6,
    //     pointBorderWidth: 2,
    //     pointBorderColor: 'rgba(227, 100, 30, 1)',
    //     pointBackgroundColor: '#fff',
    //   },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        right: 15,
        left: 10
      }
    },
    plugins: {
      legend: {
        display: false, // Hide legend
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: false, // Disable tooltips to avoid redundancy
      },
    },
    scales: {
      x: {
        ticks: {
          display: false, // Hide x-axis ticks
          autoSkip: true,
          maxRotation: 90,
          minRotation: 45,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      y: {
        beginAtZero: false, // Do not start the y-axis at 0
        ticks: {
          display: false, // Hide y-axis ticks
        },
        grid: {
          display: false, // Hide y-axis grid lines
        },
        suggestedMin: 0, // Suggests a minimum value for the y-axis
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: '#fff',
        borderColor: function (context) {
          return context.dataset.borderColor;
        },
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default IncomeDynamicLineChart;
