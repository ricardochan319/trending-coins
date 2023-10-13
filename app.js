// Import required modules using ES module syntax
import express from "express";
import axios from "axios";

// Create an Express app
const app = express();
const port = 3000; // Replace 3000 with your desired port number

app.use(express.static("public")); // Serve static files from the "public" folder

// Set the view engine to EJS
app.set("view engine", "ejs");

// Define a route for the home page that fetches trending coins and renders "app.ejs"
app.get("/", async (req, res) => {
  try {
    const apiKey = "CG-JXnoyvK3sFe3QTxfTE5AcCpU"; // Replace with your API key

    // Fetch trending coins data from the CoinGecko API with the API key as a query parameter
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        params: {
          x_cg_demo_api_key: apiKey,
        },
      }
    );

    // Extract the top 7 trending coins
    const trendingCoins = response.data.coins.slice(0, 7);

    // Render "app.ejs" and pass the trendingCoins data to the view
    res.render("app", { trendingCoins });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

// Define a route to refresh the data
app.post("/refresh", async (req, res) => {
  try {
    const apiKey = "CG-JXnoyvK3sFe3QTxfTE5AcCpU";

    // Fetch the latest trending coins data
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        params: {
          x_cg_demo_api_key: apiKey,
        },
      }
    );

    const trendingCoins = response.data.coins.slice(0, 7);

    // Render "app.ejs" and pass the refreshed trendingCoins data to the view
    res.render("app", { trendingCoins });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

// Start the Express app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
