import { useWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
    const { watchlist, removeFromWatchlist } = useWatchlist();

    return (
        <div className="bg-white dark:bg-gray-400 p-4 shadow rounded-lg">

            <h2 className="text-lg font-semibold mb-2">📋 Your Watchlist</h2>
            {watchlist.length === 0 ? (
                <p className="text-gray-500">Your watchlist is empty.</p>
            ) : (
                <ul className="space-y-2">
                    {watchlist.map((stock) => (
                        <li key={stock.symbol} className="flex justify-between bg-white p-2 rounded">
                            <span>{stock.name} ({stock.symbol})</span>
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
