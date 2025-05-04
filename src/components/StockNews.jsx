import React, { useEffect, useState } from "react";
import axios from "axios";

const sentimentKeywords = {

    positive: ["gain", "growth", "surge", "beat", "profit", "soar", "bullish", "strong"],
    negative: ["loss", "fall", "drop", "decline", "miss", "lawsuit", "bearish", "weak"]
};

const analyzeStockNews = (title) => {
    const lower = title.toLowerCase();
    const isPositive = sentimentKeywords.positive.some((word) => lower.includes(word));
    const isNegative = sentimentKeywords.negative.some((word) => lower.includes(word));

    if (isPositive && !isNegative) {
        return "positive";
    }
    if (isNegative && !isPositive) {
        return "negative";
    }
    else {
        return "neutral";
    }
};

const NewsSentiment = ({ symbol }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(`http://localhost:5004/api/news/${symbol}`);
                setNews(res.data);
            } catch (err) {
                setError("Failed to fetch news");
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [symbol]);

    if (loading) return <p className="text-gray-500">Loading news...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white dark:bg-gray-700 rounded shadow p-4 mt-4">
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
                🧠 News Sentiment for {symbol}
            </h2>
            <ul className="space-y-4">
                {news.map((article, idx) => {
                    const sentiment = analyzeStockNews(article.title);
                    const sentimentColor =
                        sentiment === "positive"
                            ? "text-green-500"
                            : sentiment === "negative"
                                ? "text-red-500"
                                : "text-yellow-500";

                    return (
                        <li key={idx} className="border-b pb-2 border-gray-300 dark:border-gray-600">
                            <p className="text-black dark:text-white font-medium flex items-center gap-2">
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline flex items-center gap-1"
                                >
                                    <span role="img" aria-label="link">📰</span> {article.title}
                                </a>
                            </p>
                            <div className="text-sm flex justify-between">

                                <span className="text-gray-500 dark:text-gray-300 flex items-center gap-1">
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${new URL(article.url).hostname}`}
                                        alt="favicon"
                                        className="w-4 h-4"
                                    />
                                    {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
                                </span>


                                <span className={`font-semibold ${sentimentColor}`}>{sentiment}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NewsSentiment;
