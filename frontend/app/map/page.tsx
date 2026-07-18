'use client';
import React from 'react';
import { LeafletMap } from '../../../src/components/LeafletMap';

export default function MapPage() {
  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <h2 className="text-white font-mono mb-4 text-lg">🛰️ STRATEGIC GIS MAP SYSTEM</h2>
      <LeafletMap />
    </div>
  );
}
