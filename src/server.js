const express = require("express");
const cors = require("cors");
const yahooFinance = require("yahoo-finance2").default; // ✅ Only use in backend!

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors()); // Enable CORS to allow frontend requests

// Route to fetch stock historical data
app.get("/api/stock-history/:symbol", async (req, res) => {
    const { symbol } = req.params;

    try {
        const data = await yahooFinance.historical(symbol, {
            period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            period2: new Date(), // Current date
            interval: "1d",
        });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No historical data found." });
        }

        const formattedData = data.map((entry) => ({
            date: entry.date.toISOString().split("T")[0],
            close: entry.close,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("Error fetching stock history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
