import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="flex gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
            <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
            <img src={reactLogo} className="h-16 w-16 animate-spin" alt="React logo" />
          </a>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Vite + React + Tailwind</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Count is {count}
          </button>
          <p className="mt-4 text-gray-600 text-center">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          Built with ❤️ using React + Vite + Tailwind CSS
        </p>
      </div>
    </div>
  )
}

export default App
