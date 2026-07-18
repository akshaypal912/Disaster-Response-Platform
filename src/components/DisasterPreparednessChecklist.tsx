import React, { useState, useEffect } from "react";
import { CheckSquare, Square, Sparkles, CheckCircle2, ListTodo, ShieldAlert, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
}

interface DisasterPreparednessChecklistProps {
  disasterId: string;
  disasterName: string;
}

const DEFAULT_CHECKLISTS: Record<string, Omit<ChecklistItem, "checked">[]> = {
  floods: [
    { id: "flood-water", label: "Drinking Water (at least 3 liters per person/day)", required: true },
    { id: "flood-medicine", label: "Prescription & Essential Medicine", required: true },
    { id: "flood-flashlight", label: "Waterproof Flashlight with extra batteries", required: true },
    { id: "flood-powerbank", label: "High-capacity Power Bank (fully charged)", required: true },
    { id: "flood-docs", label: "Waterproof pouch for identity documents & cash", required: false },
  ],
  earthquakes: [
    { id: "quake-helmet", label: "Safety Helmet or protective headgear", required: true },
    { id: "quake-shoes", label: "Sturdy, thick-soled closed shoes", required: true },
    { id: "quake-firstaid", label: "Comprehensive First Aid Kit", required: true },
    { id: "quake-mask", label: "Dust Mask or bandana (to filter debris dust)", required: false },
    { id: "quake-whistle", label: "Emergency Whistle (to signal rescuers)", required: false },
  ],
  fires: [
    { id: "fire-cloth", label: "Wet Cloth or face masks for breathing", required: true },
    { id: "fire-extinguisher", label: "Working Fire Extinguisher (Class A/B/C)", required: true },
    { id: "fire-route", label: "Clear Exit Route Map and door keys ready", required: true },
    { id: "fire-goggles", label: "Protective Goggles (to shield eyes from smoke)", required: false },
  ],
  cyclones: [
    { id: "cyclone-food", label: "Dry Food and non-perishables", required: true },
    { id: "cyclone-batteries", label: "Fresh Batteries / backup power cells", required: true },
    { id: "cyclone-radio", label: "Emergency Radio (AM/FM or NOAA bands)", required: true },
    { id: "cyclone-fasteners", label: "Sturdy ropes/tapes to secure windows & loose panels", required: false },
  ],
  landslides: [
    { id: "landslide-whistle", label: "Emergency Whistle & signal device", required: true },
    { id: "landslide-boots", label: "Sturdy boots & weatherproof gear", required: true },
    { id: "landslide-evac", label: "Clear escape routing layout coordinates", required: true },
    { id: "landslide-flashlight", label: "High-intensity Beacon/Flashlight", required: false },
  ],
  heatwaves: [
    { id: "heat-electrolytes", label: "Electrolyte Salts / Rehydration packets", required: true },
    { id: "heat-water", label: "Insulated Water Container (constantly refilled)", required: true },
    { id: "heat-sunscreen", label: "Sunscreens, sunglasses, & wide-brimmed hats", required: true },
    { id: "heat-towel", label: "Cooling Towels or ice packs", required: false },
  ],
};

const STORAGE_KEY_PREFIX = "disaster_checklist_";

