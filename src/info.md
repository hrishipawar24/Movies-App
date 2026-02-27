# CineQuest - Premium Movie Discovery

## 🎬 What is CineQuest?
**CineQuest** is a modern, high-performance movie discovery web application designed to provide a premium and fluid user experience. Unlike basic search tools, CineQuest focuses on visual excellence and deep data retrieval, allowing users to explore the vast cinematic universe with ease.

## 🚀 Key Features

### 1. Search-Centric Experience
Inspired by the minimalist efficiency of Google, CineQuest features a prominent central search engine on the home page. It allows users to query millions of titles instantly—from blockbuster movies to niche series and episodes.

### 2. Interactive Movie Cards
The application utilizes a responsive grid of "Glassmorphism" cards. Each card features:
- **Hover Micro-animations**: Smooth scaling and glowing effects.
- **Dynamic Overlays**: Quick-view labels that appear on interaction.
- **Visual Resilience**: Automatic fallback handling for missing or broken movie posters.

### 3. Detailed Cinematic Data
Clicking on any movie surfaces a **MovieDetailsModal**. This component performs a secondary, highly specific API fetch to retrieve:
- **Comprehensive Plot Summaries**
- **Full Cast & Crew Information**
- **Live IMDb Ratings**
- **Runtime and Genre Metadata**

### 4. Premium Aesthetic
Built with a "Dark-Mode First" philosophy, the UI leverages:
- **Glassmorphism**: Transparent, blurred backgrounds for a sleek, modern feel.
- **Fluid Layouts**: A fully responsive design using CSS Grid and Flexbox.
- **Custom Typography**: Integration with the `Outfit` font family for maximum readability.

---

## 🛠 How It Works (Technology Stack)

### The Core Engine: React.js
The application is built using **React**, utilizing functional components and hooks (`useState`, `useEffect`) to manage global and local application states.

### Data Sourcing: OMDB API
CineQuest interfaces with the **Open Movie Database (OMDB) API** using **Axios** for asynchronous HTTP requests. 
- **Search Flow**: The app performs a "Search" (`s=`) query to populate the results grid.
- **Detail Flow**: The app performs an "ID" (`i=`) query using the movie's unique IMDb ID to fetch full details for the modal.

### Styling: Global CSS
A centralized architecture is used where all component styles are consolidated into a single `global.css` file. This ensures design consistency, faster load times, and easier maintenance of the design system.

### State Management
- **Search State**: Tracks whether a user has active results or is on the landing page.
- **Loading State**: Manages custom animated spinners during API latency.
- **Error State**: Gracefully handles invalid searches or network failures.

---
*Created with ❤️ for cinema enthusiasts.*
