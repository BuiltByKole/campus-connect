import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import { routeTree } from './routes'
import { Analytics } from '@vercel/analytics/react'
import './styles/globals.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const { initializeAuth, isInitializing } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [])

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading CampusConnect...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}
