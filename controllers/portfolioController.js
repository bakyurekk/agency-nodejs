const fs = require('fs');
const Category = require('../models/Category');
const Portfolio = require('../models/Portfolio');

exports.getAllPortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({})
      .sort('-createdAt')
      .populate('category');
    const categories = await Category.find({});
    res.status(200).render('index', {
      portfolios,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const image = req.file;
    await Portfolio.create({
      name: name,
      description: description,
      category: category,
      image: image.filename,
    });
    console.log(image);
    res.status(201).redirect('/#portfolio');
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndRemove({
      _id: req.params.id,
    });
    const deletedImage = __dirname + '/../public/assets/img/' + portfolio.image;
    fs.unlink(deletedImage, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).redirect('/#portfolio');
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const image = req.file;

    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    portfolio.name = name;
    portfolio.description = description;
    portfolio.category = category;
    if (image) {
      const deletedImage = __dirname + '/../public/assets/img/' + portfolio.image;
      fs.unlink(deletedImage, (err) => {
        if (err) {
          console.log(err);
        }
      });
      portfolio.image = image.filename;
    }

    portfolio.save();
    console.log(portfolio);
    res.status(200).redirect('/');
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};
