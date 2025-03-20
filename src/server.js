const express = require("express"); // Creates a web server
const cors = require("cors"); // Allows requests from the frontend
const yahooFinance = require("yahoo-finance2").default; // Fetches stock data

const app = express(); // Creates an instance of the Express server
const PORT = process.env.PORT || 5004; // Port number

app.use(cors()); // Enable CORS to allow frontend requests

// ✅ Route to fetch stock historical data
app.get("/api/stock-history/:symbol", async (req, res) => {
    const { symbol } = req.params;

    try {
        console.log(`Fetching historical data for: ${symbol}`);

        // ✅ Define date range (Last 30 days)
        const period1 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        const period2 = new Date(); // Today

        // ✅ Fetch data from Yahoo Finance
        const result = await yahooFinance.chart(symbol, {
            period1: period1.toISOString(),
            period2: period2.toISOString(),
            interval: "1d",
        });

        // 🔥 Debugging: Log full API response
        console.log("Full Yahoo Finance API Response:", JSON.stringify(result, null, 2));

        // ✅ Extract historical data correctly from `quotes`
        if (!result || !result.quotes || result.quotes.length === 0) {
            console.error("Error: No historical data received");
            return res.status(404).json({ message: "No historical data found." });
        }

        // ✅ Fix: Ensure date is converted to a string before formatting
        const formattedData = result.quotes.map((entry) => ({
            date: new Date(entry.date).toISOString().split("T")[0], // Convert Date to String format YYYY-MM-DD
            close: entry.close, // Closing price
        }));

        console.log("Formatted Stock History:", formattedData);
        res.json(formattedData);
    } catch (error) {
        console.error("Error fetching stock history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
