import { create } from 'zustand'
import { User, UserRole, AuthToken } from '@/types'
import axios from 'axios'

interface AuthState {
  user: User | null
  token: AuthToken | null
  isInitializing: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
  googleAuth: (idToken: string) => Promise<void>
  appleAuth: (idToken: string) => Promise<void>
  refreshToken: () => Promise<void>
  initializeAuth: () => Promise<void>
  clearError: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isInitializing: true,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      })
      const { user, token } = response.data.data
      set({ user, token })
      localStorage.setItem('authToken', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  signup: async (email: string, password: string, name: string, role: UserRole) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password,
        name,
        role,
      })
      const { user, token } = response.data.data
      set({ user, token })
      localStorage.setItem('authToken', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  googleAuth: async (idToken: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${API_URL}/api/auth/google`, {
        idToken,
      })
      const { user, token } = response.data.data
      set({ user, token })
      localStorage.setItem('authToken', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error: any) {
      const message = error.response?.data?.message || 'Google authentication failed'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  appleAuth: async (idToken: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${API_URL}/api/auth/apple`, {
        idToken,
      })
      const { user, token } = response.data.data
      set({ user, token })
      localStorage.setItem('authToken', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error: any) {
      const message = error.response?.data?.message || 'Apple authentication failed'
      set({ error: message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  refreshToken: async () => {
    try {
      const currentToken = get().token
      if (!currentToken?.refreshToken) return

      const response = await axios.post(`${API_URL}/api/auth/refresh`, {
        refreshToken: currentToken.refreshToken,
      })
      const { token } = response.data.data
      set({ token })
      localStorage.setItem('authToken', JSON.stringify(token))
    } catch (error) {
      get().logout()
    }
  },

  initializeAuth: async () => {
    try {
      const storedToken = localStorage.getItem('authToken')
      const storedUser = localStorage.getItem('user')

      if (storedToken && storedUser) {
        const token = JSON.parse(storedToken)
        const user = JSON.parse(storedUser)
        set({ user, token })

        // Verify token is still valid
        try {
          await axios.get(`${API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
        } catch (error) {
          // Token expired, try to refresh
          await get().refreshToken()
        }
      }
    } catch (error) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    } finally {
      set({ isInitializing: false })
    }
  },

  clearError: () => set({ error: null }),
}))
