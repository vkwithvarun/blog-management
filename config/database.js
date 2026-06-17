const mongoose = require('mongoose')

module.exports = function connectDB() {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('MongoDB connection error:', err.message)
      process.exit(1)
    })
}
