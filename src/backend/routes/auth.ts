import express, { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Mock database - will be replaced with real database
const users: any[] = []

const generateTokens = (userId: string, email: string, role: string) => {
  const accessToken = jwt.sign(
    { id: userId, email, role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  )

  const refreshToken = jwt.sign(
    { id: userId, email, role },
    process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken, expiresIn: 3600 }
}

// Signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body

    // Validation
    if (!email || !password || !name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      })
    }

    // Check if user exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      })
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Create user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword,
      name,
      role,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    users.push(user)

    // Generate tokens
    const { accessToken, refreshToken, expiresIn } = generateTokens(user.id, user.email, user.role)

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified,
        },
        token: {
          accessToken,
          refreshToken,
          expiresIn,
        },
      },
    })
  } catch (error: any) {
    console.error('[SIGNUP ERROR]', error)
    res.status(500).json({
      success: false,
      message: 'Signup failed',
      error: error.message,
    })
  }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required',
      })
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Verify password
    const isValidPassword = await bcryptjs.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Generate tokens
    const { accessToken, refreshToken, expiresIn } = generateTokens(user.id, user.email, user.role)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified,
        },
        token: {
          accessToken,
          refreshToken,
          expiresIn,
        },
      },
    })
  } catch (error: any) {
    console.error('[LOGIN ERROR]', error)
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    })
  }
})

// Refresh Token
router.post('/refresh', (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token required',
      })
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'refresh-secret'
      ) as any

      const { accessToken, refreshToken: newRefreshToken, expiresIn } = generateTokens(
        decoded.id,
        decoded.email,
        decoded.role
      )

      res.json({
        success: true,
        message: 'Token refreshed',
        data: {
          token: {
            accessToken,
            refreshToken: newRefreshToken,
            expiresIn,
          },
        },
      })
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Token refresh failed',
      error: error.message,
    })
  }
})

// Get Current User
router.get('/me', (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    const user = users.find((u) => u.id === decoded.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    })
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message,
    })
  }
})

// Google OAuth Callback (Placeholder)
router.post('/google', async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body

    // Verify Google token (implementation depends on google-auth-library)
    // For now, this is a placeholder

    res.status(501).json({
      success: false,
      message: 'Google authentication not yet configured',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: error.message,
    })
  }
})

// Apple OAuth Callback (Placeholder)
router.post('/apple', async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body

    // Verify Apple token (implementation depends on apple-signin-auth)
    // For now, this is a placeholder

    res.status(501).json({
      success: false,
      message: 'Apple authentication not yet configured',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Apple authentication failed',
      error: error.message,
    })
  }
})

export default router
