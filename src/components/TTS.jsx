import { useState } from 'react'

export default function TTS() {
  const [text, setText] = useState('Hello, this is a demo TTS tone synthesis!')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSynthesize = async () => {
    setLoading(true)
    setAudioUrl(null)
    try {
      const res = await fetch(`${baseUrl}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (res.ok && data.audio_url) {
        setAudioUrl(`${baseUrl}${data.audio_url}`)
      } else {
        alert(data.error || 'Failed to synthesize')
      }
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
      <h2 className="text-white font-semibold mb-3">Text to Speech</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
        className="w-full bg-slate-900/60 text-blue-100 p-3 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text to synthesize..."
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSynthesize}
          disabled={loading || !text.trim()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg"
        >
          {loading ? 'Synthesizing...' : 'Synthesize'}
        </button>
      </div>
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} className="w-full" />
          <p className="text-blue-200/70 text-xs mt-2">This is a tone-based demo, not natural speech.</p>
        </div>
      )}
    </div>
  )
}
