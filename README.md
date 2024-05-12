# Telegram Auth System

**tgauth** is a simple authentication system using Telegram bots to generate OTP (One-Time Password) codes and exchange them for JWT (JSON Web Token) for use in your projects.

## Features

- Generates OTP codes via Telegram bot.
- Validates OTP codes and issues JWT tokens.
- Provides a secure and easy-to-use authentication system.

## Technologies Used

- Express.js
- TypeScript
- grammmy.js
- JWT (JSON Web Token)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Telegram bot token (create a new bot and get the token from BotFather)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yvexeldev/tgauth.git
   ```

2. Install dependencies:

   ```bash
   cd tgauth
   npm install
   ```

3. Create a `.env` file in the root directory and add variables from `.env.example`:

   ```plaintext
   DATABASE = 
   DB_USERNAME = 
   DB_PASSWORD = 
   BOT_TOKEN = 
   CHANNEL = 
   ```

4. Start the application:

   ```bash
   npm run start
   ```

## Usage

1. Start the Telegram bot.
2. Send the command `/start` to the bot to receive an OTP code.
3. Use your phone number to get OTP code.
4. Get your OTP code & send the OTP code to the entry point (e.g., `/otp`) to receive a JWT token.
5. Use the JWT token for authentication in your project.

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](CONTRIBUTING.md).
