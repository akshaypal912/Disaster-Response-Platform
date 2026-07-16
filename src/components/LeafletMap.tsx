import React from 'react';

export function LeafletMap() {
  return (
    <div className="h-[300px] w-full bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-500 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
      <div className="text-center z-10 space-y-2">
        <p className="text-red-500 font-bold">TACTICAL GEOSPATIAL RADAR ACTIVE</p>
        <p className="text-[10px]">Leaflet GIS Map Nodes Synchronized via GPS</p>
      </div>
    </div>
  );
}
