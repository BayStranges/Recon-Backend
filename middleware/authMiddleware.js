const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Authorization header'ından token'ı alıyoruz
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    // Token'ı doğruluyoruz
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;  // Kullanıcı bilgisini request objesine ekliyoruz
    next();  // İleriye geçmesini sağlıyoruz
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
