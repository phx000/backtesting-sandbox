import {Line} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import CardPanel from "@/components/card-panel.tsx";

Chart.register(...registerables);

const PriceChart = () => {
    // Generate sample AAPL stock prices
    const labels = [
        'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5',
        'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10',
        'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15',
        'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20',
        'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25',
        'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30',
        'Day 31', 'Day 32', 'Day 33', 'Day 34', 'Day 35',
        'Day 36', 'Day 37', 'Day 38', 'Day 39', 'Day 40',
        'Day 41', 'Day 42', 'Day 43', 'Day 44', 'Day 45',
        'Day 46', 'Day 47', 'Day 48', 'Day 49', 'Day 50',
    ];

    const dataPoints = [
        145.0, 147.5, 148.2, 146.8, 150.0,
        149.5, 151.0, 152.0, 150.5, 153.0,
        154.2, 155.5, 157.0, 156.8, 158.0,
        159.5, 160.0, 161.0, 159.0, 158.5,
        157.5, 156.0, 155.0, 154.5, 153.5,
        155.2, 156.5, 157.5, 158.2, 159.5,
        161.0, 162.0, 163.0, 164.5, 165.0,
        166.0, 167.5, 168.0, 169.0, 170.0,
        171.0, 172.0, 173.0, 172.5, 171.5,
        170.5, 169.0, 168.5, 167.0, 166.0,
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataPoints,
                fill: false,
                borderColor: 'rgba(0, 0, 0, 1)',
                tension: 0, // Smoothing factor
                pointRadius: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false, // Disable tooltips
            },
        },
        maintainAspectRatio: false
    };

    return (
        <CardPanel headerText={"AAPL Price"}>
            <div className={"h-72"}>
                <Line data={data} options={options}/>
            </div>
        </CardPanel>
    )
};

export default PriceChart;
