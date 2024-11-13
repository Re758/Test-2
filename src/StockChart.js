// src/StockChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const StockChart = ({ stockData }) => {
    const labels = stockData.map(data => data.date);
    const quantities = stockData.map(data => data.quantity);

    const data = {
        labels,
        datasets: [
            {
                label: 'Product Quantity Over Time',
                data: quantities,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Quantity',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Stock Quantity Trend</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default StockChart;