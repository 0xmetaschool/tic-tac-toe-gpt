# TicTacToeGPT
TicTacToeGPT brings the classic game to life with a smart AI opponent and customizable gameplay. Challenge yourself with different board sizes and AI difficulties to improve your strategic thinking.

Built with Next.js and OpenAI, this open-source template lets developers create their own version of an AI-powered Tic Tac Toe game. Features include user accounts, multiple board sizes (3x3 to 5x5), and three AI difficulty levels to match your skill.

## Live Demo
[https://tic-tac-toe-gpt.vercel.app/](https://tic-tac-toe-gpt.vercel.app/)

## Features
- Smart AI opponent with multiple personalities through OpenAI integration and adaptive difficulty levels (easy/medium/hard)
- Expandable game boards up to 5x5 with real-time move validation and win detection algorithms
- Comprehensive player stats dashboard tracking win rates, game duration, and performance analytics
- Modern responsive UI with smooth animations and customizable game settings

## Technologies Used

- Next.js and React for Frontend and Backend
- Tailwind CSS for Styling
- OpenAI API for AI-Powered Features

## Use Cases
- An educational tool for students to learn strategy through AI gameplay
- A stats platform to track player progress and analyze game patterns
- A training system to practice advanced moves on larger game boards

## Installation Steps
**1. Clone the repository:**

```bash
git clone https://github.com/0xmetaschool/tic-tac-toe-gpt.git
cd tic-tac-toe-gpt
```

**2. Install dependencies:**

```bash
npm install
```
**3. Set up the database:**
Ensure you have MongoDB installed and running on your system, or use a cloud-hosted MongoDB service like MongoDB Atlas. Create a new Cluster, select a free plan, and copy the connection string, this will be required in the next step.

**4. Set up environment variables:**
Create a `.env.local` file in the root directory and add:

```
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**5. Run the development server:**

```bash
npm run dev
```

**6. Open your browser and navigate to `http://localhost:3000`**

## Screenshots
<div style="display: flex; justify-content: space-between; padding:20px;">
  <img src="https://github.com/0xmetaschool/tic-tac-toe-gpt/blob/main/public/tic-tac-toe-gpt-template-landing-page.png?raw=true" alt="TicTacToeGPT Template Landing Page screenshot" style="width: 49%; border: 2px solid black;" />
  <img src="https://github.com/0xmetaschool/tic-tac-toe-gpt/blob/main/public/tic-tac-toe-gpt-template-home-page.png?raw=true" alt="TicTacToeGPT Template Home Page screenshot" style="width: 49%; border: 2px solid black;" />
</div>
<div style="display: flex; justify-content: space-between;padding:20px;">
  <img src="https://github.com/0xmetaschool/tic-tac-toe-gpt/blob/main/public/tic-tac-toe-gpt-template-game-page.png?raw=true" alt="TicTacToeGPT Template Game Page screenshot" style="width: 49%; border: 2px solid black;" />
</div>


## How to use the application

1. Sign in using your email and password.
2. Choose your board size and difficulty level
3. Click "Start Game" to play with AI.
4. Make your move and start playing the game.
5. After the game you either go back to the main page or play again.
6. Game stats will be updated on the main page after every game.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/0xmetaschool/tic-tac-toe-gpt/blob/main/LICENSE) file for details.

## Contact

Please open an issue in the GitHub repository for any queries or support.
