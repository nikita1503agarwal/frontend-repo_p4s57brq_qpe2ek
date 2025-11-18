import { useState } from 'react'

export default function BatchASR() {
  const [files, setFiles] = useState([])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleUpload = async () => {
    if (!files || files.length === 0) return
    setLoading(true)
    setResults(null)
    try {
      const form = new FormData()
      for (const f of files) form.append('files', f)
      const res = await fetch(`${baseUrl}/api/asr/batch`, { method: 'POST', body: form })
      const data = await res.json()
      setResults(data.results)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
      <h2 className="text-white font-semibold mb-3">Batch ASR</h2>
      <input type="file" accept="audio/*,.wav" multiple onChange={e => setFiles(Array.from(e.target.files || []))}
             className="block w-full text-blue-100" />
      <button
        onClick={handleUpload}
        disabled={!files || files.length === 0 || loading}
        className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg"
      >
        {loading ? 'Processing...' : 'Transcribe Batch'}
      </button>

      {results && (
        <div className="mt-4 text-blue-100 text-sm">
          <pre className="bg-slate-900/60 p-3 rounded border border-slate-700 overflow-x-auto">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
