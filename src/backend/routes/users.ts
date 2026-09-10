import express, { Request, Response } from 'express'
import { verifyToken } from '../middleware/auth'

const router = express.Router()

// Get User Profile
router.get('/profile', verifyToken, (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: {
        id: (req as any).user.id,
        email: (req as any).user.email,
        role: (req as any).user.role,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message,
    })
  }
})

// Update User Profile
router.put('/profile', verifyToken, (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: 'Profile updated',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    })
  }
})

export default router
