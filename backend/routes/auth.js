const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Mock Google OAuth login (for demo purposes)
// In production, integrate with Google OAuth2
router.post('/login', async (req, res) => {
  try {
    // Mock user data (simulate Google OAuth response)
    const mockUser = {
      id: '123456789', // Google user ID
      name: 'Test User',
      email: 'test@example.com',
      picture: 'https://example.com/photo.jpg',
    };

    // Create JWT token
    const token = jwt.sign(
      {
        userId: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '2h' }
    );

    const profile = {
      name: mockUser.name,
      photoURL: mockUser.picture,
      userId: mockUser.id,
    };

    res.json({
      accessToken: token,
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Logout (client-side token removal, no server action needed)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
