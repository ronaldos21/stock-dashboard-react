import { useEffect, useState } from "react";
import { subscribeToStock } from "../api/stockApi";
import { useWatchlist } from "../context/WatchlistContext";


const StockCard = ({ stock }) => {
    const [livePrice, setLivePrice] = useState(stock.price); //Keeps live prices stats
    const { addToWatchlist } = useWatchlist();

    useEffect(() => {
        //Subscribe to live stock price updates
        const unsubscribe = subscribeToStock(stock.symbol, (data) => {
            setLivePrice(data.p);

        });

        return () => unsubscribe();
    }, [stock.symbol]);



    return (
        <div className="p-6 bg-white dark:bg-gray-700 shadow-md rounded-lg w-full text-center">
            <h2 className="text-xl font-semibold">{stock.name} ({stock.symbol})</h2>
            <p className="text-3xl font-bold text-green-500">${livePrice}</p>
            <p className={`text-lg font-semibold ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change > 0 ? "▲" : "▼"} {stock.changePercent}%
            </p>
            <button
                onClick={() => addToWatchlist(stock)}
                className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700"
            >
                ➕ Add to Watchlist
            </button>
        </div>
    );
};

export default StockCard;
