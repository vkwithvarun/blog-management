const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/user')

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const existing = await User.findOne({ $or: [{ username }, { email }] })
    if (existing) {
      req.flash('error', 'That username or email is already taken')
      return res.redirect('/signup')
    }
    const user = await User.create({ username, email, password })
    req.session.user = { id: user._id.toString(), username: user.username }
    req.flash('success', `Welcome, ${user.username}!`)
    res.redirect('/')
  } catch (e) {
    console.error(e)
    req.flash('error', 'Could not create your account. Please check your input.')
    res.redirect('/signup')
  }
})

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ $or: [{ username }, { email: username }] })
    if (!user) {
      req.flash('error', 'Invalid username or password')
      return res.redirect('/login')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      req.flash('error', 'Invalid username or password')
      return res.redirect('/login')
    }
    req.session.user = { id: user._id.toString(), username: user.username }
    req.flash('success', `Welcome back, ${user.username}!`)
    res.redirect('/')
  } catch (e) {
    console.error(e)
    req.flash('error', 'Something went wrong logging in')
    res.redirect('/login')
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})

module.exports = router
