import { useState } from 'react'
import Header from './components/Header'
import TTS from './components/TTS'
import ASR from './components/ASR'
import BatchASR from './components/BatchASR'

function App() {
  const [active, setActive] = useState('tts')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative">
        <Header activeTab={active} onTabChange={setActive} />

        <main className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <div className="text-blue-200/80 text-sm mb-2">Backend URL: {import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}</div>
          </div>
          {active === 'tts' && (
            <div className="md:col-span-2"><TTS /></div>
          )}
          {active === 'asr' && (
            <div className="md:col-span-2"><ASR /></div>
          )}
          {active === 'batch' && (
            <div className="md:col-span-2"><BatchASR /></div>
          )}
        </main>

        <footer className="text-center text-blue-300/60 text-sm py-8">
          Demo purposes only. Plug in your enterprise ASR/TTS engines behind these APIs.
        </footer>
      </div>
    </div>
  )
}

export default App
