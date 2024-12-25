const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const User = mongoose.model('User', UserSchema);

// Kayıt API'si
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // E-posta kontrolü
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı!' });
  }

   // Şifreyi hashle
   const hashedPassword = await bcrypt.hash(password, 10);
// MongoDB bağlantısı
// Yeni kullanıcıyı veritabanına kaydet
const newUser = new User({
  email,
  password: hashedPassword
});

await newUser.save();

res.status(201).json({ message: 'Kayıt başarılı!' });
});

mongoose.connect('mongodb+srv://vestia:vestia@vestia.wycebzt.mongodb.net/Vestia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
