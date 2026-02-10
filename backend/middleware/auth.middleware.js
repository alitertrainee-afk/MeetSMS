// libs import
import jwt from 'jsonwebtoken'

// Token verification middleware
export const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token)
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.',
      })
    }

    // Verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Attach user ID to request object for use in controllers
    req.userId = decoded.userId
    next()
  } catch (error) {
    console.error('Token verification error:', error.message)
    
    let message = 'Invalid token'
    if (error.name === 'TokenExpiredError') {
      message = 'Token has expired. Please login again.'
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Invalid or malformed token'
    }

    return res.status(401).json({
      success: false,
      message,
    })
  }
}
