const express = require("express");
const cors = require("cors");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors()); // Enable CORS to allow frontend requests

// Route to fetch stock historical data
app.get("/api/stock-history/:symbol", async (req, res) => {
    const { symbol } = req.params;

    try {
        console.log(`Fetching historical data for: ${symbol}`);
        const data = await yahooFinance.chart(symbol, {
            period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            period2: new Date(), // Current date
            interval: "1d",
        });

        if (!data || !data.quotes || data.quotes.length === 0) {
            return res.status(404).json({ message: "No historical data found." });
        }

        // ✅ Correct date formatting
        const formattedData = data.quotes.map((entry) => ({
            date: new Date(entry.date).toISOString().split("T")[0], // Ensure date is properly formatted
            close: parseFloat(entry.close.toFixed(2)), // Ensure decimal precision
        }));

        // ✅ Get latest closing price
        const latestPrice = formattedData.length > 0 ? formattedData[formattedData.length - 1].close : null;

        console.log("Formatted Stock History:", formattedData);
        res.json({ history: formattedData, latestPrice });
    } catch (error) {
        console.error("Error fetching stock history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
