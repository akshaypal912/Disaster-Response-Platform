'use client';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white text-xs space-y-4">
      <h2 className="text-lg font-mono text-white">📊 COMMAND INTELLIGENCE HUB</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 className="text-slate-400 uppercase text-[10px]">Active Incidents</h4>
          <p className="text-xl font-bold text-red-500 font-mono">03</p>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 className="text-slate-400 uppercase text-[10px]">Safe Zones Synced</h4>
          <p className="text-xl font-bold text-emerald-400 font-mono">14</p>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <h4 className="text-slate-400 uppercase text-[10px]">Active Responders</h4>
          <p className="text-xl font-bold text-blue-400 font-mono">32</p>
        </div>
      </div>
    </div>
  );
}
