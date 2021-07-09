const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/', portfolioController.getAllPortfolio);
router.post('/create-portfolio', portfolioController.createPortfolio);
router.delete('/delete-portfolio/:id', portfolioController.deletePortfolio);
router.put('/portfolios/:id', portfolioController.updatePortfolio);

module.exports = router;
