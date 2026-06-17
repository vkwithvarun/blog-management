const express = require('express')
const Article = require('../models/article')
const { requireLogin } = require('../middleware/auth')
const router = express.Router()

router.get('/new', requireLogin, (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', requireLogin, async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    req.flash('error', 'Article not found')
    return res.redirect('/')
  }
  if (!article.author || article.author.toString() !== req.session.user.id) {
    req.flash('error', 'You are not authorized to edit this article')
    return res.redirect('/')
  }
  res.render('articles/edit', { article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (!article) {
    req.flash('error', 'Article not found')
    return res.redirect('/')
  }
  res.render('articles/show', { article })
})

router.post('/', requireLogin, (req, res, next) => {
  req.article = new Article({ author: req.session.user.id })
  next()
}, saveArticle('new'))

router.put('/:id', requireLogin, async (req, res, next) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    req.flash('error', 'Article not found')
    return res.redirect('/')
  }
  if (!article.author || article.author.toString() !== req.session.user.id) {
    req.flash('error', 'You are not authorized to edit this article')
    return res.redirect('/')
  }
  req.article = article
  next()
}, saveArticle('edit'))

router.delete('/:id', requireLogin, async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    req.flash('error', 'Article not found')
    return res.redirect('/')
  }
  if (!article.author || article.author.toString() !== req.session.user.id) {
    req.flash('error', 'You are not authorized to delete this article')
    return res.redirect('/')
  }
  await article.deleteOne()
  req.flash('success', 'Article deleted')
  res.redirect('/')
})

function saveArticle(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    article.tags = req.body.tags
      ? req.body.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    try {
      article = await article.save()
      req.flash('success', `Article ${path === 'new' ? 'created' : 'updated'} successfully`)
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      console.error(e)
      req.flash('error', 'Please check the form for errors')
      res.render(`articles/${path}`, { article })
    }
  }
}

module.exports = router
