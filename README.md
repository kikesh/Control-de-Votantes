# Voter Control App - UGT Sanidad Salamanca

This is a web application designed to manage and track voters during a union election. It provides real-time statistics, search and filtering capabilities, and allows for quick updates on a voter's status.

![Voter Control App Screenshot](https://i.imgur.com/example.png) <!-- It's recommended to replace this with an actual screenshot of the app -->

## ✨ Features

- **📊 Real-time Dashboard**: A summary of total voters, participation percentage, and breakdowns by affiliation and polling center.
- **🔍 Powerful Search**: Instantly find voters by name, surname, email, or phone number.
- **-  Filtering**: Easily filter the voter list by affiliation (union members vs. non-members), voting status (voted vs. not voted), and polling center.
- **✏️ Quick Status Updates**: Mark a voter as "voted" or undo the action with a single click. The UI updates optimistically for a smooth user experience.
- **📱 Responsive Design**: A mobile-first design that works beautifully on desktops, tablets, and phones.
- **🌐 Offline & Multi-tab Ready**: Uses `localStorage` to persist data, allowing the app to function offline and stay synchronized across different browser tabs.
- **🔔 Reminders**: A feature to simulate sending a voting reminder to a specific voter.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (loaded via CDN)
- **Modules**: Uses native ES Modules loaded directly in the browser from `esm.sh`.
- **Development Server**: [live-server](https://www.npmjs.com/package/live-server)

This project is set up to be build-less, meaning there's no complex build process required to run it in a development environment.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your machine.

### Installation & Running

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/voter-control-app.git
   cd voter-control-app
   ```
2. **Install development dependencies:**
   This will install `live-server`, which is used to serve the application locally.
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm start
   ```
   This command will automatically open the application in your default web browser at `http://127.0.0.1:8080`. The server supports live reloading, so any changes you make to the code will be reflected instantly in the browser.

## 📁 Project Structure

```
.
├── components/         # Reusable React components
│   ├── icons/          # SVG icon components
│   ├── ...
├── data/               # Mock data files
│   └── mockVoters.ts
├── services/           # Services for data fetching/manipulation
│   └── voterService.ts
├── App.tsx             # Main application component
├── index.html          # The single HTML entry point
├── index.tsx           # The React root renderer
├── types.ts            # TypeScript type definitions
├── tsconfig.json       # TypeScript compiler configuration
├── package.json        # Project metadata and scripts
└── README.md           # This file
```
