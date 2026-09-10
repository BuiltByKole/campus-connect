import { create } from 'zustand'
import { Opportunity, OpportunityType, WorkArrangement, VerificationStatus } from '@/types'
import axios from 'axios'

interface OpportunityFilters {
  type?: OpportunityType
  field?: string
  course?: string
  specialization?: string
  location?: string
  state?: string
  workArrangement?: WorkArrangement
  verified?: boolean
  search?: string
}

interface OpportunityState {
  opportunities: Opportunity[]
  currentOpportunity: Opportunity | null
  isLoading: boolean
  error: string | null
  filters: OpportunityFilters
  totalCount: number
  currentPage: number
  pageSize: number

  // Actions
  fetchOpportunities: (filters?: OpportunityFilters, page?: number) => Promise<void>
  fetchOpportunityById: (id: string) => Promise<void>
  setFilters: (filters: OpportunityFilters) => void
  clearFilters: () => void
  setPage: (page: number) => void
  clearError: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useOpportunityStore = create<OpportunityState>((set, get) => ({
  opportunities: [],
  currentOpportunity: null,
  isLoading: false,
  error: null,
  filters: {},
  totalCount: 0,
  currentPage: 1,
  pageSize: 12,

  fetchOpportunities: async (filters?: OpportunityFilters, page?: number) => {
    set({ isLoading: true, error: null })
    try {
      const state = get()
      const currentPage = page || state.currentPage
      const params = new URLSearchParams()

      if (filters?.type) params.append('type', filters.type)
      if (filters?.field) params.append('field', filters.field)
      if (filters?.course) params.append('course', filters.course)
      if (filters?.specialization) params.append('specialization', filters.specialization)
      if (filters?.state) params.append('state', filters.state)
      if (filters?.workArrangement) params.append('workArrangement', filters.workArrangement)
      if (filters?.search) params.append('search', filters.search)
      if (filters?.verified !== undefined) params.append('verified', String(filters.verified))

      params.append('page', String(currentPage))
      params.append('pageSize', String(state.pageSize))

      const response = await axios.get(`${API_URL}/api/opportunities?${params}`)
      const { opportunities, total } = response.data.data

      set({
        opportunities,
        totalCount: total,
        currentPage,
        filters: filters || {},
      })
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch opportunities'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchOpportunityById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${API_URL}/api/opportunities/${id}`)
      const opportunity = response.data.data
      set({ currentOpportunity: opportunity })
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch opportunity'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  setFilters: (filters: OpportunityFilters) => {
    set({ filters, currentPage: 1 })
    get().fetchOpportunities(filters, 1)
  },

  clearFilters: () => {
    set({ filters: {}, currentPage: 1 })
    get().fetchOpportunities({}, 1)
  },

  setPage: (page: number) => {
    const state = get()
    set({ currentPage: page })
    get().fetchOpportunities(state.filters, page)
  },

  clearError: () => set({ error: null }),
}))
