import { useEffect, useState } from "react";
import { subscribeToStock } from "../api/stockApi";
import { useWatchlist } from "../context/WatchlistContext";
import { useAlerts } from "../context/AlertsContext";
import toast from "react-hot-toast";


const StockCard = ({ stock }) => {
    const [livePrice, setLivePrice] = useState(stock.price); //Keeps live prices stats
    const [alertInput, setAlertInput] = useState("");
    const { addToWatchlist } = useWatchlist();
    const { addAlert, alerts, removeAlert } = useAlerts();

    useEffect(() => {
        //Subscribe to live stock price updates
        const unsubscribe = subscribeToStock(stock.symbol, (data) => {
            setLivePrice(data.p);


            const alertPrice = alerts[stock.symbol];
            if (alertPrice && data.p >= alertPrice) {
                toast.success(`🔔 ${stock.symbol} has reached $${data.p.toFixed(2)}!`);
                removeAlert(stock.symbol);

            }

        });

        return () => unsubscribe();
    }, [stock.symbol, alerts, removeAlert]);



    const handleSetAlert = () => {
        const price = parseFloat(alertInput);
        if (!isNaN(price)) {
            addAlert(stock.symbol, price);
            toast.success(`Alert set at $${price.toFixed(2)} for ${stock.symbol}`);
            setAlertInput("");
        }
    };

    //const { alerts, removeAlert } = useAlerts();

    const hasAlert = alerts[stock.symbol];


    return (
        <div className="p-6 bg-white dark:bg-gray-700 shadow-md rounded-lg w-full text-center">
            <h2 className="text-xl font-semibold text-black dark:text-white">
                {stock.name} ({stock.symbol})
            </h2>

            <p className="text-3xl font-bold text-green-500">
                ${Number(livePrice ?? 0).toFixed(2)}
            </p>

            <p
                className={`text-lg font-semibold ${stock.change > 0 ? "text-green-600" : "text-red-600"
                    }`}
            >
                {stock.change > 0 ? "▲" : "▼"}{" "}
                {stock.changePercent != null ? `${stock.changePercent}%` : "N/A"}
            </p>

            <img
                src={`https://logo.clearbit.com/${stock.symbol
                    .split("-")[0]
                    .toLowerCase()}.com`}
                alt={`${stock.symbol} logo`}
                className="w-12 h-12 rounded-full mx-auto mb-2"
                onError={(e) => (e.target.style.display = "none")}
            />

            <button
                onClick={() => addToWatchlist(stock)}
                className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700"
            >
                ➕ Add to Watchlist
            </button>

            {/* 🔔 Set Price Alert Section */}
            <div className="mt-4">
                <input
                    type="number"
                    placeholder="Set alert price"
                    value={alertInput}
                    onChange={(e) => setAlertInput(e.target.value)}
                    className="p-2 border rounded bg-white dark:bg-gray-600 text-black dark:text-white"
                />
                <button
                    onClick={handleSetAlert}
                    className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Set Alert
                </button>
                {hasAlert && (
                    <p className="text-sm text-yellow-300 mt-2">
                        🔔 Alert set at ${hasAlert}{" "}
                        <button
                            onClick={() => removeAlert(stock.symbol)}
                            className="ml-2 text-xs text-red-400 hover:text-red-600"
                        >
                            ❌ Remove
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default StockCard;
