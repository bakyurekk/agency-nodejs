const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    console.log(req.body);
    res.status(201).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};
