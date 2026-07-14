"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Leaflet does not support SSR, so we mock or dynamically import the map container on the client.
export default function MapPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950" id="next-map">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 sticky top-0 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold tracking-wider">RESP-AI</span>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Tactical Map</span>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Map Panel */}
        <div className="flex-1 min-h-[400px] lg:h-auto bg-slate-900 flex flex-col items-center justify-center relative">
          {!isMounted ? (
            <div className="text-slate-400 font-mono text-sm">Bootstrapping map environment...</div>
          ) : (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                🗺️
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Leaflet & OpenStreetMap Sandbox</h3>
                <p className="text-sm text-slate-400 max-w-md mt-1">
                  On-the-fly tactical overlay loader. Map centers dynamically around user-specified zones.
                </p>
              </div>
              <div className="bg-slate-950/80 font-mono text-xs p-4 rounded-lg border border-slate-800 text-slate-400 text-left space-y-1">
                <div>import {"{"} MapContainer, TileLayer, Marker, Popup {"}"} from &apos;react-leaflet&apos;;</div>
                <div className="text-slate-500">// Dynamically loaded on the client-side (ssr: false)</div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/40 p-6 space-y-6">
          <div>
            <h2 className="text-md font-semibold text-white">Geological Control Center</h2>
            <p className="text-xs text-slate-400 mt-1">Select visual metrics and sensor nodes to display on-screen.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Search Region</label>
              <input 
                type="text" 
                placeholder="Enter city or coordinates..." 
                className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none p-2.5 rounded-lg text-slate-200"
                disabled
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">Map Overlays</span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-red-500" defaultChecked disabled />
                  Active Red Zones
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-red-500" defaultChecked disabled />
                  Search and Rescue Crews
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-red-500" disabled />
                  Evacuation Shelters
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
