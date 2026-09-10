import { useAuthStore } from '../store/authStore'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  if (!user) {
    return (
      <div className="container-lg py-12 text-center">
        <p className="text-gray-600 mb-4">You need to be logged in to access the dashboard</p>
        <Link to="/login" className="btn btn-primary">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container-lg py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">CampusConnect</span>
          </div>
          <div className="flex items-center space-x-4 relative">
            <span className="text-gray-700 font-medium">{user.name}</span>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
            {showMenu && (
              <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container-lg py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium">OPPORTUNITIES SAVED</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
            <Link to="/saved" className="text-emerald-600 text-sm mt-2 inline-block">
              View Saved →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium">APPLICATIONS SUBMITTED</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
            <Link to="/applications" className="text-emerald-600 text-sm mt-2 inline-block">
              View Applications →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium">PROFILE COMPLETION</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">0%</p>
            <Link to="/profile" className="text-emerald-600 text-sm mt-2 inline-block">
              Complete Profile →
            </Link>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h2>
          <p className="text-gray-600 mb-6">
            Your dashboard is ready. Start exploring opportunities that match your interests.
          </p>
          <Link to="/opportunities" className="btn btn-primary btn-lg">
            Browse Opportunities
          </Link>
        </div>
      </div>
    </div>
  )
}
