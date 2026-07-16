import React, { useState } from 'react';

export function EmergencyChecklist() {
  const [active, setActive] = useState(false);

  return (
    <div className="bg-red-950/10 border border-red-900/30 p-4 rounded-xl text-xs space-y-2">
      <h3 className="font-mono text-red-500 font-bold">TACTICAL SOS SYSTEM</h3>
      <button onClick={() => setActive(!active)} className={`w-full py-2 font-mono rounded text-white ${active ? 'bg-orange-600 animate-pulse' : 'bg-red-600'}`}>
        {active ? 'SOS ACTIVE - TRANSMITTING LOCATION' : 'ACTIVATE SOS'}
      </button>
    </div>
  );
}
