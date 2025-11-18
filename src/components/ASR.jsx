import { useState } from 'react'

export default function ASR() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setResult(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${baseUrl}/api/asr`, { method: 'POST', body: form })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
      <h2 className="text-white font-semibold mb-3">Single ASR</h2>
      <input type="file" accept="audio/*,.wav" onChange={e => setFile(e.target.files?.[0] || null)}
             className="block w-full text-blue-100" />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg"
      >
        {loading ? 'Processing...' : 'Transcribe'}
      </button>

      {result && (
        <div className="mt-4 text-blue-100 text-sm">
          <p className="font-semibold">File: <span className="font-normal">{result.filename}</span></p>
          <pre className="mt-2 bg-slate-900/60 p-3 rounded border border-slate-700 overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
