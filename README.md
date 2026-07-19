# 🌧️ RainSafe Route
### AI-Powered Flood-Aware Navigation System

RainSafe Route is a smart navigation system that helps commuters choose safer routes during monsoon conditions by analyzing **flood-prone locations, rainfall data, and route information**.

Traditional navigation systems optimize only for **distance and travel time**, but they do not consider real-world problems like **waterlogging and flood-prone roads**. RainSafe Route bridges this gap by adding a flood risk intelligence layer on top of route planning.

https://aws-project-rain-route-finder.vercel.app/ 
---

## 🚨 Problem Statement

During heavy rainfall in cities like Delhi, Mumbai, and Bengaluru:

- Roads become waterlogged.
- Common routes become unsafe.
- People waste time stuck in flooded areas.
- Existing navigation apps do not provide flood-aware routing.

A commuter needs to know:

> "Is the fastest route actually the safest route during monsoon?"

---

# 💡 Solution

RainSafe Route allows users to enter:

```
Source → Destination
```

The system:

1. Finds the optimal route.
2. Checks nearby flood-prone locations.
3. Analyzes current rainfall conditions.
4. Calculates a flood risk score.
5. Provides a travel recommendation.

Example:

```
Route Risk: HIGH

Risk Score: 78/100

Recommendation:
🚫 Avoid this route if possible

Reasons:
• Heavy rainfall detected
• Route passes near high-risk flood zones
```

---

# ✨ Features

## 🗺️ Smart Route Planning

- Converts user locations into coordinates.
- Generates road routes.
- Displays routes interactively on a map.

## 🌧️ Rainfall Analysis

Uses live weather information to understand current rain conditions.

## 🚨 Flood Risk Detection

Analyzes whether the route passes near known flood hotspots.

## 📊 Risk Scoring System

Generates a flood risk score based on:

- Nearby flood hotspots
- Severity of flood zones
- Current rainfall

## 🚦 Travel Recommendation

Provides actionable suggestions:

| Risk Level | Recommendation |
|---|---|
| 🟢 Low | Safe to travel |
| 🟠 Medium | Travel with caution |
| 🔴 High | Avoid route if possible |

## 🗺️ Interactive Map

Displays:

- User route
- Source and destination markers
- Flood risk zones

---

# 🏗️ System Architecture


```
                User
                 |
                 |
          React Frontend
                 |
                 |
          Express Backend
                 |
        -------------------
        |        |        |
        |        |        |
 OpenRoute   Open-Meteo  Supabase
 Service      Weather    Database
        |
        |
 OpenStreetMap
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Leaflet
- Axios
- CSS

## Backend

- Node.js
- Express.js

## Database

- Supabase PostgreSQL

## APIs Used

### 🗺️ OpenStreetMap

Used for:

- Map visualization
- Geographic data

### 📍 Nominatim API

Used for:

- Converting locations into coordinates

Example:

```
Laxmi Nagar, Delhi

↓

28.6305, 77.2775
```

### 🚗 OpenRouteService API

Used for:

- Route generation
- Distance calculation
- Travel duration

### 🌦️ Open-Meteo API

Used for:

- Current rainfall data
- Weather conditions

---

# 📂 Project Structure

```
RainSafeRoute/

│
├── frontend/
│
│   ├── src/
│   │   ├── components/
│   │   │
│   │   ├── MapView.jsx
│   │   └── SearchBar.jsx
│   │
│   └── package.json
│
│
├── backend/
│
│   ├── routes/
│   ├── services/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🗄️ Database Design

Flood hotspots are stored in Supabase.

Example:

| Latitude | Longitude | Severity |
|---|---|---|
|28.6139|77.2090|HIGH|
|28.6305|77.2775|MEDIUM|

The backend checks whether generated routes pass near these locations.

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Dare-TechieZ/aws-project-rain-route-finder.git

cd RainSafeRoute
```

---

# Backend Setup

Navigate:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000

OPENROUTE_API_KEY=your_api_key

SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key
```

Run server:

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔄 Workflow

```
User enters source and destination

          ↓

Location converted into coordinates

          ↓

Route fetched from OpenRouteService

          ↓

Route checked against flood hotspots

          ↓

Weather conditions analyzed

          ↓

Risk score generated

          ↓

Travel recommendation displayed

```

---

# 📈 Future Scope

## 1. AI-Based Flood Prediction

Train ML models using:

- Historical rainfall
- Flood reports
- Satellite imagery

to predict future waterlogging.

## 2. Alternative Safe Routes

Generate:

```
Fastest Route
        vs
Safest Route
```

during extreme weather.

## 3. Citizen Reporting System

Allow users to report:

- Waterlogged roads
- Blocked streets
- Flood severity

## 4. Government Integration

Possible integration with:

- Smart city dashboards
- Municipal flood monitoring systems

---

# 🌍 Impact

RainSafe Route can help:

- Daily commuters
- Delivery workers
- Emergency services
- City disaster management teams

by reducing exposure to unsafe roads during extreme rainfall.

---

# 👩‍💻 Built By

**Ria Saraswat**

B.Tech Information Technology  
IGDTUW

---

⭐ If this project helps make monsoon travel safer, consider starring the repository.
