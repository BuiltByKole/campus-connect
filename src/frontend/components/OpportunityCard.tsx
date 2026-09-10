import { Opportunity, VerificationStatus } from '@/types'
import { format } from 'date-fns'

interface OpportunityCardProps {
  opportunity: Opportunity
  onClick: () => void
}

export default function OpportunityCard({ opportunity, onClick }: OpportunityCardProps) {
  const getVerificationColor = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return 'badge-success'
      case VerificationStatus.PENDING:
        return 'badge-warning'
      case VerificationStatus.REJECTED:
        return 'badge-error'
      default:
        return 'badge-info'
    }
  }

  return (
    <div
      onClick={onClick}
      className="card card-hover p-6 cursor-pointer transition-all duration-200 hover:border-emerald-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{opportunity.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{opportunity.company?.name || 'Company'}</p>
        </div>
        <div className={`badge ${getVerificationColor(opportunity.verificationStatus)}`}>
          {opportunity.verificationStatus.charAt(0).toUpperCase() + opportunity.verificationStatus.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Type</p>
          <p className="font-medium text-gray-900">{opportunity.type.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-medium text-gray-900">{opportunity.city}, {opportunity.state}</p>
        </div>
        <div>
          <p className="text-gray-500">Arrangement</p>
          <p className="font-medium text-gray-900">{opportunity.workArrangement.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="text-gray-500">Field</p>
          <p className="font-medium text-gray-900">{opportunity.field}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Deadline: {format(new Date(opportunity.deadline), 'MMM dd, yyyy')}
        </p>
        <span className="text-emerald-600 font-medium text-sm">View Details →</span>
      </div>
    </div>
  )
}
