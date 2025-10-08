'use client'

import React, { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { v4 as uuidv4 } from 'uuid'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  text: string
}

export default function CreateDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [currentCode, setCurrentCode] = useState('// Your React code here\nfunction App() {\n  return <h1>Hello World</h1>\n}')
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<Terminal | null>(null)

  // Initialize terminal
  useEffect(() => {
    if (terminalRef.current && !xtermRef.current) {
      const term = new Terminal({ cursorBlink: true })
      term.open(terminalRef.current)
      term.writeln('Welcome to your AI-powered dev environment!')
      term.writeln('$ npm run preview')
      xtermRef.current = term
    }
  }, [])

  // Handle sending chat
  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: ChatMessage = { id: uuidv4(), type: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: uuidv4(),
        type: 'ai',
        text: `// AI generated code snippet\nfunction Hello() { return <h2>AI says hi!</h2> }`,
      }
      setMessages((prev) => [...prev, aiMsg])
      // Optionally inject AI code into editor
      setCurrentCode((prev) => prev + '\n' + aiMsg.text)
    }, 1000)
  }

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Chat panel */}
      <div className="w-1/3 border-r border-gray-300 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-2 p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-gray-300 flex">
          <input
            className="flex-1 border border-gray-400 rounded-l px-2 py-1 focus:outline-none"
            placeholder="Type your prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      {/* Editor + Preview + Terminal */}
      <div className="w-2/3 flex flex-col">
        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="50%"
            language="javascript"
            theme="vs-dark"
            value={currentCode}
            onChange={(_, value) => setCurrentCode(value || '')}
          />
        </div>

        {/* Live Preview */}
        <div className="flex-1 border-t border-gray-300 relative">
          <iframe
            className="w-full h-full"
            srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Preview</title></head><body><div id="root"></div><script type="module">${currentCode}</script></body></html>`}
          />
        </div>

        {/* Terminal */}
        <div className="h-40 border-t border-gray-300 bg-black text-white" ref={terminalRef}></div>
      </div>
    </div>
  )
}