export function DisasterPreparednessChecklist({ disasterId, disasterName }: DisasterPreparednessChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [customInput, setCustomInput] = useState("");

  // Load checklist items from localStorage or defaults when disasterId changes
  useEffect(() => {
    const storageKey = `${STORAGE_KEY_PREFIX}${disasterId}`;
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      try {
        setItems(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing checklist from localStorage", e);
        initializeDefaults();
      }
    } else {
      initializeDefaults();
    }
  }, [disasterId]);

  const initializeDefaults = () => {
    const defaults = DEFAULT_CHECKLISTS[disasterId] || [
      { id: "default-water", label: "Stored drinking water supply", required: true },
      { id: "default-firstaid", label: "Emergency contact numbers & first-aid items", required: true },
    ];
    
    const initialItems = defaults.map(item => ({
      ...item,
      checked: false,
    }));
    
    setItems(initialItems);
    saveToStorage(initialItems);
  };

  const saveToStorage = (updatedItems: ChecklistItem[]) => {
    const storageKey = `${STORAGE_KEY_PREFIX}${disasterId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
  };

  const handleToggle = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
    saveToStorage(updated);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      label: trimmed,
      required: false,
      checked: false,
    };

    const updated = [...items, newItem];
    setItems(updated);
    saveToStorage(updated);
    setCustomInput("");
  };

  const handleRemoveItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    saveToStorage(updated);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset this disaster preparedness checklist back to its defaults?")) {
      initializeDefaults();
    }
  };

  // Calculate progress
  const totalItems = items.length;
  const checkedItems = items.filter(item => item.checked).length;
  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-slate-950/60 border border-slate-900/80 p-5 rounded-2xl text-xs space-y-4 shadow-xl backdrop-blur-sm relative overflow-hidden" id="disaster-preparedness-checklist">
      <div className="absolute top-0 right-0 h-24 w-24 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-violet-500/10 border border-violet-500/25 rounded-lg text-violet-400">
            <ListTodo className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-mono text-white font-black tracking-wider uppercase text-xs">
              Sector Preparedness Hub
            </h3>
            <p className="text-[9px] font-mono text-slate-500 uppercase">
              Tactical checklist for: <span className="text-violet-400 font-bold">{disasterName}</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-[9px] font-mono text-slate-400 hover:text-white border border-slate-900 bg-slate-950/40 px-2 py-0.5 rounded cursor-pointer transition"
          title="Reset checklist to original settings"
        >
          RESET
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-950 border border-slate-900/50 p-3 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-[10px] font-mono">
          <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-violet-400 animate-pulse" />
            Clearance level
          </span>
          <span className={`${progressPercent === 100 ? 'text-emerald-400 font-black animate-bounce' : 'text-violet-400 font-bold'}`}>
            {progressPercent}% Prepared ({checkedItems}/{totalItems})
          </span>
        </div>
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-950">
          <motion.div 
            className={`h-full rounded-full transition-all duration-300 ${
              progressPercent === 100 
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                : "bg-gradient-to-r from-violet-500 to-indigo-400 shadow-[0_0_8px_rgba(139,92,246,0.2)]"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        {progressPercent === 100 && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono mt-1 font-bold"
          >
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>CRITICAL SECTOR SAFEGUARD MET - ALL GEAR DEPLOYED</span>
          </motion.div>
        )}
      </div>

      {/* Checklist List */}
      <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={() => handleToggle(item.id)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition cursor-pointer select-none group ${
                item.checked 
                  ? "bg-emerald-500/5 border-emerald-500/20 text-slate-400 hover:bg-emerald-500/10" 
                  : "bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-200 hover:bg-slate-950/80"
              }`}
            >
              <button 
                type="button"
                className="mt-0.5 shrink-0 focus:outline-none transition-transform active:scale-90"
              >
                {item.checked ? (
                  <CheckSquare className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Square className="h-4 w-4 text-slate-600 group-hover:text-slate-500" />
                )}
              </button>
              
              <div className="flex-1 space-y-0.5 min-w-0">
                <p className={`text-[11px] leading-tight transition-all break-words ${
                  item.checked ? "line-through text-slate-500 font-normal" : "font-medium"
                }`}>
                  {item.label}
                </p>
                {item.required && !item.checked && (
                  <span className="inline-flex items-center gap-1 text-[8px] font-mono text-red-400/80 uppercase font-black tracking-wider">
                    <ShieldAlert className="h-2 w-2 text-red-400" />
                    Life-Critical
                  </span>
                )}
              </div>

              {/* Remove button (primarily for custom items, but can work on custom items only or any) */}
              {item.id.startsWith("custom-") && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveItem(item.id);
                  }}
                  className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-slate-900 cursor-pointer opacity-0 group-hover:opacity-100 transition shrink-0"
                  title="Remove item"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddCustomItem} className="flex gap-1.5 pt-2 border-t border-slate-900/60">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Add custom safeguard equipment..."
          maxLength={80}
          className="flex-1 bg-slate-950 border border-slate-900 rounded-lg p-2 text-[10px] text-slate-200 outline-none focus:border-violet-500/40 transition font-mono"
        />
        <button
          type="submit"
          className="px-3 bg-violet-600 hover:bg-violet-500 border border-violet-500/30 hover:border-violet-400/40 rounded-lg text-white font-mono font-bold uppercase transition flex items-center gap-1 text-[10px] cursor-pointer shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}

export default DisasterPreparednessChecklist;
