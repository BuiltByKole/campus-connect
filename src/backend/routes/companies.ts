import express, { Request, Response } from 'express'
import { verifyToken } from '../middleware/auth'

const router = express.Router()

// Get Company Profile
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params

    res.json({
      success: true,
      data: {
        id,
        name: 'Company Name',
        verified: false,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company',
      error: error.message,
    })
  }
})

// Create Company Profile
router.post('/', verifyToken, (req: Request, res: Response) => {
  try {
    const { name, description, industry, email, phone } = req.body

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields',
      })
    }

    res.status(201).json({
      success: true,
      message: 'Company profile created',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        verified: false,
        verificationStatus: 'pending',
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create company',
      error: error.message,
    })
  }
})

export default router
