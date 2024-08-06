const inquirer = require("inquirer");
const chalk = require("chalk");
const bankingService = require("./services/bankingService");
const stockService = require("./services/stockService");
// const storeService = require("./services/storeService")

// Main function to start application
const main = async () => {
  // Display a welcome message multiple times
  console.log(chalk.green("Welcome to the Stock Banking CLI!"));

  while (true) {
    // Display main menu and get user's action
    const { action } = await inquirer.prompt([
      {
        type: "list", // Creates a type of list for choices
        name: "action", // Name of the key to hold user input for the action
        message: "Select an action:",
        choices: ["Create Account", "View Account", "Invest in Stock", "Exit"], // List of actions
      },
    ]);

    // Execute action chosen by the customer
    if (action === "Create Account") {
      // Calls function from bankingService.js to create an account
      await bankingService.createAccount();
    }
    // Calls viewAccount function from bankingService.js to view account
    else if (action === "View Account") {
      await bankingService.viewAccount();
    }
    // Calls investInStock function from stockService.js
    else if (action === "Invest in Stock") {
      await stockService.investInStock(); // Call function to invest in stock
    }
    // Exits the application
    else if (action === "Exit") {
      // Display exit message and terminate the application
      console.log(chalk.blue("Goodbye!"));
      break;
    }
  }
};

// Start the application
main();
