import React, { useState } from 'react';

const TXT = {
  en: { title: "Feedback Channel", send: "Transmit" },
  zu: { title: "Isiteshi Semibiko", send: "Thumela" }
};

export function FeedbackModule() {
  const [lang, setLang] = useState<'en' | 'zu'>('en');

  return (
    <div className="bg-slate-900 p-4 border border-slate-800 rounded-lg text-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-mono">{TXT[lang].title}</span>
        <button onClick={() => setLang(lang === 'en' ? 'zu' : 'en')} className="p-1 bg-slate-800 rounded text-slate-400 font-mono text-[10px]">
          {lang === 'en' ? 'ZULU' : 'ENGLISH'}
        </button>
      </div>
      <textarea className="w-full bg-slate-950 p-2 rounded border border-slate-800 text-white mb-2" placeholder="..." />
      <button className="w-full py-1 bg-red-600 text-white rounded font-mono uppercase">{TXT[lang].send}</button>
    </div>
  );
}
