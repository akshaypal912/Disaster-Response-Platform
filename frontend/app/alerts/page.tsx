import Link from "next/link";

export default function AlertsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950" id="next-alerts">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 sticky top-0 backdrop-blur">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold tracking-wider">RESP-AI</span>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Alert Broadcast</span>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 flex-1 w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Emergency Broadcast Control</h1>
          <p className="text-sm text-slate-400 mt-1">Issue local alerts, dispatch SMS warnings, and trigger sirens through FastAPI and Supabase subscriptions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-md font-semibold text-white">Issue Broadcast Bulletin</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Alert Severity</label>
                <select className="w-full text-xs bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-slate-200" disabled>
                  <option>EXTREME - Immediate Threat to Life</option>
                  <option>SEVERE - Major Action Required</option>
                  <option>MODERATE - Be Prepared</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Coordinates / City</label>
                <input type="text" placeholder="e.g. 34.0522, -118.2437 or Los Angeles" className="w-full text-xs bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-slate-200" disabled />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Bulletin Message</label>
                <textarea rows={4} placeholder="Type the broadcast alert details here..." className="w-full text-xs bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-slate-200" disabled></textarea>
              </div>

              <button className="w-full py-2.5 bg-red-600 rounded-lg text-xs font-semibold text-white hover:bg-red-500 cursor-not-allowed" disabled>
                Broadcast to Emergency Network (Offline)
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Broadcast History</h4>
              <p className="text-xs text-slate-500">No warnings emitted during this operational interval.</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Automated Alerts</h4>
              <p className="text-xs text-slate-400">
                Connected to watsonx AI to automatically predict downstream path impacts and notify responders.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
