const express = require('express');
const app = express();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const multer = require('multer');
const path = require('path');

const portfolioRoute = require('./routes/portfolioRoute');
const categoryRoute = require('./routes/categoryRoute');
const { connect } = require('./routes/portfolioRoute');

mongoose
  .connect('mongodb://localhost/agency-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected successfuly');
  })
  .catch((err) => {
    console.log(err);
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// Midelewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: storage }).single('image'));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Router
app.use(portfolioRoute);
app.use(categoryRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});