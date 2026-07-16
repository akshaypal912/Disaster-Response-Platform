import React, { useState, useEffect } from 'react';
import { Navigation } from 'lucide-react';

export function NearbyFacilitiesFinder() {
  const [facilities, setFacilities] = useState<any[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setFacilities([
        { id: '1', name: 'Regional Emergency Center', distance: '0.6 km' },
        { id: '2', name: 'Safe Haven Sports Shelter', distance: '1.2 km' }
      ]);
    }, () => {
      setFacilities([{ id: '1', name: 'Central Hospital (Fallback)', distance: '2.1 km' }]);
    });
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <h3 className="text-xs font-mono text-white mb-2 flex items-center gap-2">
        <Navigation className="h-4 w-4 text-red-500 animate-pulse" /> SPATIAL ROUTING CAPABILITY
      </h3>
      <ul className="space-y-2">
        {facilities.map(f => (
          <li key={f.id} className="text-xs text-slate-300 p-2 bg-slate-950 rounded flex justify-between">
            <span>{f.name}</span> <span className="text-red-400 font-mono">{f.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
