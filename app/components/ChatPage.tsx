'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  type: 'user' | 'agent'
  content: string
  response?: {
    description: string
    videoUrl?: string
    aiTool?: {
      name: string
      url: string
      description: string
    }
  }
}

interface ChatPageProps {
  username: string
  onLogout: () => void
}

export default function ChatPage({ username, onLogout }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query: userMessage.content }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'Here\'s what I found for you:',
        response: data,
      }

      setMessages((prev) => [...prev, agentMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `Sorry, I encountered an error: ${error.message}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>🤖 AI Awareness Agent</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: '#667eea', fontWeight: 600 }}>Hello, {username}!</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h2>Welcome to AI Awareness Agent! 🚀</h2>
            <p>Ask me anything about health, money, development, or any topic.</p>
            <p>I'll provide you with insights, YouTube tutorials, and AI tools to help you!</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'user' ? username[0].toUpperCase() : '🤖'}
            </div>
            <div className="message-content">
              {message.type === 'user' ? (
                <p>{message.content}</p>
              ) : (
                <div className="topic-response">
                  <div className="topic-description">
                    {message.response?.description || message.content}
                  </div>

                  {message.response && (
                    <div className="resources">
                      {message.response.videoUrl && (
                        <a
                          href={message.response.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-link"
                        >
                          <span className="resource-icon">🎥</span>
                          Watch Tutorial Video
                        </a>
                      )}

                      {message.response.aiTool && (
                        <>
                          <a
                            href={message.response.aiTool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-link"
                          >
                            <span className="resource-icon">🤖</span>
                            Try {message.response.aiTool.name}
                          </a>

                          <div className="tool-guide">
                            <h4>How to use {message.response.aiTool.name}:</h4>
                            <p>{message.response.aiTool.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message agent">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="loading">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about health, money, development, AI tools..."
            disabled={loading}
          />
          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
