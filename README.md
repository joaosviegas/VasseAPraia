# README.md

# React Weather App

This is a React application designed to provide users with information about beach conditions, including warnings, sea conditions, and UV index. The app features a clean and responsive design, making it easy to navigate and access important information.

## Project Structure

The project is organized into the following components:

1. **Header**: Contains the logo and navigation links.
2. **Hero**: Displays the main title and call-to-action button.
3. **Features**: Contains multiple feature cards that describe the application's functionalities.
4. **DataContainers**: Displays various data cards for warnings, sea conditions, and UV index.
5. **Rankings**: Displays the rankings of beaches, including individual station rankings and a legend.
6. **Footer**: Contains copyright information and links.

## File Structure

```
react-weather-app
├── backend
│   ├── app.py
│   ├── beach_ranker.py
│   └── requirements.txt
├── src
│   ├── components
│   │   ├── Header
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Hero
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── Features
│   │   │   ├── Features.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   └── Features.css
│   │   ├── DataContainers
│   │   │   ├── DataContainers.jsx
│   │   │   ├── WarningsCard.jsx
│   │   │   ├── SeaCard.jsx
│   │   │   ├── UVCard.jsx
│   │   │   └── DataContainers.css
│   │   ├── Rankings
│   │   │   ├── Rankings.jsx
│   │   │   ├── StationRanking.jsx
│   │   │   ├── Legend.jsx
│   │   │   └── Rankings.css
│   │   └── Footer
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public
│   ├── favicon.svg
│   └── logo.svg
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd react-weather-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Technologies Used

- React
- Vite
- CSS

## License

This project is licensed under the MIT License. See the LICENSE file for more details.