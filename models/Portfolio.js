const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    minlength: 10,
  },
  image: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  slug: {
    type: String,
    unique: true,
  },
});

PortfolioSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;
