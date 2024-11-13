import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Chart.css';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ products }) => {
    // Check if products are available
    if (!products || products.length === 0) {
        return <p>No products available to display in the chart.</p>;
    }

    const chartData = {
        labels: products.map(product => product.name),
        datasets: [
            {
                label: 'Quantity in Stock',
                data: products.map(product => parseInt(product.quantity, 10) || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">Stock Levels Available Currently</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Quantity'
                            }
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                }} 
            />
        </div>
    );
};

export default ChartComponent;