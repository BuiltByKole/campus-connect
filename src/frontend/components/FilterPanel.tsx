import { useState } from 'react'
import { OpportunityType, WorkArrangement } from '@/types'

interface FilterPanelProps {
  filters: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
  onClearFilters: () => void
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true)

  const handleChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Opportunity Type */}
        <div>
          <label className="form-label">Opportunity Type</label>
          <select
            value={filters.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            className="form-input"
          >
            <option value="">All Types</option>
            <option value={OpportunityType.SIWES}>SIWES</option>
            <option value={OpportunityType.INTERNSHIP}>Internship</option>
            <option value={OpportunityType.INDUSTRIAL_TRAINING}>Industrial Training</option>
            <option value={OpportunityType.EXTERNSHIP}>Externship</option>
            <option value={OpportunityType.PLACEMENT}>Placement</option>
          </select>
        </div>

        {/* Work Arrangement */}
        <div>
          <label className="form-label">Work Arrangement</label>
          <select
            value={filters.workArrangement || ''}
            onChange={(e) => handleChange('workArrangement', e.target.value)}
            className="form-input"
          >
            <option value="">All Arrangements</option>
            <option value={WorkArrangement.ON_SITE}>On-Site</option>
            <option value={WorkArrangement.REMOTE}>Remote</option>
            <option value={WorkArrangement.HYBRID}>Hybrid</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="form-label">State</label>
          <input
            type="text"
            placeholder="e.g., Edo"
            value={filters.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="form-input"
          />
        </div>

        {/* Field */}
        <div>
          <label className="form-label">Field</label>
          <input
            type="text"
            placeholder="e.g., Computing"
            value={filters.field || ''}
            onChange={(e) => handleChange('field', e.target.value)}
            className="form-input"
          />
        </div>

        {/* Course */}
        <div>
          <label className="form-label">Course</label>
          <input
            type="text"
            placeholder="e.g., Computer Science"
            value={filters.course || ''}
            onChange={(e) => handleChange('course', e.target.value)}
            className="form-input"
          />
        </div>

        {/* Verification Status */}
        <div>
          <label className="form-label">Verification Status</label>
          <select
            value={filters.verified !== undefined ? String(filters.verified) : ''}
            onChange={(e) =>
              handleChange('verified', e.target.value === '' ? undefined : e.target.value === 'true')
            }
            className="form-input"
          >
            <option value="">All Statuses</option>
            <option value="true">Verified Only</option>
            <option value="false">Unverified</option>
          </select>
        </div>
      </div>
    </div>
  )
}
