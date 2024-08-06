const inquirer = require("inquirer");
const apiService = require("./apiService");
const chalk = require("chalk");
const bankingService = require("./bankingService");

// Allows investment in a stock
const investInStock = async () => {
  // Prompt for account name
  const { accountName } = await inquirer.prompt([
    { type: "input", name: "accountName", message: "Enter account name:" },
  ]);

  // Retrieve balance of the specified account
  const accountBalance = bankingService.getAccountBalance(accountName);
  if (accountBalance === null) {
    return; // Exit if account not found
  }

  // Ask user for the ticker for the stock
  const { stockSymbol } = await inquirer.prompt([
    { type: "input", name: "stockSymbol", message: "Enter stock symbol:" },
  ]);

  // Fetch stock data for the given symbol
  const stockData = await apiService.getStockData(stockSymbol);
  if (!stockData) {
    return; // Exit if stock data not available
  }

  // Displays current price for the given ticker
  console.log(`Current price of ${stockSymbol}: $${stockData.price}`);

  // Ask user for investment amount
  const { amount } = await inquirer.prompt([
    { type: "number", name: "amount", message: "Investment amount:" },
  ]);

  // Check if account has sufficient funds
  if (amount > accountBalance) {
    console.log(chalk.red("Insufficient funds.")); // Error message for insufficient funds
    return; // Exit if funds are insufficient
  }

  // Deduct investment amount from account balance
  bankingService.updateAccountBalance(accountName, -amount);

  // Simulate stock price fluctuation
  const initialPrice = stockData.price;
  const fluctuation = (Math.random() - 0.5) * 2; // Random price fluctuation
  stockData.price += fluctuation; // Update stock price
  const returnAmount = amount * (stockData.price / initialPrice); // Calculate return amount
  const gainOrLoss = returnAmount - amount; // Calculate gain or loss

  // Display updated stock price and return/loss
  console.log(
    chalk.green(`New price of ${stockSymbol}: $${stockData.price.toFixed(2)}`)
  );
  console.log(chalk.green(`Return/Loss: $${gainOrLoss.toFixed(2)}`));

  // Update account balance with the return amount
  bankingService.updateAccountBalance(accountName, returnAmount);
};

//Export investInStock function for other files to use
module.exports = {
  investInStock,
};
