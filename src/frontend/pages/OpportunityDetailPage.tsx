import { useEffect } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { useOpportunityStore } from '../store/opportunityStore'
import { useAuthStore } from '../store/authStore'
import { format } from 'date-fns'
import { VerificationStatus } from '@/types'

export default function OpportunityDetailPage() {
  const { id } = useParams({ from: '/opportunities/$id' })
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { currentOpportunity, isLoading, error, fetchOpportunityById } = useOpportunityStore()
  const [isSaved, setIsSaved] = React.useState(false)
  const [isApplying, setIsApplying] = React.useState(false)

  useEffect(() => {
    if (id) {
      fetchOpportunityById(id)
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="spinner mx-auto mb-4 border-4 border-emerald-200 border-t-emerald-600 w-8 h-8"></div>
          <p className="text-gray-600">Loading opportunity...</p>
        </div>
      </div>
    )
  }

  if (!currentOpportunity || error) {
    return (
      <div className="container-lg py-12">
        <div className="card p-8 text-center">
          <p className="text-gray-600 mb-4">Opportunity not found</p>
          <button
            onClick={() => navigate({ to: '/opportunities' })}
            className="btn btn-primary"
          >
            Back to Opportunities
          </button>
        </div>
      </div>
    )
  }

  const handleApply = () => {
    if (!user) {
      navigate({ to: '/login' })
      return
    }
    setIsApplying(true)
    // Application logic will be implemented
  }

  const getVerificationBadge = () => {
    switch (currentOpportunity.verificationStatus) {
      case VerificationStatus.VERIFIED:
        return <span className="badge badge-success">✓ Verified</span>
      case VerificationStatus.PENDING:
        return <span className="badge badge-warning">⏳ Pending Verification</span>
      case VerificationStatus.REJECTED:
        return <span className="badge badge-error">✗ Rejected</span>
      default:
        return <span className="badge badge-info">Unverified</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-lg py-6">
          <button
            onClick={() => navigate({ to: '/opportunities' })}
            className="text-emerald-600 hover:text-emerald-700 mb-4 text-sm font-medium"
          >
            ← Back to Opportunities
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">{currentOpportunity.title}</h1>
          <p className="text-gray-600 mt-2">{currentOpportunity.company?.name || 'Company'}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-lg py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Details */}
          <div className="lg:col-span-2">
            {/* Verification Status */}
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Verification Status</h3>
                {getVerificationBadge()}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This opportunity has been {currentOpportunity.verificationStatus} by our team.
              </p>
            </div>

            {/* Description */}
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About This Opportunity</h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                {currentOpportunity.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                {currentOpportunity.requirements}
              </div>
            </div>

            {/* Details Grid */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Type</p>
                  <p className="text-lg text-gray-900 mt-1">{currentOpportunity.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Work Arrangement</p>
                  <p className="text-lg text-gray-900 mt-1">{currentOpportunity.workArrangement.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Location</p>
                  <p className="text-lg text-gray-900 mt-1">{currentOpportunity.city}, {currentOpportunity.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Field</p>
                  <p className="text-lg text-gray-900 mt-1">{currentOpportunity.field}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Course</p>
                  <p className="text-lg text-gray-900 mt-1">{currentOpportunity.course}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Specialization</p>
                  <p className="text-lg text-gray-900 mt-1">{currentOpportunity.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Deadline</p>
                  <p className="text-lg text-gray-900 mt-1">{format(new Date(currentOpportunity.deadline), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">CV Required</p>
                  <p className="text-lg text-gray-900 mt-1">{currentOpportunity.cvRequired ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Company Card */}
            <div className="card p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">About the Company</h3>
              <div className="mb-4">
                <p className="text-gray-900 font-medium">{currentOpportunity.company?.name}</p>
                {currentOpportunity.company?.verified && (
                  <p className="text-sm text-emerald-600 mt-1">✓ Verified Company</p>
                )}
              </div>
              {currentOpportunity.company?.description && (
                <p className="text-sm text-gray-600 mb-4">{currentOpportunity.company.description}</p>
              )}
              {currentOpportunity.company?.website && (
                <a
                  href={currentOpportunity.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm w-full"
                >
                  Visit Website
                </a>
              )}
            </div>

            {/* Contact Info */}
            <div className="card p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-3">
                {currentOpportunity.contactEmail && (
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${currentOpportunity.contactEmail}`} className="text-emerald-600 hover:text-emerald-700">
                      {currentOpportunity.contactEmail}
                    </a>
                  </div>
                )}
                {currentOpportunity.contactPhone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a href={`tel:${currentOpportunity.contactPhone}`} className="text-emerald-600 hover:text-emerald-700">
                      {currentOpportunity.contactPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleApply}
                disabled={isApplying}
                className="btn btn-primary w-full btn-lg"
              >
                {isApplying ? 'Applying...' : 'Apply Now'}
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="btn btn-outline w-full btn-lg"
              >
                {isSaved ? '★ Saved' : '☆ Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
