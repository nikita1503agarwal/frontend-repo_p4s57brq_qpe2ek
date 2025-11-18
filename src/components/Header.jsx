import { useState } from 'react'

export default function Header({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'tts', label: 'Text to Speech' },
    { id: 'asr', label: 'Single ASR' },
    { id: 'batch', label: 'Batch ASR' },
  ]

  return (
    <header className="relative z-10 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-white text-2xl font-semibold tracking-tight">Enterprise Speech Playground</h1>
              <p className="text-blue-200/70 text-sm">Try ASR, TTS and batch processing in one place</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 flex gap-2 bg-slate-800/60 border border-blue-500/20 rounded-xl p-1 backdrop-blur">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t.id
                  ? 'bg-blue-500 text-white shadow'
                  : 'text-blue-200 hover:bg-slate-700/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
