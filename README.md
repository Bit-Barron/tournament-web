# Tournament Hub Web Platform

A comprehensive web platform for managing gaming tournaments with advanced features and Discord integration.

## Features

### User Features
- Tournament Registration
- View Tournament Brackets
- Check Personal Statistics
- Join/Leave Tournaments
- View Tournament Status
- Live Match Updates
- 

### Admin Features
- Create and Manage Tournaments
- Generate Tournament Brackets
- Start/End Tournaments
- Cancel Tournaments
- Manage Participants
- Discord Integration for Notifications
- Advanced Analytics Dashboard

### Statistics and Analytics
- Player Performance Tracking
- Tournament History
- Win/Loss Ratios
- Ranking Systems
- Custom Report Generation

## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Real-time Updates: Socket.io
- Authentication: JWT
- Discord Integration: Discord.js

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   cd tournament-hub
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   DATABASE_URL=your_mongodb_url
   JWT_SECRET=your_secret_key
   DISCORD_BOT_TOKEN=your_discord_bot_token
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Discord Integration

To connect the admin panel with Discord:

1. Create a Discord application and bot at https://discord.com/developers/applications
2. Add the bot token to your `.env` file
3. Invite the bot to your server using the OAuth2 URL generator
4. Use the admin panel to configure which events should trigger Discord notifications

## API Endpoints

- `POST /api/tournaments`: Create a new tournament
- `GET /api/tournaments`: List all tournaments
- `GET /api/tournaments/:id`: Get tournament details
- `POST /api/tournaments/:id/join`: Join a tournament
- `POST /api/tournaments/:id/leave`: Leave a tournament
- `GET /api/users/:id/stats`: Get user statistics

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request
