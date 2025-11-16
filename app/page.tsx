'use client'

import { useState, useEffect } from 'react'
import AuthPage from './components/AuthPage'
import ChatPage from './components/ChatPage'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')

    if (token && savedUsername) {
      setIsAuthenticated(true)
      setUsername(savedUsername)
    }
    setLoading(false)
  }, [])

  const handleLogin = (token: string, user: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', user)
    setIsAuthenticated(true)
    setUsername(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
    setUsername('')
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: 'white',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      {!isAuthenticated ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <ChatPage username={username} onLogout={handleLogout} />
      )}
    </>
  )
}
