const mongoose = require('mongoose')
const { marked } = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const slugify = require('slugify')

const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHTML: {
    type: String,
    required: true
  }
})

articleSchema.pre('validate', function (next) {
  // Append a short id-based suffix so two articles with the same title
  // never collide on slug. Only regenerate when the title changes.
  if (this.title && (this.isNew || this.isModified('title'))) {
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${this._id.toString().slice(-6)}`
  }

  if (this.markdown && this.isModified('markdown')) {
    const html = marked.parse ? marked.parse(this.markdown) : marked(this.markdown)
    this.sanitizedHTML = dompurify.sanitize(html)
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)
