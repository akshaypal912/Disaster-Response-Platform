'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AlertsDashboard() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel('live-alerts')
      .on('broadcast', { event: 'new-alert' }, ({ payload }) => {
        setAlerts(prev => [payload, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h2 className="text-lg font-mono mb-4 border-b border-slate-800 pb-2">🚨 LIVE TELEMETRY STREAMS</h2>
      <div className="space-y-2">
        {alerts.length === 0 && <p className="text-xs text-slate-500">Listening to active operational websocket channel...</p>}
        {alerts.map((a, i) => (
          <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded text-xs">{a.message}</div>
        ))}
      </div>
    </div>
  );
}
