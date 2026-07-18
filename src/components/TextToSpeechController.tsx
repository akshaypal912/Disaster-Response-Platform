import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export interface TextToSpeechControllerProps {
  textToRead: string;
  languageCode?: string;
  title?: string;
}

export function TextToSpeechController({ textToRead, languageCode, title }: TextToSpeechControllerProps) {
  const [speaking, setSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const u = new SpeechSynthesisUtterance(textToRead);
      if (languageCode) {
        u.lang = languageCode;
      }
      u.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
      setSpeaking(true);
    }
  };

  return (
    <button onClick={toggleSpeech} className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 text-xs">
      {speaking ? <VolumeX className="h-4 w-4 text-red-500 animate-pulse" /> : <Volume2 className="h-4 w-4" />}
      <span>{speaking ? 'MUTE AUDITORY FEED' : (title || 'PLAY AUDITORY SOP (TTS)')}</span>
    </button>
  );
}

export default TextToSpeechController;


