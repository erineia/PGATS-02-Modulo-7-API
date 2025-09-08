const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo';

function authenticate(req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, SECRET);
    return { userId: payload.userId };
  } catch (err) {
    return null;
  }
}

module.exports = { authenticate };
