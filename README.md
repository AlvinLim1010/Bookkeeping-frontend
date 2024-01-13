# Bookkeeping Financial Manager Frontend
## Overview
This Vue.js frontend project is designed to interact with the Bookkeeping Financial Manager Backend. Users can create accounts, add bookkeeping actions, view account details, and visualize their financial data.

# Prerequisites
- Node.js version 18.18
- [Backend Repository](https://github.com/AlvinLim1010/Bookkeeping-API)

# Installation
1. Clone the repository:
   ```
   git clone https://github.com/AlvinLim1010/Bookkeeping-frontend.git
   ```
   
2. Navigate to the project directory:
   ```
   cd Bookkeeping-frontend
   ```

3. Install dependencies using npm:
   ```
   npm install
   ```

4. Create a new file named .env:
   > Copy all content in .env_sample.txt to .env, edit the .env file with your backend API URL and other necessary configurations. 

# Usage
Start the development server:
```
npm run serve
```
Access the frontend at http://localhost:8080 in your web browser.

# Features
- Account Creation: Users can create their own accounts.
- Bookkeeping Actions: Add bookkeeping actions via API calls to the backend.
- Account Overview: View a table and summary of account details.
- Visualizations: Explore visualizations based on account data.
