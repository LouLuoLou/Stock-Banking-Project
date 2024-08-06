const inquirer = require("inquirer"); // For asking questions in the terminal
const chalk = require("chalk"); // For adding color to console messages

let accounts = []; // Array to store account details

// Creates new account
const createAccount = async () => {
  // Display existing account names
  console.log(chalk.blue("Existing account names:"));
  for (let i = 0; i < accounts.length; i++) {
    console.log(chalk.greenBright(accounts[i].name));
  }

  // Variable for account
  let accountDetails;

  // Loop until valid account details are provided
  while (true) {
    accountDetails = await inquirer.prompt([
      { type: "input", name: "name", message: "Enter account holder name:" }, // Name for new account
      // Type of account being created
      {
        type: "input",
        name: "accountType",
        message: "Account type (checking/savings):",
        // Ensure that it is either checking or savings
        validate: (input) =>
          ["checking", "savings"].includes(input.toLowerCase()) ||
          'Enter "checking" or "savings"', // Validate account type
      },
      // Initial deposit for the account
      {
        type: "number",
        name: "initialDeposit",
        message: "Initial deposit amount:",
      }, // Initial deposit
    ]);

    // Check if account type is valid, 'checking', or 'savings'
    if (
      ["checking", "savings"].includes(accountDetails.accountType.toLowerCase())
    ) {
      accountDetails.balance = accountDetails.initialDeposit.toFixed(2);
      accounts.push(accountDetails); // Add account to the list of all the accounts
      console.log(chalk.green("Account created successfully!"), accountDetails);
      break;
    }
    // If account type not valid, ask again
    else {
      console.log(
        chalk.red('Invalid account type. Enter "checking" or "savings".')
      );
    }
  }
};

// View account details
const viewAccount = async () => {
  // Creates structure for account using inquirer prompt
  const { viewOption } = await inquirer.prompt([
    {
      type: "list",
      name: "viewOption",
      message: "What would you like to view?", // Question asked to
      choices: ["View a specific account", "View all accounts"], // Choices for viewing accounts
    },
  ]);

  // Options to view specific account or all of them
  if (viewOption === "View a specific account") {
    const { accountName } = await inquirer.prompt([
      { type: "input", name: "accountName", message: "Enter account name:" },
    ]);

    const account = accounts.find((acc) => acc.name === accountName);

    // If account found, parseFloat balance to 2 decimals, then log account details
    if (account) {
      account.balance = parseFloat(account.balance).toFixed(2); // Format balance
      console.log(chalk.green("Account details:"), account);
    } else {
      console.log(chalk.red("Account not found."));
    }
  } else {
    // Shows all the accounts
    accounts.forEach((account) => {
      account.balance = parseFloat(account.balance).toFixed(2); // Format balance
    });
    console.log("All accounts:", accounts);
  }
};

// Used to update the balance of a certain account
const updateAccountBalance = (name, amount) => {
  const account = accounts.find((acc) => acc.name === name);

  if (account) {
    account.balance = (parseFloat(account.balance) + amount).toFixed(2); // Update and format balance
    console.log(
      chalk.green(`Updated balance for ${name}: $${account.balance}`)
    );
  } else {
    console.log(chalk.red("Account not found."));
  }
};

// Function to get the balance of a certain account, takes name as input,
// if found, returns balance, else returns null
const getAccountBalance = (name) => {
  const account = accounts.find((acc) => acc.name === name);

  if (account) {
    return parseFloat(account.balance); // Return formatted balance
  } else {
    console.log(chalk.red("Account not found."));
    return null;
  }
};

// Export functions for other files
module.exports = {
  createAccount,
  viewAccount,
  updateAccountBalance,
  getAccountBalance,
};
