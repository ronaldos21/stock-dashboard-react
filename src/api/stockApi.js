import axios from "axios";

// Finnhub API Key (for WebSocket streaming)
const FINNHUB_API_KEY = "cva81u9r01qshflglipgcva81u9r01qshflgliq0";
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

/**
 * Fetches real-time stock price and change percentage
 */
export const fetchStockData = async (symbol) => {
    try {
        const response = await axios.get(`http://localhost:5004/api/quote/${symbol}`);
        const data = response.data;

        return {
            name: data.name || symbol,
            symbol: data.symbol,
            price: data.price,
            change: data.change,
            changePercent: (data.changePercent * 100).toFixed(2), // Make sure it's a %
        };
    } catch (error) {
        console.warn(`Fallback failed for ${symbol}, trying Finnhub...`);

        // Fallback to Finnhub if Yahoo fails
        try {
            const fallback = await axios.get(`${FINNHUB_BASE_URL}/quote`, {
                params: {
                    symbol: symbol,
                    token: FINNHUB_API_KEY,
                },
            });

            const quote = fallback.data;

            return {
                name: symbol,
                symbol: symbol,
                price: quote.c ?? 0,
                change: quote.d ?? 0,
                changePercent: quote.dp ?? 0,
            };
        } catch (finnhubError) {
            console.error("Both Yahoo and Finnhub failed:", finnhubError);
            return null;
        }
    }
};

/**
 * Fetches historical stock data for the past 30 days
 */
export const fetchStockHistory = async (symbol, range = "1mo") => {
    try {
        const response = await axios.get(`http://localhost:5004/api/stock-history/${symbol}/${range}`);
        console.log("Fetched Stock History Data:", response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error("Error fetching stock history:", error);
        return [];
    }
};

/**
 * Fetches symbol suggestions based on a query using Finnhub
 */
export const searchStockSymbols = async (query) => {
    try {
        const response = await axios.get(`${FINNHUB_BASE_URL}/search`, {
            params: {
                q: query,
                token: FINNHUB_API_KEY,
            },
        });

        return response.data.result || [];
    } catch (error) {
        console.error("Error fetching search suggestions:", error);
        return [];
    }
};


/**
 * Subscribes to real-time stock price updates via WebSocket
 */
export const subscribeToStock = (symbol, onMessage) => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);

    socket.onopen = () => {
        console.log(`WebSocket connected for ${symbol}`);
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.data) {
            onMessage(data.data[0]); // Update stock price
        }
    };

    socket.onerror = (error) => {
        console.error("WebSocket Error: ", error);
    };

    socket.onclose = () => {
        console.log(`WebSocket closed for ${symbol}`);
    };

    // Return an unsubscribe function to clean up WebSocket
    return () => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        }
        socket.close();
    };
};