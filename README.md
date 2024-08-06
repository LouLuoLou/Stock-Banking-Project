# Stock Banking CLI Project

## Overview

The Stock Banking CLI Project is a command-line application for managing bank accounts and investing in stocks. It fetches the latest market data and simulates stock fluctuations, providing an engaging way to learn about stock investments and banking.

## Features

- **Banking Services:**

  - Create and manage checking and savings accounts.
  - Deposit and withdraw funds.
  - Transfer funds between accounts.

- **Stock Market Services:**

  - Fetch latest stock data from an API.
  - Simulate stock price fluctuations.
  - Buy and sell stocks.

- **User Interaction:**
  - Interactive command-line interface.
  - User-friendly prompts and error handling.

## Installation

1. **Clone the repository:**
   \`\`\`sh
   git clone https://github.com/LouLuoLou/Stock-Banking-Project.git
   cd Stock-Banking-Project
   \`\`\`

2. **Install dependencies:**
   \`\`\`sh
   npm install
   \`\`\`

## Usage

1. **Start the application:**
   \`\`\`sh
   npm start
   \`\`\`

2. **Follow the on-screen prompts to interact with the application.**

## Project Structure

\`\`\`

project
│ ├── app.js
│ ├── package.json
│ └── services
│ ├── bankingService.js
│ ├── stockService.js
│ └── storeService.js
\`\`\`

- **app.js:** Entry point of the application.
- **package.json:** Project metadata and dependencies.
- **services:** Contains the core services for banking, stock market, and data storage.

## Technologies Used

- **Node.js:** Runtime environment.
- **Inquirer:** For interactive command-line prompts.
- **Axios:** For making HTTP requests to fetch stock data.
- **Chalk:** For terminal string styling.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

## Author

Juan Reyes
