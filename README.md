# Vasse à Praia? 🌊☀️  

**Your All-in-One Madeira Beach Weather Companion**  

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Portuguese Madeira](https://img.shields.io/badge/%F0%9F%87%B5%F0%9F%87%B9-Portugal%20Madeira-1a73e8)](https://visitmadeira.com)  


Born from countless trips to Madeira's hidden beaches, **Vasse à Praia?** solves a local problem: finding real-time weather conditions across the island's diverse microclimates.  

Unlike generic weather apps, we focus specifically on relevant beach metrics for Madeira's unique coastal environment.

## Key Features 🌟  
- **Real-Time Beach Rankings** - Compare conditions across 11 municipalities  
- **UV Radiation Tracker** - With peak hour forecasts for sun safety  
- **Coastal Warnings** - Instant alerts for strong winds/swell   

## Tech Stack 💻  
**Frontend**  
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)  
[![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite)](https://vitejs.dev/)  

**Backend**  
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)](https://www.python.org/)  
[![Flask](https://img.shields.io/badge/Flask-2.3-000000?logo=flask)](https://flask.palletsprojects.com/)  

**Data Sources**  
[![IPMA](https://img.shields.io/badge/Weather%20Data-IPMA%20API-1a73e8)](https://www.ipma.pt)  

## Project Structure 🗂️  

```
react-weather-app
├── backend
│   ├── app.py
│   ├── beach_ranker.py
│   └── requirements.txt
├── commomn
│   ├── Tooltip.sjsx
│   └── Tooltip.css
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
