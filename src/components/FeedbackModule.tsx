import React, { useState, useEffect } from 'react';
import { Star, Send, Loader2, MessageSquare, CheckCircle2 } from 'lucide-react';

interface FeedbackModuleProps {
  idToken: string | null;
}

export function FeedbackModule({ idToken }: FeedbackModuleProps) {
  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);

  useEffect(() => {
    if (idToken) {
      loadFeedbacks();
    } else {
      setFeedbacks([]);
    }
  }, [idToken]);

  const loadFeedbacks = async () => {
    setIsLoadingFeedbacks(true);
    try {
      const res = await fetch("/api/feedback", {
        headers: {
          "Authorization": `Bearer ${idToken}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.feedbacks || []);
      }
    } catch (err) {
      console.error("Failed to load feedbacks:", err);
    } finally {
      setIsLoadingFeedbacks(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idToken) {
      setStatusMsg({ type: 'error', text: "Operator authentication required." });
      return;
    }
    if (!comments.trim()) {
      setStatusMsg({ type: 'error', text: "Please enter feedback comments." });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({ rating, comments })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: 'success', text: "Feedback logged to Cloud SQL successfully!" });
        setComments("");
        setRating(5);
        loadFeedbacks();
      } else {
        setStatusMsg({ type: 'error', text: data.error || "Submission failed." });
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setStatusMsg({ type: 'error', text: "Network error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4 text-xs">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <MessageSquare className="h-4 w-4 text-red-500 animate-pulse" />
        <span className="text-white font-mono uppercase tracking-wider font-bold">Feedback Channel</span>
      </div>

      {!idToken ? (
        <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-slate-400 leading-relaxed text-[11px]">
          ⚠️ <strong>UNAUTHORIZED OPERATOR:</strong> Establish a secure session (use the <strong>LOG IN</strong> button in the top header) to transmit official performance feedback directly to Cloud SQL.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono uppercase">Rating Level</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="cursor-pointer transition hover:scale-110"
                >
                  <Star
                    className={`h-4.5 w-4.5 ${
                      star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-mono uppercase">Operational Remarks</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-200 outline-none focus:border-red-500 transition text-[11px]"
              placeholder="Report HUD UX, AI triage quality, or system performance..."
              rows={2}
            />
          </div>

          {statusMsg && (
            <div
              className={`p-2.5 rounded-lg border text-[11px] ${
                statusMsg.type === 'success'
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-mono font-bold rounded-lg transition uppercase flex items-center justify-center gap-1.5 cursor-pointer text-[10px]"
          >
            {isSubmitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <Send className="h-3 w-3" />
                <span>Transmit to Postgres</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Database historic feedback logs */}
      {idToken && (
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Your Cloud SQL Transmissions</div>
          {isLoadingFeedbacks ? (
            <div className="flex items-center gap-2 text-slate-400 italic">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Querying database...</span>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-slate-500 italic text-[10px]">No telemetry comments on this account.</div>
          ) : (
            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1 font-mono text-[10px]">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="p-2 bg-slate-950 border border-slate-900 rounded space-y-1">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      {"★".repeat(fb.rating)}
                    </span>
                    <span className="text-slate-600">
                      {new Date(fb.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-slate-300 leading-normal font-sans text-[11px] break-words">{fb.comments}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedbackModule;
