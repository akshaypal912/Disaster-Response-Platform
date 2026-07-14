import { useState } from "react";
import { 
  FolderTree, 
  Map, 
  Database, 
  Terminal, 
  Cpu, 
  BookOpen, 
  ChevronRight, 
  FileText, 
  Play, 
  CheckCircle2, 
  ShieldAlert, 
  Layers, 
  Activity, 
  Sliders, 
  Info,
  ExternalLink,
  Lock,
  Compass,
  Zap,
  Radio,
  Workflow,
  Sparkles,
  Server,
  Globe,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Clock,
  HeartPulse
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Code snapshots of the created files for the interactive Directory tree viewer
const filesData: Record<string, { path: string; language: string; content: string }> = {
  "frontend-package": {
    path: "/frontend/package.json",
    language: "json",
    content: `{
  "name": "disaster-response-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.450.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^5.0.0-beta.0",
    "@supabase/supabase-js": "^2.45.4",
    "@supabase/ssr": "^0.5.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",
    "motion": "^12.0.0"
  }
}`
  },
  "next-layout": {
    path: "/frontend/app/layout.tsx",
    language: "typescript",
    content: `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI Disaster Response Assistant",
  description: "Next-generation crisis mapping, resource dispatch, and AI intelligence system.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={\`\${inter.variable} font-sans antialiased bg-slate-950 text-slate-100\`}>
        <div id="app-root" className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}`
  },
  "next-page": {
    path: "/frontend/app/page.tsx",
    language: "typescript",
    content: `import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-8 max-w-4xl mx-auto text-center">
      <div className="space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
          SYSTEM ACTIVE • STAGE 1 READY
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          AI Disaster <span className="text-red-500">Response</span> Assistant
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Tactical crisis coordination platform featuring real-time OpenStreetMap situational analysis...
        </p>
      </div>
    </main>
  );
}`
  },
  "next-map": {
    path: "/frontend/app/map/page.tsx",
    language: "typescript",
    content: `"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MapPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950">
      {/* Map component dynamically instantiated for Leaflet + OpenStreetMap */}
    </div>
  );
}`
  },
  "backend-main": {
    path: "/backend/app/main.py",
    language: "python",
    content: `import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Emergency Disaster Response routing core, backed by IBM Granite models.",
    version="1.0.0"
)

# Set up CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)
`
  },
  "backend-watsonx": {
    path: "/backend/app/services/watsonx.py",
    language: "python",
    content: `import httpx
from typing import List, Dict, Any
from app.core.config import settings

class WatsonxService:
    def __init__(self):
        self.endpoint_url = settings.WATSONX_ENDPOINT_URL
        self.api_key = settings.WATSONX_API_KEY
        self.project_id = settings.WATSONX_PROJECT_ID
        self.model_id = settings.WATSONX_GRANITE_MODEL_ID

    async def generate_tactical_plan(
        self, incident_details: str, coordinates: str, resources: List[str]
    ) -> Dict[str, Any]:
        """
        Instructs IBM Granite model on IBM watsonx.ai to generate 
        tactical emergency guidelines based on active incident telemetry.
        """
        # Formulate rich prompt with spatial coordinates and resource availability
        ...
`
  },
  "supabase-migration": {
    path: "/supabase/migrations/20260714000000_init.sql",
    language: "sql",
    content: `-- Enable PostGIS extension for geo-spatial coordinates queries
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE public.disasters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'EXTREME')),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geog GEOGRAPHY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trigger to automatically synchronize PostGIS points
CREATE TRIGGER trigger_sync_disasters_geog BEFORE INSERT OR UPDATE ON public.disasters
FOR EACH ROW EXECUTE FUNCTION public.sync_geography_point();
`
  }
};

const disasterTypes = [
  {
    id: "floods",
    name: "Floods & Tsunamis",
    icon: "🌊",
    desc: "Coordinate immediate high-ground routing, track rising water metrics, and deploy dynamic evacuation zones mapped on Leaflet.",
    features: ["Dynamic flood elevation overlays", "OSRM pathfinding algorithm integrations", "Rapid alert trigger systems"]
  },
  {
    id: "wildfires",
    name: "Wildfires & Heatwaves",
    icon: "🔥",
    desc: "Predict flame expansion vectors using real-time atmospheric wind variables synced via watsonx weather feeds.",
    features: ["Wind direction analysis", "Resource asset containment overlays", "Automated broadcast coordinates warning"]
  },
  {
    id: "hurricanes",
    name: "Hurricanes & Storms",
    icon: "🌀",
    desc: "Manage mass shelter occupancies, load balances, and critical regional infrastructure state warnings in real-time.",
    features: ["Real-time shelter capacity metrics", "Critical grid status alerts", "Pre-landfall evacuation planning"]
  },
  {
    id: "earthquakes",
    name: "Earthquakes & Landslides",
    icon: "🌋",
    desc: "Pinpoint collapsed structures, compute landslide susceptibility points, and coordinate heavy rescue apparatus.",
    features: ["Structural telemetry collection", "GIS blockage index tracking", "Paramedic dispatch automation"]
  }
];

export default function App() {
  // Mode switcher: "landing" for the SaaS page, "console" for the tech blueprint
  const [mode, setMode] = useState<"landing" | "console">("landing");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDisasterId, setSelectedDisasterId] = useState("floods");
  
  // Console blueprint state
  const [activeTab, setActiveTab] = useState<"explorer" | "router" | "swagger" | "database" | "watsonx" | "setup">("explorer");
  const [selectedFileKey, setSelectedFileKey] = useState<string>("frontend-package");
  const [swaggerResponse, setSwaggerResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState<string | null>(null);

  // Simulated console trigger
  const triggerMockApiCall = (endpoint: string) => {
    setIsLoadingApi(true);
    setActiveEndpoint(endpoint);
    setTimeout(() => {
      setIsLoadingApi(false);
      if (endpoint === "health") {
        setSwaggerResponse(JSON.stringify({
          "status": "healthy",
          "service": "AI Disaster Response Assistant",
          "database_connected": true,
          "llm_connected": true,
          "latency_ms": 14
        }, null, 2));
      } else if (endpoint === "watsonx") {
        setSwaggerResponse(JSON.stringify({
          "analysis_summary": "Active flood zone telemetry parsed successfully by IBM Granite (ibm/granite-13b-instruct-v2). Coordinates 34.0522, -118.2437 confirm heavy threat vector.",
          "threat_assessment": "EXTREME - IMMEDIATE WATER LEVEL DISPLACEMENT EXPECTED",
          "tactical_recommendations": [
            "Establish unified emergency operations structure outside red containment polygon.",
            "Evacuate downstream camp coordinates along verified GIS transport segments.",
            "Coordinate with nearby shelter nodes (Base Camp Alpha) for capacity buffering."
          ],
          "confidence_rating": 0.94
        }, null, 2));
      } else if (endpoint === "disasters_post") {
        setSwaggerResponse(JSON.stringify({
          "title": "Severe Flash Flood",
          "description": "Sector 4-B river basin overflowing. Rising rate at 1.2m per hour.",
          "severity": "EXTREME",
          "latitude": 34.0522,
          "longitude": -118.2437,
          "id": "dis-8f432-8dfb",
          "created_at": "2026-07-14T08:41:18Z",
          "status": "reported"
        }, null, 2));
      } else if (endpoint === "alerts_get") {
        setSwaggerResponse(JSON.stringify([
          {
            "id": "alert-1",
            "title": "Severe Flood Evacuation Order",
            "message": "Immediate flooding hazard. Retreat to high grounds.",
            "severity": "EXTREME",
            "target_area": "Los Angeles Sector 4-B",
            "active": true,
            "published_at": "2026-07-14T08:35:00Z"
          }
        ], null, 2));
      }
    }, 600);
  };

  // Simulated Tactical Simulator state on Landing Page
  const [simulatedIncident, setSimulatedIncident] = useState({
    title: "Flash Flood",
    latitude: "34.0522",
    longitude: "-118.2437",
    severity: "HIGH",
    desc: "Rising water levels threatening nearby campsites. Evacuation channels needed."
  });
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    "System initiated. Leaflet mapping hooks compiled.",
    "OpenStreetMap layer initialized for rendering grid.",
    "FastAPI connection: awaiting command trigger."
  ]);
  const [simulationResponse, setSimulationResponse] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);

  const runSimulation = () => {
    setSimulating(true);
    setSimulationLogs(prev => [
      ...prev,
      `Triggering dispatch endpoint /api/v1/disasters with [${simulatedIncident.title}]`,
      "Pushing spatial coordinates data to Supabase (PostGIS enabled)...",
    ]);

    setTimeout(() => {
      setSimulationLogs(prev => [
        ...prev,
        "Incident logged inside Postgres database with service-role token authorization.",
        "Connecting to IBM watsonx.ai service...",
        "Executing tactical plan optimization on IBM Granite 13B model...",
      ]);

      setTimeout(() => {
        setSimulationLogs(prev => [
          ...prev,
          "Plan generation completed. Tactical evacuation points derived.",
          "Broadcasting local coordinates to active SMS alert warning list."
        ]);
        setSimulationResponse("SUCCESS: Granite output loaded. Active responders dispatched to Camp Alpha.");
        setSimulating(false);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500/20 selection:text-red-400 relative overflow-x-hidden">
      
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Global Navbar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-red-600 flex items-center justify-center font-black tracking-tighter text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            RA
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-wider text-sm">RESP-AI</span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest">TACTICAL LLM</span>
          </div>
        </div>

        {/* Desktop Navbar Links */}
        {mode === "landing" ? (
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-red-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-red-400 transition">How It Works</a>
            <a href="#disasters" className="hover:text-red-400 transition">Supported Crises</a>
            <a href="#blueprint" className="hover:text-red-400 transition" onClick={(e) => { e.preventDefault(); setMode("console"); }}>Inspect Architecture</a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono mr-2">Currently inspecting:</span>
            <span className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-300">NodeJS / FastAPI Blueprint</span>
          </div>
        )}

        {/* Global CTA Trigger */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMode(mode === "landing" ? "console" : "landing")}
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition"
          >
            {mode === "landing" ? "Browse Blueprint" : "Back to Landing Page"}
          </button>
          
          {mode === "landing" && (
            <a 
              href="#simulator" 
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white shadow-lg shadow-red-600/20 transition flex items-center gap-1"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[73px] inset-x-0 bg-slate-950 border-b border-slate-900 p-6 space-y-4 z-40 shadow-2xl"
          >
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-red-400">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-red-400">How It Works</a>
              <a href="#disasters" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-red-400">Supported Crises</a>
              <button 
                onClick={() => { setMode(mode === "landing" ? "console" : "landing"); setMobileMenuOpen(false); }}
                className="w-full text-left text-slate-300 hover:text-red-400 py-1"
              >
                {mode === "landing" ? "Inspect Architecture Blueprint" : "Back to Landing Page"}
              </button>
            </div>
            <div className="pt-4 border-t border-slate-900 flex flex-col gap-2">
              <button 
                onClick={() => { setMode(mode === "landing" ? "console" : "landing"); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-center text-slate-200"
              >
                {mode === "landing" ? "Toggle Technical View" : "Toggle Landing Page"}
              </button>
              <a 
                href="#simulator" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-red-600 text-xs font-semibold text-center text-white block"
              >
                Run Operations HUD
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Routing Container */}
      <div className="flex-1 flex flex-col">
        
        {/* ==================== 1. LANDING PAGE MODE ==================== */}
        {mode === "landing" && (
          <div className="space-y-24 pb-24">
            
            {/* HERO SECTION */}
            <section className="relative px-6 pt-16 md:pt-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Left: Title and CTA */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>Next-Generation Tactical Operations</span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
                    Disaster Response <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-400">
                      Orchestrated by AI
                    </span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
                    Coordinate crisis containment instantly. Combines Leaflet spatial mapping, 
                    Supabase PostGIS databases, and tactical intelligence from **IBM watsonx.ai Granite Models** 
                    to compute dynamic evacuations, logistics routing, and sirens.
                  </p>
                </div>

                {/* Micro tech metrics */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-900/60 font-mono text-xs text-slate-500">
                  <div className="space-y-1">
                    <span className="text-white font-bold text-lg">FASTAPI</span>
                    <div>Routing Core</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-bold text-lg">POSTGIS</span>
                    <div>Spatial Index</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white font-bold text-lg">GRANITE</span>
                    <div>13B LLM Engine</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a 
                    href="#simulator" 
                    className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 font-semibold text-sm text-center text-white shadow-xl shadow-red-600/20 hover:shadow-red-600/30 transition flex items-center justify-center gap-2"
                  >
                    <span>Launch Tactical Simulator</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <button 
                    onClick={() => setMode("console")}
                    className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 font-semibold text-sm text-center text-slate-200 transition flex items-center justify-center gap-2"
                  >
                    <FolderTree className="h-4 w-4 text-slate-400" />
                    <span>Explore Project Files</span>
                  </button>
                </div>
              </div>

              {/* Hero Right: Interactive Tactical Simulator HUD */}
              <div id="simulator" className="lg:col-span-5 relative">
                {/* Decorative glowing boundary lights */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl blur opacity-25" />

                <div className="relative bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
                  
                  {/* HUD Header */}
                  <div className="bg-slate-900/50 border-b border-slate-900 px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-bold text-white tracking-wide text-[11px]">TACTICAL CRUSH-SIMULATOR HUD</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">STAGE-1-ACTIVE</span>
                  </div>

                  {/* Simulator Controls & Parameters */}
                  <div className="p-4 space-y-4 border-b border-slate-900">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Configure Telemetry</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Incident Category</label>
                          <select 
                            value={simulatedIncident.title}
                            onChange={(e) => setSimulatedIncident(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-slate-300 focus:outline-none focus:border-red-500 text-[11px]"
                          >
                            <option value="Flash Flood">Flash Flood</option>
                            <option value="Wildfire Perimeter">Wildfire Perimeter</option>
                            <option value="Hurricane Surge">Hurricane Surge</option>
                            <option value="Earthquake Blockage">Earthquake Blockage</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Geo Severity</label>
                          <select 
                            value={simulatedIncident.severity}
                            onChange={(e) => setSimulatedIncident(prev => ({ ...prev, severity: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-slate-300 focus:outline-none focus:border-red-500 text-[11px]"
                          >
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                            <option value="EXTREME">EXTREME</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Latitude</label>
                        <input 
                          type="text" 
                          value={simulatedIncident.latitude}
                          onChange={(e) => setSimulatedIncident(prev => ({ ...prev, latitude: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-slate-300 focus:outline-none focus:border-red-500 text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Longitude</label>
                        <input 
                          type="text" 
                          value={simulatedIncident.longitude}
                          onChange={(e) => setSimulatedIncident(prev => ({ ...prev, longitude: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-slate-300 focus:outline-none focus:border-red-500 text-[11px]"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={runSimulation}
                      disabled={simulating}
                      className="w-full py-2.5 bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white transition rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{simulating ? "PROCESSING PLAN..." : "SUBMIT SIMULATION REPORT"}</span>
                    </button>
                  </div>

                  {/* Realtime Terminal Stream Output */}
                  <div className="bg-slate-950 p-4 font-mono text-[10px] text-slate-400 min-h-[160px] max-h-[160px] overflow-y-auto space-y-1">
                    <div className="text-slate-600 border-b border-slate-900 pb-1 mb-2">RUNNING REAL-TIME DATA STREAM</div>
                    {simulationLogs.map((log, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-red-500/60">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    {simulationResponse && (
                      <div className="p-2 mt-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md font-sans">
                        <strong>IBM Granite Advice:</strong> {simulationResponse}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="px-6 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">TACTICAL ADVANTAGE</h3>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Equipped with Crisis Intelligence</h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  A comprehensive design coupling spatial rendering with robust AI synthesis to support responders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1: OSM & Leaflet */}
                <div className="p-6 bg-slate-900/25 border border-slate-900 rounded-xl space-y-4 hover:border-slate-800 transition">
                  <div className="h-10 w-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center">
                    <Map className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Spatial GIS Interfaces</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Uses Leaflet maps coupled with OpenStreetMap geometries to display disaster bounds, shelter status pins, and active response squads.
                  </p>
                </div>

                {/* Feature 2: FastAPI Backbone */}
                <div className="p-6 bg-slate-900/25 border border-slate-900 rounded-xl space-y-4 hover:border-slate-800 transition">
                  <div className="h-10 w-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">FastAPI Async Router</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Python FastAPI core delivers lightning-fast endpoints to register new incidents, load assets, and stream real-time sensor updates.
                  </p>
                </div>

                {/* Feature 3: IBM watsonx Granite */}
                <div className="p-6 bg-slate-900/25 border border-slate-900 rounded-xl space-y-4 hover:border-slate-800 transition">
                  <div className="h-10 w-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">IBM Granite Models</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Leverages IBM watsonx Granite-13b models to analyze location coordinate proximities, available vehicles, and draft instant tactical guidelines.
                  </p>
                </div>

                {/* Feature 4: Supabase PostGIS */}
                <div className="p-6 bg-slate-900/25 border border-slate-900 rounded-xl space-y-4 hover:border-slate-800 transition">
                  <div className="h-10 w-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Spatial SQL Database</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Supabase PostgreSQL backed by PostGIS spatial extensions. Run complex SQL proximity checks to locate nearest medical caches within red alert polygons.
                  </p>
                </div>

                {/* Feature 5: Emergency Broadcasts */}
                <div className="p-6 bg-slate-900/25 border border-slate-900 rounded-xl space-y-4 hover:border-slate-800 transition">
                  <div className="h-10 w-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center">
                    <Radio className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Dynamic Broadcast Relays</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Broadcasting capabilities allow coordinators to trigger immediate regional notification systems and coordinate rescue assets.
                  </p>
                </div>

                {/* Feature 6: Supabase Auth */}
                <div className="p-6 bg-slate-900/25 border border-slate-900 rounded-xl space-y-4 hover:border-slate-800 transition">
                  <div className="h-10 w-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Supabase Auth SSR</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Rigorous user access rules protect resources and bulletins. Restricts write operations to authorized coordinators using Row Level Security (RLS).
                  </p>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section id="how-it-works" className="px-6 max-w-7xl mx-auto space-y-16">
              <div className="text-center space-y-3">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">TACTICAL WORKFLOW</h3>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">How RESP-AI Coordinates Relief</h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  A seamless cycle from telemetry tracking to IBM watsonx synthesis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Step 1 */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-900 relative">
                  <div className="absolute top-4 right-4 text-3xl font-black text-red-500/10 font-mono">01</div>
                  <div className="space-y-3">
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-mono font-bold">STAGE 1</span>
                    <h4 className="text-md font-semibold text-white">Incident Logging</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Responders use NextJS to file a report containing coordinates. These details synchronize instantly with Supabase PostgreSQL.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-900 relative">
                  <div className="absolute top-4 right-4 text-3xl font-black text-red-500/10 font-mono">02</div>
                  <div className="space-y-3">
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-mono font-bold">STAGE 2</span>
                    <h4 className="text-md font-semibold text-white">watsonx Analysis</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      FastAPI compiles regional resource availability schemas and submits them to the IBM Granite LLM for immediate tactical guidelines.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-900 relative">
                  <div className="absolute top-4 right-4 text-3xl font-black text-red-500/10 font-mono">03</div>
                  <div className="space-y-3">
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-mono font-bold">STAGE 3</span>
                    <h4 className="text-md font-semibold text-white">Logistical Dispatch</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Optimal routes and guidelines display as interactive Leaflet layers. Broadcast bulletins are sent to alert active personnel.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SUPPORTED DISASTERS */}
            <section id="disasters" className="px-6 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">CRISIS COVERAGE</h3>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Architected For Any Scenario</h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  Select a disaster profile below to explore the custom tactical pipelines and spatial analytics mapped for each.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Disaster Selectors Left */}
                <div className="lg:col-span-5 space-y-2">
                  {disasterTypes.map((disaster) => (
                    <button
                      key={disaster.id}
                      onClick={() => setSelectedDisasterId(disaster.id)}
                      className={`w-full p-4 rounded-xl text-left border transition flex items-center justify-between ${selectedDisasterId === disaster.id ? "bg-red-500/10 border-red-500/20 text-white shadow-lg" : "bg-slate-900/30 border-slate-900/80 text-slate-400 hover:text-white"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{disaster.icon}</span>
                        <span className="text-sm font-semibold">{disaster.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </div>

                {/* Display Area Right */}
                <div className="lg:col-span-7 bg-slate-900/30 border border-slate-900 p-8 rounded-2xl min-h-[280px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {disasterTypes.map((disaster) => disaster.id === selectedDisasterId && (
                      <motion.div
                        key={disaster.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{disaster.icon}</span>
                          <h4 className="text-xl font-bold text-white">{disaster.name} Profile</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{disaster.desc}</p>
                        
                        <div className="space-y-2">
                          <span className="text-xs font-mono text-red-400 block font-bold">TACTICAL FLOW CONTROLS</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {disaster.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 border border-slate-900 p-2.5 rounded-lg">
                                <CheckCircle2 className="h-3.5 w-3.5 text-red-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="px-6 max-w-5xl mx-auto relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl blur-xl opacity-20 pointer-events-none" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-6">
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  Ready to deploy tactical response infrastructure?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                  FastAPI routing wrappers, Next.js page maps, Supabase PostGIS schemas, and IBM watsonx API integrations are completely bootstrapped.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => setMode("console")}
                    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-semibold text-xs text-white transition flex items-center justify-center gap-2"
                  >
                    <Terminal className="h-4 w-4" />
                    <span>Launch Technical Blueprint Panel</span>
                  </button>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-900 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Export Project Directory</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                  </a>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== 2. TECHNICAL CONSOLE/BLUEPRINT MODE ==================== */}
        {mode === "console" && (
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative z-10">
            
            {/* Console Navigation Sidebar */}
            <aside className="w-full lg:w-80 border-r border-slate-900 bg-slate-950/40 p-4 space-y-2 flex-shrink-0">
              <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 mb-3">Blueprint Components</div>
              
              <button 
                onClick={() => setActiveTab("explorer")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition text-xs ${activeTab === "explorer" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"}`}
                id="tab-explorer"
              >
                <div className="flex items-center gap-2.5">
                  <FolderTree className="h-4 w-4" />
                  <span>Project Folder Tree</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>

              <button 
                onClick={() => setActiveTab("router")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition text-xs ${activeTab === "router" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"}`}
                id="tab-router"
              >
                <div className="flex items-center gap-2.5">
                  <Map className="h-4 w-4" />
                  <span>Next.js App Router Map</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>

              <button 
                onClick={() => setActiveTab("swagger")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition text-xs ${activeTab === "swagger" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"}`}
                id="tab-swagger"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="h-4 w-4" />
                  <span>FastAPI Endpoint Explorer</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>

              <button 
                onClick={() => setActiveTab("database")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition text-xs ${activeTab === "database" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"}`}
                id="tab-database"
              >
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4" />
                  <span>Supabase Schema & RLS</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>

              <button 
                onClick={() => setActiveTab("watsonx")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition text-xs ${activeTab === "watsonx" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"}`}
                id="tab-watsonx"
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="h-4 w-4" />
                  <span>IBM watsonx AI Flow</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>

              <button 
                onClick={() => setActiveTab("setup")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition text-xs ${activeTab === "setup" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"}`}
                id="tab-setup"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4" />
                  <span>Deployment & Run Guide</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>

              <div className="mt-8 p-4 rounded-xl bg-slate-900/40 border border-slate-900/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Info className="h-4 w-4 text-slate-500" />
                  <span>Operator Blueprint Mode</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inspect and toggle the real, bootstrapped codebase layouts for front-and-backend services.
                </p>
                <button 
                  onClick={() => setMode("landing")}
                  className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded transition"
                >
                  Return to Landing Page
                </button>
              </div>
            </aside>

            {/* Center Panel Container */}
            <main className="flex-1 p-6 overflow-y-auto bg-slate-950">
              <AnimatePresence mode="wait">
                
                {/* TAB: PROJECT EXPLORER */}
                {activeTab === "explorer" && (
                  <motion.div 
                    key="explorer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    id="panel-explorer"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-white">Full-Stack Folder Tree Specification</h2>
                      <p className="text-sm text-slate-400">Select any bootstrapped file below to inspect its architecture setup, dependencies, and imports.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[550px]">
                      {/* File Tree Left Section */}
                      <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-4 overflow-y-auto space-y-4">
                        
                        {/* Frontend Files Group */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 px-2">
                            <span className="w-2 h-2 rounded-full bg-red-500/80" />
                            <span>Frontend Node (Next.js 15)</span>
                          </div>
                          <div className="pl-3 space-y-1">
                            <button 
                              onClick={() => setSelectedFileKey("frontend-package")}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition ${selectedFileKey === "frontend-package" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>package.json</span>
                            </button>
                            <button 
                              onClick={() => setSelectedFileKey("next-layout")}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition ${selectedFileKey === "next-layout" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>app/layout.tsx</span>
                            </button>
                            <button 
                              onClick={() => setSelectedFileKey("next-page")}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition ${selectedFileKey === "next-page" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>app/page.tsx</span>
                            </button>
                            <button 
                              onClick={() => setSelectedFileKey("next-map")}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition ${selectedFileKey === "next-map" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>app/map/page.tsx</span>
                            </button>
                          </div>
                        </div>

                        {/* Backend Files Group */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 px-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            <span>Backend Node (FastAPI)</span>
                          </div>
                          <div className="pl-3 space-y-1">
                            <button 
                              onClick={() => setSelectedFileKey("backend-main")}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition ${selectedFileKey === "backend-main" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>app/main.py</span>
                            </button>
                            <button 
                              onClick={() => setSelectedFileKey("backend-watsonx")}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition ${selectedFileKey === "backend-watsonx" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>app/services/watsonx.py</span>
                            </button>
                          </div>
                        </div>

                        {/* Database Group */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 px-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Database Migrations</span>
                          </div>
                          <div className="pl-3 space-y-1">
                            <button 
                              onClick={() => setSelectedFileKey("supabase-migration")}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition ${selectedFileKey === "supabase-migration" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>20260714000000_init.sql</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Code Viewer Right Section */}
                      <div className="md:col-span-2 bg-slate-900/80 border border-slate-900 rounded-xl overflow-hidden flex flex-col h-full font-mono">
                        <div className="bg-slate-950 px-4 py-2 text-xs text-slate-500 border-b border-slate-900 flex justify-between items-center">
                          <span>{filesData[selectedFileKey].path}</span>
                          <span className="text-red-500 uppercase font-semibold text-[10px]">{filesData[selectedFileKey].language}</span>
                        </div>
                        <pre className="flex-1 p-4 overflow-auto text-xs text-slate-300 leading-relaxed whitespace-pre select-all">
                          <code>{filesData[selectedFileKey].content}</code>
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB: NEXT.JS APP ROUTER */}
                {activeTab === "router" && (
                  <motion.div 
                    key="router"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    id="panel-router"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-white">Next.js 15 App Router Structure</h2>
                      <p className="text-sm text-slate-400">Overview of the pages, layout boundaries, and dynamic routing architectures established in `/frontend`.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Visually rendered Route hierarchy */}
                      <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-6">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                          <Layers className="h-4 w-4 text-red-500" />
                          <span>Next.js App Segments</span>
                        </h3>

                        <div className="space-y-3 font-mono text-xs text-slate-400">
                          <div className="border-l-2 border-slate-800 pl-4 space-y-3">
                            <div>
                              <div className="text-red-400 font-semibold">layout.tsx</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">Root layout initializing Inter fonts and viewport configs.</div>
                            </div>

                            <div className="border-l-2 border-slate-800 pl-4 space-y-3">
                              <div>
                                <div className="text-white font-semibold">page.tsx</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Interactive home landing routing panel.</div>
                              </div>

                              <div>
                                <div className="text-white font-semibold">/dashboard</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Command center with telemetry cards and action controls.</div>
                              </div>

                              <div>
                                <div className="text-white font-semibold">/map</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Leaflet rendering center. Built as a Client Component.</div>
                              </div>

                              <div>
                                <div className="text-white font-semibold">/alerts</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Broadcast panel with alert severity pickers.</div>
                              </div>

                              <div>
                                <div className="text-white font-semibold">/resources</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Supply request registry and dispatch router.</div>
                              </div>

                              <div>
                                <div className="text-red-400 font-semibold">/api/disaster/route.ts</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Next.js API segment routing proxy to FastAPI instance.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                            <Sliders className="h-4 w-4 text-red-500" />
                            <span>Rendering Strategy Specifications</span>
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            To maintain pristine UX and support OpenStreetMap/Leaflet components, page routing leverages mixed rendering:
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-xs">
                            <div className="font-semibold text-white mb-1">Static Rendering & Prefetching</div>
                            <p className="text-slate-400">
                              `/dashboard`, `/alerts`, and `/resources` are rendered statically at build time to secure rapid performance, while fetching live incidents client-side.
                            </p>
                          </div>

                          <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-xs">
                            <div className="font-semibold text-white mb-1">Client-Side Hydration (&apos;use client&apos;)</div>
                            <p className="text-slate-400">
                              `/map` leverages NextJS dynamic imports with &quot;ssr: false&quot; to circumvent Leaflet reference errors concerning missing `window` objects on Node environments.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB: FASTAPI ENDPOINT EXPLORER */}
                {activeTab === "swagger" && (
                  <motion.div 
                    key="swagger"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    id="panel-swagger"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-white">FastAPI Endpoints Playground</h2>
                      <p className="text-sm text-slate-400">Test the API routing structure and observe sample JSON payloads of both input schemas and return contracts.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Endpoints listing */}
                      <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-4">
                        <h3 className="text-sm font-semibold text-white">API Router Directory</h3>
                        
                        <div className="space-y-3">
                          {/* Health */}
                          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-900 flex justify-between items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">GET</span>
                                <span className="text-xs font-mono text-white">/</span>
                              </div>
                              <p className="text-[11px] text-slate-500">Service health monitoring and database status checks.</p>
                            </div>
                            <button 
                              onClick={() => triggerMockApiCall("health")}
                              className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-xs hover:border-slate-700 transition flex items-center gap-1 font-semibold"
                            >
                              <Play className="h-3 w-3 text-red-500 fill-red-500" />
                              <span>Test</span>
                            </button>
                          </div>

                          {/* Post Disaster */}
                          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-900 flex justify-between items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">POST</span>
                                <span className="text-xs font-mono text-white">/api/v1/disasters</span>
                              </div>
                              <p className="text-[11px] text-slate-500">Log a new active emergency incident.</p>
                            </div>
                            <button 
                              onClick={() => triggerMockApiCall("disasters_post")}
                              className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-xs hover:border-slate-700 transition flex items-center gap-1 font-semibold"
                            >
                              <Play className="h-3 w-3 text-red-500 fill-red-500" />
                              <span>Test</span>
                            </button>
                          </div>

                          {/* AI Advice */}
                          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-900 flex justify-between items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">POST</span>
                                <span className="text-xs font-mono text-white">/api/v1/disasters/ai-advice</span>
                              </div>
                              <p className="text-[11px] text-slate-500">Query IBM Granite on watsonx.ai for tactical instructions.</p>
                            </div>
                            <button 
                              onClick={() => triggerMockApiCall("watsonx")}
                              className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-xs hover:border-slate-700 transition flex items-center gap-1 font-semibold"
                            >
                              <Play className="h-3 w-3 text-red-500 fill-red-500" />
                              <span>Test</span>
                            </button>
                          </div>

                          {/* Get Alerts */}
                          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-900 flex justify-between items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">GET</span>
                                <span className="text-xs font-mono text-white">/api/v1/alerts</span>
                              </div>
                              <p className="text-[11px] text-slate-500">Query all emergency alerts dispatched to networks.</p>
                            </div>
                            <button 
                              onClick={() => triggerMockApiCall("alerts_get")}
                              className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-xs hover:border-slate-700 transition flex items-center gap-1 font-semibold"
                            >
                              <Play className="h-3 w-3 text-red-500 fill-red-500" />
                              <span>Test</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* API response simulation console */}
                      <div className="p-6 bg-slate-900/80 border border-slate-900 rounded-xl flex flex-col font-mono text-xs">
                        <div className="bg-slate-950 px-4 py-2 text-[10px] text-slate-500 border-b border-slate-900 flex justify-between items-center">
                          <span>CONSOLE OUTPUT</span>
                          {activeEndpoint && <span className="text-red-500">Active Query: {activeEndpoint}</span>}
                        </div>
                        
                        <div className="flex-1 p-4 overflow-auto min-h-[300px] flex flex-col justify-center">
                          {isLoadingApi ? (
                            <div className="flex flex-col items-center justify-center space-y-2 text-slate-500">
                              <div className="h-5 w-5 rounded-full border-2 border-slate-700 border-t-red-500 animate-spin" />
                              <span>Awaiting response payload...</span>
                            </div>
                          ) : swaggerResponse ? (
                            <pre className="text-slate-300 leading-relaxed text-left">
                              <code>{swaggerResponse}</code>
                            </pre>
                          ) : (
                            <div className="text-center text-slate-500">
                              <p>Select an endpoint on the left and click &apos;Test&apos; to inspect structural payloads.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB: DATABASE SCHEMA */}
                {activeTab === "database" && (
                  <motion.div 
                    key="database"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    id="panel-database"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-white">Supabase Schema & Relational Models</h2>
                      <p className="text-sm text-slate-400">Inspecting database specifications, geometric PostGIS triggers, and secure Row Level Security (RLS) definitions.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Database tables overview */}
                      <div className="lg:col-span-2 p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-6">
                        <h3 className="text-sm font-semibold text-white">Structural DB Schema</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          {/* Table: Profiles */}
                          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-900 space-y-2">
                            <div className="text-slate-200 font-bold border-b border-slate-900 pb-1 flex justify-between items-center">
                              <span>profiles</span>
                              <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-400">Table</span>
                            </div>
                            <div className="space-y-1 text-[11px] text-slate-400">
                              <div>id: UUID <span className="text-slate-600">(P. Key, auth.users)</span></div>
                              <div>full_name: TEXT</div>
                              <div>role: TEXT <span className="text-slate-600">(responder, coordinator, viewer)</span></div>
                              <div>department: TEXT</div>
                            </div>
                          </div>

                          {/* Table: Disasters */}
                          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-900 space-y-2">
                            <div className="text-slate-200 font-bold border-b border-slate-900 pb-1 flex justify-between items-center">
                              <span>disasters</span>
                              <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-400">Table</span>
                            </div>
                            <div className="space-y-1 text-[11px] text-slate-400">
                              <div>id: UUID <span className="text-slate-600">(P. Key, gen_uuid)</span></div>
                              <div>title: TEXT</div>
                              <div>severity: TEXT <span className="text-slate-600">(LOW, MEDIUM, HIGH, EXTREME)</span></div>
                              <div>latitude/longitude: FLOAT</div>
                              <div>geog: GEOGRAPHY <span className="text-red-500 font-bold">(PostGIS Point)</span></div>
                            </div>
                          </div>

                          {/* Table: Resources */}
                          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-900 space-y-2">
                            <div className="text-slate-200 font-bold border-b border-slate-900 pb-1 flex justify-between items-center">
                              <span>resources</span>
                              <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-400">Table</span>
                            </div>
                            <div className="space-y-1 text-[11px] text-slate-400">
                              <div>id: UUID</div>
                              <div>category: TEXT</div>
                              <div>quantity: INTEGER</div>
                              <div>latitude/longitude: FLOAT</div>
                              <div>geog: GEOGRAPHY <span className="text-red-500 font-bold">(PostGIS Point)</span></div>
                            </div>
                          </div>

                          {/* Table: Alerts */}
                          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-900 space-y-2">
                            <div className="text-slate-200 font-bold border-b border-slate-900 pb-1 flex justify-between items-center">
                              <span>alerts</span>
                              <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-400">Table</span>
                            </div>
                            <div className="space-y-1 text-[11px] text-slate-400">
                              <div>id: UUID</div>
                              <div>title: TEXT</div>
                              <div>message: TEXT</div>
                              <div>severity: TEXT <span className="text-slate-600">(SEVERE, EXTREME)</span></div>
                              <div>target_area: TEXT</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Security Panel */}
                      <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-4">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                          <Lock className="h-4 w-4 text-red-500" />
                          <span>Row Level Security (RLS)</span>
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          All tables are protected by real SQL policies that enforce secure coordination boundaries:
                        </p>

                        <div className="space-y-3 text-xs font-mono">
                          <div className="p-3 rounded bg-slate-950 border border-slate-900 space-y-1">
                            <div className="text-white font-bold text-[11px]">Anonymous View Policy</div>
                            <p className="text-[10px] text-slate-500">Allows general citizens and search grids to query incidents or resource markers without signing in.</p>
                          </div>

                          <div className="p-3 rounded bg-slate-950 border border-slate-900 space-y-1">
                            <div className="text-white font-bold text-[11px]">Commander Check Policy</div>
                            <p className="text-[10px] text-slate-500">Restricts logistics alterations and alert broadcasts to verified accounts carrying the &apos;coordinator&apos; role.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB: IBM WATSONX AI FLOW */}
                {activeTab === "watsonx" && (
                  <motion.div 
                    key="watsonx"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    id="panel-watsonx"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-white">IBM watsonx.ai Granite Integration</h2>
                      <p className="text-sm text-slate-400">Visual mapping of how live spatial telemetry flows to the IBM Granite LLM to generate actionable evacuation plans.</p>
                    </div>

                    <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-8">
                      {/* Visual Flow diagram */}
                      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative">
                        
                        {/* Node 1 */}
                        <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 w-full lg:w-64 text-center space-y-2">
                          <div className="text-xs font-mono text-slate-500">STEP 1: SENSORS & GIS</div>
                          <h4 className="text-sm font-semibold text-white">Incident Triggered</h4>
                          <p className="text-[11px] text-slate-400">Reporter inputs coordinates (34.0522, -118.2437) and water level telemetry.</p>
                        </div>

                        <div className="hidden lg:block text-slate-700 font-mono">&rarr;&rarr;</div>

                        {/* Node 2 */}
                        <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 w-full lg:w-64 text-center space-y-2 border-red-500/30">
                          <div className="text-xs font-mono text-red-400">STEP 2: FASTAPI PARSING</div>
                          <h4 className="text-sm font-semibold text-white">System Prompt Synthesis</h4>
                          <p className="text-[11px] text-slate-400">Core parses incident + references database logistics for nearest shelters and personnel assets.</p>
                        </div>

                        <div className="hidden lg:block text-slate-700 font-mono">&rarr;&rarr;</div>

                        {/* Node 3 */}
                        <div className="p-5 rounded-xl bg-slate-950 border border-slate-900 w-full lg:w-64 text-center space-y-2">
                          <div className="text-xs font-mono text-slate-500">STEP 3: watsonx COUPLING</div>
                          <h4 className="text-sm font-semibold text-white">IBM Granite (13b)</h4>
                          <p className="text-[11px] text-slate-400">Granite outputs highly structured evacuations and threat metrics based on prompt details.</p>
                        </div>
                      </div>

                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 space-y-3">
                        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Operational Prompt Blueprint</h4>
                        <pre className="font-mono text-[11px] text-slate-400 whitespace-pre-wrap leading-relaxed">
{`<|system|>
You are an expert disaster tactical coordinator. Analyze the given emergency details, geographic coordinates, and operational resources. Propose a rigorous response plan with exact evacuation vectors...
<|user|>
Incident: Sector 4-B River Overflow
Coordinates: 34.0522, -118.2437
Available Assets: Base Camp Alpha, Paramedic Team 2
<|assistant|>`}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB: LOCAL SETUP & RUN GUIDE */}
                {activeTab === "setup" && (
                  <motion.div 
                    key="setup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                    id="panel-setup"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-white">Local Run & Deployment Guide</h2>
                      <p className="text-sm text-slate-400">How to spin up both the Next.js 15 frontend and FastAPI backend inside local or containerized environments.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs text-slate-400">
                      {/* Frontend instructions */}
                      <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-4">
                        <h3 className="text-sm font-semibold text-white font-sans flex items-center gap-2">
                          <Layers className="h-4 w-4 text-red-500" />
                          <span>Launch Next.js 15 Frontend</span>
                        </h3>

                        <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-900">
                          <div>
                            <div className="text-slate-500"># 1. Enter directory</div>
                            <div className="text-white">cd frontend</div>
                          </div>
                          <div>
                            <div className="text-slate-500"># 2. Install components</div>
                            <div className="text-white">npm install</div>
                          </div>
                          <div>
                            <div className="text-slate-500"># 3. Trigger local development server</div>
                            <div className="text-white">npm run dev</div>
                          </div>
                        </div>
                      </div>

                      {/* Backend instructions */}
                      <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-xl space-y-4">
                        <h3 className="text-sm font-semibold text-white font-sans flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-orange-500" />
                          <span>Launch FastAPI Backend</span>
                        </h3>

                        <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-900">
                          <div>
                            <div className="text-slate-500"># 1. Enter directory</div>
                            <div className="text-white">cd backend</div>
                          </div>
                          <div>
                            <div className="text-slate-500"># 2. Spin up virtual environment</div>
                            <div className="text-white">python -m venv venv && source venv/bin/activate</div>
                          </div>
                          <div>
                            <div className="text-slate-500"># 3. Install packages & run app</div>
                            <div className="text-white">pip install -r requirements.txt && python app/main.py</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </main>
          </div>
        )}

      </div>

      {/* Global SaaS Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs text-slate-400">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-red-600 flex items-center justify-center font-black text-white text-xs">R</div>
              <span className="font-bold text-white tracking-wide">RESP-AI</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Tactical disaster coordination blueprints. Harnessing spatial GIS calculations and IBM Granite models to aid rescue teams.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <span className="font-semibold text-white">Operational Stack</span>
            <ul className="space-y-1 text-slate-500">
              <li>Next.js 15 AppRouter</li>
              <li>FastAPI Async Server</li>
              <li>Supabase Database + PostGIS</li>
              <li>IBM watsonx.ai SDK</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <span className="font-semibold text-white">Spatial Integrations</span>
            <ul className="space-y-1 text-slate-500">
              <li>OpenStreetMap Layers</li>
              <li>Leaflet Interactive Markers</li>
              <li>OSRM Geometry Routing</li>
              <li>PostGIS Geography Points</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <span className="font-semibold text-white">Contact & Support</span>
            <ul className="space-y-1 text-slate-500">
              <li>Crisis Dispatch Centers</li>
              <li>IBM Granite LLM Support</li>
              <li>System Status Check</li>
              <li>Coordinator Security Register</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} RESP-AI Systems. All tactical blueprints licensed under Apache-2.0.</span>
          <div className="flex gap-4">
            <button onClick={() => setMode("console")} className="hover:text-red-400 transition">Blueprint Console</button>
            <span>&bull;</span>
            <button onClick={() => setMode("landing")} className="hover:text-red-400 transition">Landing Hub</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
