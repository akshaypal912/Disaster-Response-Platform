import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950" id="next-dashboard">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 sticky top-0 backdrop-blur">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold tracking-wider">RESP-AI</span>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Dashboard</span>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 flex-1 w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Tactical Operations Room</h1>
            <p className="text-sm text-slate-400">Integrated crisis dashboard with active incident summaries and live metrics.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs hover:border-slate-700 text-slate-300">
              Refresh Status
            </button>
            <button className="px-4 py-2 bg-red-600 rounded-lg text-xs font-semibold hover:bg-red-500 text-white">
              Report New Incident
            </button>
          </div>
        </div>

        {/* Mock visual layouts for routing & architecture overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Disasters</h4>
            <div className="text-3xl font-bold text-white">0</div>
            <p className="text-xs text-slate-400">0 reports filed in past 24 hrs.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resources Dispatched</h4>
            <div className="text-3xl font-bold text-white">0%</div>
            <p className="text-xs text-slate-400">0 tactical crews active.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Alerts</h4>
            <div className="text-3xl font-bold text-white">0</div>
            <p className="text-xs text-slate-400">0 active broadcast zones.</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Synapse Status</h4>
            <div className="text-3xl font-bold text-green-500">READY</div>
            <p className="text-xs text-slate-400">IBM Granite connected.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900 border border-slate-800 h-96 flex flex-col justify-center items-center text-center">
            <div className="text-slate-500 font-mono text-sm">[Incident Monitor Area - Ready for Integration]</div>
            <p className="text-xs text-slate-400 max-w-md mt-2">
              This space will display the active feed from the FastAPI endpoint `/api/v1/disasters`.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 h-96 flex flex-col justify-center items-center text-center">
            <div className="text-slate-500 font-mono text-sm">[AI Assistant Sidepanel - IBM watsonx]</div>
            <p className="text-xs text-slate-400 max-w-sm mt-2">
              Provides direct intelligence feeds using `/api/v1/disasters/ai-advice` connected to Granite model.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
