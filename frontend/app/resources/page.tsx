import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950" id="next-resources">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 sticky top-0 backdrop-blur">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold tracking-wider">RESP-AI</span>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Resource Logistics</span>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 flex-1 w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Logistics & Asset Distribution</h1>
          <p className="text-sm text-slate-400">Track emergency supplies, paramedic dispatch, heavy machinery, and field shelter occupancy.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-white">Resource Request Portal</h3>
            <p className="text-xs text-slate-400">Submit logistical orders to physical response caches via backend.</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Item Category</label>
                <select className="w-full text-xs bg-slate-950 border border-slate-800 p-2 rounded-lg text-slate-200" disabled>
                  <option>Water & Rations Bundle</option>
                  <option>Medical Equipment / Trauma Kits</option>
                  <option>Sart/Search and Rescue Personnel</option>
                  <option>Structural Demolition Machinery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Quantity Requested</label>
                <input type="number" defaultValue="1" className="w-full text-xs bg-slate-950 border border-slate-800 p-2 rounded-lg text-slate-200" disabled />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Drop-off Destination</label>
                <input type="text" placeholder="Base Camp Alpha, Route 6" className="w-full text-xs bg-slate-950 border border-slate-800 p-2 rounded-lg text-slate-200" disabled />
              </div>

              <button className="w-full py-2 bg-slate-800 rounded-lg text-xs font-semibold text-slate-400 cursor-not-allowed" disabled>
                Submit Request (Offline)
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Logistical Fleet Dispatch Map</h3>
              <p className="text-xs text-slate-400">Active convoys tracking automatically via Leaflet spatial geometry routing algorithms.</p>
            </div>
            
            <div className="h-60 bg-slate-950 rounded-lg flex items-center justify-center text-slate-600 font-mono text-xs">
              [Logistics Routing Engine Interface - Configured for Leaflet + OSRM APIs]
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-800">
              <span>FastAPI Endpoints: /api/v1/resources</span>
              <span>Supabase Table: resources</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
