const jwt = require('jsonwebtoken');

const verifyAdmin=(req, res, next)=> {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.PVT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    if (decoded.role !== "3257") {
      return res.status(403).json({ message: 'Admins only' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyAdmin;