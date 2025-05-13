/**
 * © 2025 Developer. All Rights Reserved.
 * Jangan menyalin, mendistribusikan, atau mereproduksi tanpa izin tertulis.
 */

'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('Tidak ada file dipilih');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setCode(event.target.result);
    };
    reader.readAsText(file);
  };

  const startGenerating = () => {
    if (!code.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    let currentProgress = 0;
    timerRef.current = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(timerRef.current);
        setIsGenerating(false);
        setProgress(100);
      } else {
        setProgress(currentProgress);
      }
    }, 300);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">🎥 Code to Video Creator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Code Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-[70vh] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">📁 Masukkan Kode Anda</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow bg-gray-700 text-green-400 p-4 rounded-md resize-none focus:outline-none font-mono"
              placeholder="Tulis kode JavaScript/HTML/CSS di sini..."
            />
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">Upload File Kode</label>
              <input
                type="file"
                accept=".txt,.js,.html,.css"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700"
              />
              <p className="mt-2 text-xs text-gray-400">{fileName}</p>
            </div>
            <button
              onClick={startGenerating}
              disabled={isGenerating || !code.trim()}
              className={`mt-4 py-2 px-4 rounded-md font-medium transition-colors ${
                isGenerating || !code.trim()
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isGenerating ? 'Membuat...' : 'Create Video'}
            </button>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-[70vh] flex flex-col relative overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">🖥️ Preview Video</h2>
            <div className="flex-grow bg-black rounded-md border border-gray-600 p-4 overflow-y-auto font-mono text-sm text-green-400 relative">
              {!isGenerating && progress === 0 && (
                <p className="text-gray-400 italic">Klik tombol "Create Video" untuk memulai...</p>
              )}
              {isGenerating && (
                <TypingAnimation code={code} />
              )}
              {!isGenerating && progress === 100 && (
                <div className="text-center">
                  <p className="text-green-400 font-bold">✅ Video berhasil dibuat!</p>
                  <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4 "
                    controls
                    className="w-full mt-4 rounded"
                  />
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="mt-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-right mt-1 text-sm">{progress}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Simulasi animasi mengetik kode
function TypingAnimation({ code }) {
  const lines = code.split('\n');
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    setVisibleLines([]);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < lines.length) {
        setVisibleLines((prev) => [...prev, lines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [code, lines]);

  return (
    <div>
      {visibleLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <span className="animate-pulse inline-block w-3 h-5 bg-green-400 ml-1"></span>
    </div>
  );
}
