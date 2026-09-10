import { useEffect } from 'react'
import { useSearch, useNavigate } from '@tanstack/react-router'
import { useOpportunityStore } from '../store/opportunityStore'
import OpportunityCard from '../components/OpportunityCard'
import FilterPanel from '../components/FilterPanel'
import { OpportunityType, WorkArrangement } from '@/types'

export default function OpportunitiesPage() {
  const navigate = useNavigate()
  const search = useSearch()
  const {
    opportunities,
    isLoading,
    error,
    filters,
    totalCount,
    currentPage,
    pageSize,
    fetchOpportunities,
    setFilters,
    clearFilters,
    setPage,
    clearError,
  } = useOpportunityStore()

  useEffect(() => {
    fetchOpportunities(filters, 1)
  }, [])

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-lg py-6">
          <h1 className="text-3xl font-bold">Browse Opportunities</h1>
          <p className="text-gray-600 mt-2">Find the perfect opportunity for your career</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-lg py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Opportunities */}
          <div className="lg:col-span-3">
            {error && (
              <div className="alert alert-error mb-6">
                {error}
                <button
                  onClick={clearError}
                  className="ml-4 text-sm underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="spinner mx-auto mb-4 border-4 border-emerald-200 border-t-emerald-600 w-8 h-8"></div>
                  <p className="text-gray-600">Loading opportunities...</p>
                </div>
              </div>
            ) : opportunities.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-600 mb-4">No opportunities found</p>
                <button
                  onClick={() => clearFilters()}
                  className="btn btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 mb-8">
                  {opportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      onClick={() => navigate({ to: `/opportunities/${opportunity.id}` })}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn btn-secondary btn-sm"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setPage(page)}
                        className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="btn btn-secondary btn-sm"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
