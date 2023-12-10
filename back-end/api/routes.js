const express = require('express');
const {
  addArticleHandler,
  getAllArticlesHandler,
} = require('./handler');

const router = express.Router();

router.post('/articles', (req, res) => {
  addArticleHandler(req, res);
});

router.get('/articles', (req, res) => {
  getAllArticlesHandler(req, res);
});

module.exports = router;
