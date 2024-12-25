const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Modelin zaten var olup olmadığını kontrol et, yoksa yeni bir tane oluştur
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
