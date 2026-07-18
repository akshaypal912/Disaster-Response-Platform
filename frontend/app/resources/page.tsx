'use client';
import React, { useState } from 'react';

export default function ResourcesPage() {
  const [resources, setResources] = useState([
    { item: 'Purified Water Units', count: 120 },
    { item: 'First-Aid Kits', count: 45 }
  ]);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white text-xs space-y-4">
      <h2 className="text-lg font-mono">📦 LOGISTICAL RESOURCE ALLOCATION</h2>
      <div className="space-y-2">
        {resources.map((r, i) => (
          <div key={i} className="p-3 bg-slate-900 rounded border border-slate-800 flex justify-between font-mono">
            <span>{r.item}</span>
            <span className="text-emerald-400 font-bold">{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
