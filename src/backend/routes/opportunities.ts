import express, { Request, Response } from 'express'
import { verifyToken } from '../middleware/auth'

const router = express.Router()

// Mock database
const opportunities: any[] = []

// Get All Opportunities
router.get('/', (req: Request, res: Response) => {
  try {
    const {
      type,
      field,
      course,
      specialization,
      state,
      workArrangement,
      verified,
      search,
      page = 1,
      pageSize = 12,
    } = req.query

    let filtered = [...opportunities]

    // Apply filters
    if (type) filtered = filtered.filter((o) => o.type === type)
    if (field) filtered = filtered.filter((o) => o.field === field)
    if (course) filtered = filtered.filter((o) => o.course === course)
    if (specialization) filtered = filtered.filter((o) => o.specialization === specialization)
    if (state) filtered = filtered.filter((o) => o.state === state)
    if (workArrangement) filtered = filtered.filter((o) => o.workArrangement === workArrangement)
    if (verified !== undefined) filtered = filtered.filter((o) => o.verified === (verified === 'true'))
    if (search) {
      filtered = filtered.filter(
        (o) =>
          o.title.toLowerCase().includes(String(search).toLowerCase()) ||
          o.description.toLowerCase().includes(String(search).toLowerCase())
      )
    }

    // Pagination
    const pageNum = Math.max(1, Number(page))
    const size = Math.min(100, Math.max(1, Number(pageSize)))
    const start = (pageNum - 1) * size
    const paginated = filtered.slice(start, start + size)

    res.json({
      success: true,
      data: {
        opportunities: paginated,
        total: filtered.length,
        page: pageNum,
        pageSize: size,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch opportunities',
      error: error.message,
    })
  }
})

// Get Opportunity by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const opportunity = opportunities.find((o) => o.id === id)

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found',
      })
    }

    res.json({
      success: true,
      data: opportunity,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch opportunity',
      error: error.message,
    })
  }
})

// Create Opportunity (Company Only)
router.post('/', verifyToken, (req: Request, res: Response) => {
  try {
    const { title, description, type, field, course, specialization, requirements, location, city, state, country, workArrangement, deadline, cvRequired } = req.body

    if (!title || !description || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields',
      })
    }

    const opportunity = {
      id: Math.random().toString(36).substr(2, 9),
      companyId: (req as any).user.id,
      title,
      description,
      type,
      field,
      course,
      specialization,
      requirements,
      location,
      city,
      state,
      country,
      workArrangement,
      deadline,
      cvRequired: cvRequired || false,
      verified: false,
      verificationStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    opportunities.push(opportunity)

    res.status(201).json({
      success: true,
      message: 'Opportunity created successfully',
      data: opportunity,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create opportunity',
      error: error.message,
    })
  }
})

export default router
