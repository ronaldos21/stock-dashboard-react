import { useWatchlist } from "../context/WatchlistContext";
import React from "react";

const Watchlist = () => {
    const { watchlist, removeFromWatchlist } = useWatchlist();


    return (
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">📋 Your Watchlist</h2>
            {watchlist.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300">Your watchlist is empty.</p>
            ) : (
                <ul className="space-y-2">
                    {watchlist.map((stock) => (
                        <li key={stock.symbol || stock.name} className="flex justify-between items-center bg-white p-2 rounded dark:bg-gray-800">
                            <div>
                                <span className="font-medium text-black dark:text-white">
                                    {stock.name || "Unknown"} ({stock.symbol || "?"})
                                </span>
                            </div>
                            <button
                                onClick={() => removeFromWatchlist(stock.symbol)}
                                className="text-red-500 hover:text-red-700"
                            >
                                ❌ Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Watchlist;
