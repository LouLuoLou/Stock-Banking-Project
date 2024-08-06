const axios = require("axios");

const API_KEY = "I37P0QNJY45B58YI"; //API key from Alpha Vantage

//Fetches latest data for a given stock, using their ticker
const getStockData = async (symbol) => {
  try {
    // variable consisting of the API url with API KEY
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    // Fetch data from API
    const response = await axios.get(url);

    // Get stock data in intervals of 5 minutes
    const timeData = response.data["Time Series (5min)"];

    //If ticker invalid, return error
    if (!timeData) {
      throw new Error("No stock data found.");
    }

    // Get the latest timestamp and corresponding data
    const latestTime = Object.keys(timeData)[0];
    const latestData = timeData[latestTime];

    // Return data consisting of the ticker, closing price and the volume of the price at given time
    return {
      symbol,
      price: parseFloat(latestData["4. close"]),
      volume: parseInt(latestData["5. volume"]),
      time: latestTime,
    };
  } catch (error) {
    //Log error if no stock data could be fetched
    console.error("Failed to fetch stock data:", error.message);
    return null;
  }
};

//Export function for other files to use
module.exports = {
  getStockData,
};
