import {Line} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import CardPanel from "@/components/card-panel.tsx";
import {useResultStore} from "@/components/data/result-store.tsx";

Chart.register(...registerables);

const EquityChart = () => {
    // Generate sample AAPL stock prices
    const labels = Array.from({length: 50}, (_, i) => `Day ${i + 1}`);

    // Starting with $10,000 and simulating realistic price changes
    const initialInvestment = 10000;
    const dataPoints = [
        initialInvestment,
        initialInvestment * 1.02, // Trade 1: +2%
        initialInvestment * 1.03, // Trade 2: +3%
        initialInvestment * 0.98, // Trade 3: -2%
        initialInvestment * 1.05, // Trade 4: +5%
        initialInvestment * 1.01, // Trade 5: +1%
        initialInvestment * 1.04, // Continued growth
        initialInvestment * 1.03,
        initialInvestment * 1.04,
        initialInvestment * 1.06,
        initialInvestment * 1.07,
        initialInvestment * 1.05,
        initialInvestment * 1.08,
        initialInvestment * 1.09,
        initialInvestment * 1.07,
        initialInvestment * 1.06,
        initialInvestment * 1.08,
        initialInvestment * 1.10,
        initialInvestment * 1.09,
        initialInvestment * 1.08,
        initialInvestment * 1.07,
        initialInvestment * 1.06,
        initialInvestment * 1.07,
        initialInvestment * 1.05,
        initialInvestment * 1.06,
        initialInvestment * 1.04,
        initialInvestment * 1.03,
        initialInvestment * 1.02,
        initialInvestment * 1.01,
        initialInvestment * 1.00,
        initialInvestment * 1.02,
        initialInvestment * 1.03,
        initialInvestment * 1.04,
        initialInvestment * 1.05,
        initialInvestment * 1.04,
        initialInvestment * 1.03,
        initialInvestment * 1.02,
        initialInvestment * 1.01,
        initialInvestment * 1.00,
        initialInvestment * 1.02,
        initialInvestment * 1.03,
        initialInvestment * 1.05,
        initialInvestment * 1.06,
        initialInvestment * 1.07,
        initialInvestment * 1.05,
        initialInvestment * 1.04,
        initialInvestment * 1.03,
        initialInvestment * 1.02,
        initialInvestment * 1.01,
        initialInvestment * 1.00,
        initialInvestment * 1.01,
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataPoints,
                fill: false,
                borderColor: 'rgba(0, 0, 0, 1)',
                tension:0, // Smoothing factor
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

    const equityChartData=useResultStore(state => state.equityChartData)

    return (
        <CardPanel headerText={"Equity chart"}>
            <div className={"h-48"}>
                {
                    equityChartData === undefined ? (
                        <div></div>
                    ) : (
                        <Line data={data} options={options}/>
                    )
                }
            </div>
        </CardPanel>
    )
};

export default EquityChart;
