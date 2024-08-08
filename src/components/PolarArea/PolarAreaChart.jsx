import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  PolygonElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  PolygonElement,
  Tooltip,
  Legend,
  Title
);

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

// Assuming `Utils` is defined somewhere in your code or you can use Chart.js utilities directly
const Utils = {
  CHART_COLORS: {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
  },
  transparentize: (color, opacity = 1) => {
    const alpha = Math.round(opacity * 255);
    return color.replace(/rgb\((\d+),(\d+),(\d+)\)/, (match, r, g, b) => `rgba(${r},${g},${b},${alpha / 255})`);
  },
  numbers: (cfg) => Array.from({ length: cfg.count }, () => Math.floor(Math.random() * (cfg.max - cfg.min + 1)) + cfg.min)
};

const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: [
        Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
        Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
        Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
        Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      ]
    }
  ]
};

const config = {
  type: 'polarArea',
  data: data,
  options: {
    responsive: true,
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Polar Area Chart With Centered Point Labels'
      }
    }
  }
};

const PolarAreaChart = () => (
  <div>
    <PolarArea data={data} options={config.options} />
  </div>
);

export default PolarAreaChart;
