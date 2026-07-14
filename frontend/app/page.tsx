import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-8 max-w-4xl mx-auto text-center" id="next-home">
      <div className="space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
          SYSTEM ACTIVE &bull; STAGE 1 READY
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          AI Disaster <span className="text-red-500">Response</span> Assistant
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Tactical crisis coordination platform featuring real-time OpenStreetMap situational analysis, 
          resource routing, alert broadcasting, and IBM Granite AI synthesis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-12">
        <Link 
          href="/dashboard"
          className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left group"
          id="btn-nav-dashboard"
        >
          <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition">
            Tactical Dashboard &rarr;
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            View operational overview, incoming status reports, and active dispatch teams.
          </p>
        </Link>

        <Link 
          href="/map"
          className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left group"
          id="btn-nav-map"
        >
          <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition">
            Crisis Mapping &rarr;
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Interactive OpenStreetMap and Leaflet map displaying active zones and resources.
          </p>
        </Link>

        <Link 
          href="/alerts"
          className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left group"
          id="btn-nav-alerts"
        >
          <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition">
            Alert Broadcast &rarr;
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Send emergency bulletins, register evacuations, and monitor alert history.
          </p>
        </Link>

        <Link 
          href="/resources"
          className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left group"
          id="btn-nav-resources"
        >
          <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition">
            Resource Logistics &rarr;
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Manage physical assets, medical reserves, search-and-rescue teams, and shelter status.
          </p>
        </Link>
      </div>

      <div className="mt-12 flex gap-4 text-xs text-slate-500">
        <span>Framework: Next.js 15 (App Router)</span>
        <span>&bull;</span>
        <span>Engine: FastAPI</span>
        <span>&bull;</span>
        <span>Database: Supabase</span>
        <span>&bull;</span>
        <span>AI: IBM Granite LLM</span>
      </div>
    </main>
  );
}
