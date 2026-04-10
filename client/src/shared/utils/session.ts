import { type UserRole, type SessionData } from '../types'

const SESSION_KEY = 'talentos_session'

export function setSession(role: UserRole): void {
  const sessionData: SessionData = { role }
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
}

export function getSession(): SessionData | null {
  try {
    const data = localStorage.getItem(SESSION_KEY)
    if (!data) return null
    return JSON.parse(data) as SessionData
  } catch {
    return null
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}
