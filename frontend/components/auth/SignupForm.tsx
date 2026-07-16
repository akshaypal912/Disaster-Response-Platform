import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

export function SignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMsg(error.message);
    else {
      setMsg("Verification package transmitted to inbox.");
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
      <h3 className="text-sm font-bold text-white font-mono">REQUEST CLEARANCE</h3>
      {msg && <div className="p-2 bg-slate-850 text-xs rounded text-slate-300">{msg}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 p-2 text-xs border border-slate-800 rounded text-white" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 p-2 text-xs border border-slate-800 rounded text-white" required />
      <button type="submit" className="w-full py-2 bg-slate-800 text-white rounded text-xs font-mono">GENERATE ACCOUNT</button>
    </form>
  );
}
