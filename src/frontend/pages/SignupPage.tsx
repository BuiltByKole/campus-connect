import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../store/authStore'
import { Link } from '@tanstack/react-router'
import { UserRole } from '@/types'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup, isLoading, error, clearError } = useAuthStore()
  const [step, setStep] = useState<'role' | 'details' | 'profile'>('role')
  const [formData, setFormData] = useState({
    role: '' as UserRole | '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  })
  const [formError, setFormError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError('')
    clearError()
  }

  const handleRoleSelect = (role: UserRole) => {
    setFormData((prev) => ({ ...prev, role }))
    setStep('details')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.email || !formData.password || !formData.name || !formData.role) {
      setFormError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters')
      return
    }

    try {
      await signup(formData.email, formData.password, formData.name, formData.role as UserRole)
      navigate({ to: `/onboarding/${formData.role}` })
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Signup failed. Please try again.')
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

        {/* Step 1: Role Selection */}
        {step === 'role' && (
          <>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Create Your Account</h2>
            <p className="mt-2 text-center text-gray-600">I am a...</p>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => handleRoleSelect(UserRole.STUDENT)}
                className="w-full card p-6 text-center hover:bg-emerald-50 hover:border-emerald-300 transition-all"
              >
                <div className="text-4xl mb-2">🎓</div>
                <h3 className="font-bold text-gray-900">Student</h3>
                <p className="text-sm text-gray-600 mt-1">Find opportunities</p>
              </button>

              <button
                onClick={() => handleRoleSelect(UserRole.COMPANY)}
                className="w-full card p-6 text-center hover:bg-emerald-50 hover:border-emerald-300 transition-all"
              >
                <div className="text-4xl mb-2">💼</div>
                <h3 className="font-bold text-gray-900">Company</h3>
                <p className="text-sm text-gray-600 mt-1">Post opportunities</p>
              </button>
            </div>
          </>
        )}

        {/* Step 2: Account Details */}
        {step === 'details' && (
          <>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-center text-gray-600">As a {formData.role}</p>

            <form onSubmit={(e) => { e.preventDefault(); setStep('profile') }} className="mt-8 space-y-6">
              {(formError || error) && (
                <div className="alert alert-error">
                  {formError || error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
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
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                />
                <p className="form-hint">At least 8 characters</p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full btn btn-primary btn-lg">
                Continue
              </button>

              <button
                type="button"
                onClick={() => setStep('role')}
                className="w-full btn btn-secondary btn-lg"
              >
                Back
              </button>
            </form>
          </>
        )}

        {/* Step 3: Profile */}
        {step === 'profile' && (
          <>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Confirm Details</h2>
            <p className="mt-2 text-center text-gray-600">Review your information</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {(formError || error) && (
                <div className="alert alert-error">
                  {formError || error}
                </div>
              )}

              <div className="card p-4 bg-gray-50">
                <p className="text-sm text-gray-600">Name: <span className="font-medium text-gray-900">{formData.name}</span></p>
                <p className="text-sm text-gray-600 mt-2">Email: <span className="font-medium text-gray-900">{formData.email}</span></p>
                <p className="text-sm text-gray-600 mt-2">Role: <span className="font-medium text-gray-900 capitalize">{formData.role}</span></p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn btn-primary btn-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="spinner mr-2"></span>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full btn btn-secondary btn-lg"
              >
                Back
              </button>
            </form>
          </>
        )}

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
