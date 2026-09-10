import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/authStore'
import { Link } from '@tanstack/react-router'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [formError, setFormError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError('')
    clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields')
      return
    }

    try {
      await login(formData.email, formData.password)
      navigate({ to: '/dashboard' })
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">CampusConnect</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-center text-gray-600">Sign in to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {(formError || error) && (
            <div className="alert alert-error">
              {formError || error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary btn-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="spinner mr-2"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Social Auth - Future Enhancement */}
        <div className="mt-6 border-t border-gray-300 pt-6">
          <p className="text-center text-sm text-gray-600 mb-4">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-secondary" disabled>
              Google
            </button>
            <button className="btn btn-secondary" disabled>
              Apple
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">Social login coming soon</p>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
