const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://vestia:vestia@vestia.wycebzt.mongodb.net/Vestia', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// JSON verilerini alabilmek için middleware
app.use(express.json());

// Kullanıcı modelini oluşturuyoruz
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// User modelini tanımlıyoruz
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

  // Yeni kullanıcıyı veritabanına kaydet
  const newUser = new User({
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.status(201).json({ message: 'Kayıt başarılı!' });
});

// Sunucuyu başlatıyoruz
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
