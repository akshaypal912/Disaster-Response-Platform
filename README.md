# 🌍 RESP-AI -> Intelligent Disaster Response & Emergency Coordination Platform

> **An AI-powered disaster response platform that delivers real-time emergency guidance, interactive mapping, multilingual assistance, offline resilience, and live coordination for disaster management teams and citizens.**

[![Built for IBM SkillBuild](https://img.shields.io/badge/IBM-SkillBuild-blue?style=for-the-badge&logo=ibm)](https://skillsbuild.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![IBM watsonx](https://img.shields.io/badge/AI-IBM%20watsonx%20Granite-052FAD?style=for-the-badge)](https://www.ibm.com/watsonx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

# 📌 Overview

RESP-AI is an AI-powered disaster response platform designed to help individuals and emergency responders make informed decisions during natural disasters such as floods, earthquakes, cyclones, wildfires, and landslides.

The platform combines artificial intelligence, geospatial mapping, emergency routing, multilingual communication, and offline support to deliver reliable assistance when every second matters.

Whether it's identifying nearby shelters, generating AI-powered safety recommendations, or providing emergency checklists, RESP-AI enables faster, smarter, and more coordinated disaster response.

---

# ✨ Key Features

### 🤖 AI Disaster Assistant

* AI-powered emergency guidance using IBM Granite / Google Gemini
* Disaster-specific recommendations
* Emergency checklists
* First-aid instructions
* Evacuation guidance
* Structured AI responses

---

### 🗺️ Interactive Disaster Mapping

* Live user location
* Disaster visualization
* Nearby hospitals
* Nearby shelters
* Police & fire stations
* Safe evacuation routes
* Interactive Leaflet maps

---

### 🔐 Secure Authentication

* Supabase Authentication
* Secure user sessions
* Protected routes
* Role-based access control
* JWT authentication

---

### 🌍 Multilingual Experience

Supports emergency guidance in multiple languages including:

* English
* Hindi
* Bengali
* Tamil
* Telugu
* Marathi

---

### 🎙️ Voice Assistance

* Text-to-Speech emergency instructions
* Hands-free guidance during emergencies
* Multilingual voice output

---

### 📱 Offline-First Experience

* Progressive Web App (PWA)
* Offline emergency checklists
* Local data storage
* Automatic synchronization after reconnecting

---

### ⚡ Real-Time Emergency Updates

* WebSocket-powered live updates
* Instant disaster alerts
* Live responder coordination
* Dynamic notification system

---

### 🆘 Emergency Response Toolkit

* SOS functionality
* Nearby emergency contacts
* Quick emergency actions
* Disaster preparedness resources

---

# 🛠️ Tech Stack

### Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Leaflet

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* Supabase
* PostgreSQL

### Artificial Intelligence

* IBM watsonx Granite
* Google Gemini

### Real-Time

* Socket.IO

### Maps & Location

* OpenStreetMap
* Leaflet
* Browser Geolocation API

### Deployment

* Vercel
* Render
* Supabase

---

# 🏗️ Architecture

```text
                        +----------------------+
                        |      RESP-AI         |
                        |   React + Vite UI    |
                        +----------+-----------+
                                   |
          +------------+-----------+-----------+------------+
          |            |                       |            |
          |            |                       |            |
     Authentication    AI Engine         Maps & Routing   WebSockets
       (Supabase)   (Granite/Gemini)       (Leaflet)     Live Updates
          |            |                       |            |
          +------------+-----------+-----------+------------+
                                   |
                            PostgreSQL (Supabase)
```

---

# 📂 Project Structure

```bash
src/
├── components/
├── pages/
├── hooks/
├── services/
├── lib/
├── utils/
├── types/
└── assets/
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone <repository-url>
cd disaster-response-assistant
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
```

## Start Development Server

```bash
npm run dev
```

---

# 🎯 Project Goals

* Reduce panic during emergencies
* Deliver trusted AI-powered safety guidance
* Improve disaster preparedness
* Support emergency responders
* Enable real-time coordination
* Increase accessibility through multilingual and voice support

---

# 🌟 Future Roadmap

* Satellite imagery integration
* Drone-assisted damage assessment
* AI image-based disaster detection
* Predictive flood and wildfire analytics
* Government emergency system integration
* Cross-platform mobile application

---

# 🤝 Contributing

We welcome contributions from the community.

Please check the **GitHub Issues** tab before starting work and submit a Pull Request for review.

---

# 📄 License

This project is licensed under the MIT License.
