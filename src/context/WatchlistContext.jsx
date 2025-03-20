import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    // Load watchlist from localStorage when app starts
    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(savedWatchlist);
    }, []);

    // Save watchlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    // Function to add stock to watchlist
    const addToWatchlist = (stock) => {
        if (!watchlist.find((item) => item.symbol === stock.symbol)) {
            setWatchlist([...watchlist, stock]);
        }
    };

    // Function to remove stock from watchlist
    const removeFromWatchlist = (symbol) => {
        setWatchlist(watchlist.filter((item) => item.symbol !== symbol));
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

// Custom hook to use WatchlistContext
export const useWatchlist = () => {
    return useContext(WatchlistContext);
};
