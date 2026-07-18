import React, { useState } from 'react';

export interface AIChatbotProps {
  disasterId: string;
  disasterName: string;
  locationName: string;
  lat: string;
  lng: string;
  facilities: any[];
  gridStatus: string;
  severity: string;
  languageCode: string;
}

export function AIChatbot({
  disasterId,
  disasterName,
  locationName,
  lat,
  lng,
  facilities,
  gridStatus,
  severity,
  languageCode
}: AIChatbotProps) {
  const [chat, setChat] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const triggerChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userQuery = input.trim();
    setChat(prev => [...prev, { role: 'user', text: userQuery }]);
    setInput("");
    setIsLoading(true);

    // Robust client-side retry logic
    const maxRetries = 2;
    let attempt = 0;
    let success = false;
    let data: any = null;

    while (attempt <= maxRetries && !success) {
      try {
        const res = await fetch('/api/disaster', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            disasterType: disasterName,
            userLocation: `${locationName} (${lat}, ${lng})`,
            userQuery: userQuery,
            selectedLanguage: languageCode
          })
        });

        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }

        data = await res.json();
        success = true;
      } catch (err) {
        attempt++;
        if (attempt > maxRetries) {
          console.error("Failed to query disaster AI assistance after retries:", err);
        } else {
          await new Promise(resolve => setTimeout(resolve, 800 * attempt));
        }
      }
    }

    setIsLoading(false);

    if (success && data) {
      // Dynamic formatter to present the structured JSON neatly inside the chat log
      const buildFormattedAdvice = (d: any) => {
        const isSpanish = languageCode.toUpperCase() === "ES";
        const isFrench = languageCode.toUpperCase() === "FR";

        const labelSummary = isSpanish ? "RESUMEN" : isFrench ? "RÉSUMÉ" : "SUMMARY";
        const labelPriority = isSpanish ? "PRIORIDAD" : isFrench ? "PRIORITÉ" : "PRIORITY";
        const labelActions = isSpanish ? "ACCIONES INMEDIATAS" : isFrench ? "ACTIONS IMMÉDIATES" : "IMMEDIATE ACTIONS";
        const labelAvoid = isSpanish ? "A EVITAR" : isFrench ? "À ÉVITER" : "THINGS TO AVOID";
        const labelChecklist = isSpanish ? "LISTA DE EMERGENCIA" : isFrench ? "LISTE DE CONTRÔLE" : "EMERGENCY CHECKLIST";
        const labelResources = isSpanish ? "RECURSOS CERCANOS" : isFrench ? "RESSOURCES PROCHES" : "NEARBY RESOURCES";
        const labelFirstAid = isSpanish ? "PRIMEROS AUXILIOS" : isFrench ? "PREMIERS SECOURS" : "FIRST AID";
        const labelEvac = isSpanish ? "PASOS DE EVACUACIÓN" : isFrench ? "ÉVACUATION ÉTAPE PAR ÉTAPE" : "EVACUATION STEPS";

        return `🚨 [${labelPriority}: ${String(d.priority).toUpperCase()}]
${String(d.summary)}

📋 ${labelActions}:
${Array.isArray(d.immediate_actions) ? d.immediate_actions.map((item: string) => `• ${item}`).join('\n') : "• N/A"}

⚠️ ${labelAvoid}:
${Array.isArray(d.things_to_avoid) ? d.things_to_avoid.map((item: string) => `• ${item}`).join('\n') : "• N/A"}

🎒 ${labelChecklist}:
${Array.isArray(d.emergency_checklist) ? d.emergency_checklist.map((item: string) => `• ${item}`).join('\n') : "• N/A"}

📍 ${labelResources}:
${Array.isArray(d.nearby_resources) ? d.nearby_resources.map((item: string) => `• ${item}`).join('\n') : "• N/A"}

🩹 ${labelFirstAid}:
${Array.isArray(d.first_aid) ? d.first_aid.map((item: string) => `• ${item}`).join('\n') : "• N/A"}

🏃 ${labelEvac}:
${Array.isArray(d.evacuation_steps) ? d.evacuation_steps.map((item: string) => `• ${item}`).join('\n') : "• N/A"}`;
      };

      const formattedText = buildFormattedAdvice(data);
      setChat(prev => [...prev, { role: 'bot', text: formattedText }]);
    } else {
      // Graceful fallback to dynamic props info in case of complete connection loss
      const fallbackText = `⚠️ [TACTICAL DISCONNECT] Emergency link offline. Sector details for ${locationName} (${lat}, ${lng}): Monitoring a ${severity} ${disasterName}. Power status is ${gridStatus}. We recommend relocating to any of the ${facilities.length} designated shelters immediately. Tune in to localized radio alerts.`;
      setChat(prev => [...prev, { role: 'bot', text: fallbackText }]);
    }
  };

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs">
      <h3 className="text-white font-mono flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        TAC-AI ASSISTANT (GEMINI PROXIED)
      </h3>
      <div className="h-32 overflow-y-auto space-y-2">
        <div className="p-2 rounded bg-slate-950/80 text-left text-slate-400">
          Ready for tactical queries in {locationName}. Ask me anything about evacuation routes, survival metrics, or shelter capacity.
        </div>
        {chat.map((c, i) => <div key={i} className={`p-2 rounded whitespace-pre-wrap text-xs leading-relaxed ${c.role === 'user' ? 'bg-red-950/40 text-right text-white' : 'bg-slate-950/80 text-left text-slate-300'}`}>{c.text}</div>)}
      </div>
      <form onSubmit={triggerChat} className="flex gap-2">
        <input disabled={isLoading} value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 p-2 rounded text-white text-xs" placeholder={isLoading ? "Consulting tactical coordinators..." : "Query Gemini API..."} />
        <button disabled={isLoading} className="px-3 bg-red-600 rounded text-white font-mono hover:bg-red-500 transition disabled:opacity-55">{isLoading ? "SYNC..." : "SEND"}</button>
      </form>
    </div>
  );
}

export default AIChatbot;

