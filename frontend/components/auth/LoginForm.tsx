import React, { useState } from "react";
import { Mail, Lock, Loader2, ShieldAlert } from "lucide-react";
import { supabase } from "../../lib/supabase";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) setError(authError.message);
    else if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleLogin} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
      <h3 className="text-md font-bold text-white font-mono">LOGIN CLEARANCE</h3>
      {error && <div className="p-2 bg-red-900/20 border border-red-900 text-red-400 text-xs rounded">{error}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 p-2 text-xs border border-slate-800 rounded text-white" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 p-2 text-xs border border-slate-800 rounded text-white" required />
      <button type="submit" className="w-full py-2 bg-red-600 text-white rounded text-xs font-bold flex justify-center items-center">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "AUTHENTICATE"}
      </button>
    </form>
  );
}
