const express = require("express");
const cors = require("cors");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());

// Helper function to calculate start date
const getStartDate = (range) => {
    const now = new Date();
    switch (range) {
        case "1mo":
            return new Date(now.setMonth(now.getMonth() - 1));
        case "6mo":
            return new Date(now.setMonth(now.getMonth() - 6));
        case "1y":
            return new Date(now.setFullYear(now.getFullYear() - 1));
        default:
            return new Date(now.setMonth(now.getMonth() - 1)); // Default to 1 month
    }
};

// Route to fetch stock historical data with a dynamic range
app.get("/api/stock-history/:symbol/:range", async (req, res) => {
    const { symbol, range } = req.params;

    try {
        console.log(`Fetching historical data for: ${symbol}, Range: ${range}`);

        const period1 = getStartDate(range).toISOString().split("T")[0];  // Correctly format the start date
        const period2 = new Date().toISOString().split("T")[0];  // Current date
        /*
        const period1 = getStartDate(range);
        const period2 = new Date();
        */

        const data = await yahooFinance.chart(symbol, {
            period1,
            period2,
            interval: "1d",
        });

        if (!data || !data.quotes || data.quotes.length === 0) {
            return res.status(404).json({ message: "No historical data found." });
        }

        const formattedData = data.quotes.map((entry) => ({
            date: new Date(entry.date).toISOString().split("T")[0], // ✅ Ensure date is a string
            close: entry.close,
        }));

        console.log("Formatted Stock History:", formattedData);
        res.json(formattedData);
    } catch (error) {
        console.error("Error fetching stock history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
