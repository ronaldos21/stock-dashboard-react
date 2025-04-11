// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import StockSearch from '../components/StockSearch';
import StockCard from '../components/StockCard';
import StockChart from '../components/StockChart';
import Watchlist from '../components/Watchlist';
import TrendingStocks from '../components/TrendingStocks';
import { fetchStockHistory, fetchStockData } from '../api/stockApi';
import CompareStocks from '../components/CompareStocks';

const Dashboard = () => {
    const [stock, setStock] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [range, setRange] = useState('1mo');

    const handleSearch = async (symbol) => {
        setLoading(true);
        setError('');
        setStock(null);
        setChartData([]);

        try {
            const stockInfo = await fetchStockData(symbol);
            if (!stockInfo || !stockInfo.symbol) {
                setError('Stock not found. Please try again.');
                setLoading(false);
                return;
            }

            setStock(stockInfo);

            const history = await fetchStockHistory(symbol, range);
            if (!history || history.length === 0) {
                setError('No historical data available.');
                setLoading(false);
                return;
            }

            setChartData(history);
        } catch (err) {
            console.error('Error in handleSearch:', err);
            setError('Failed to fetch stock data. Try again later.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <StockSearch onSearch={handleSearch} />

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => setRange('1mo')}
                        className={`px-4 py-2 rounded ${range === '1mo' ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-600 dark:text-white'}`}
                    >
                        1 Month
                    </button>
                    <button
                        onClick={() => setRange('6mo')}
                        className={`px-4 py-2 rounded ${range === '6mo' ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-600 dark:text-white'}`}
                    >
                        6 Months
                    </button>
                    <button
                        onClick={() => setRange('1y')}
                        className={`px-4 py-2 rounded ${range === '1y' ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-600 dark:text-white'}`}
                    >
                        1 Year
                    </button>
                </div>

                <Watchlist />
                <TrendingStocks onSearch={handleSearch} />
                {loading && <p className="text-center text-gray-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {stock && <StockCard stock={stock} />}
                {chartData.length > 0 && <StockChart stockHistory={chartData} />}

                {/* Compare Stocks Section */}
                <CompareStocks />

            </div>
        </div>
    );
};

export default Dashboard;
