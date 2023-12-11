const express = require('express');
const {
  addArticleHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
} = require('./handler');

const router = express.Router();

router.post('/articles', (req, res) => {
  addArticleHandler(req, res);
});

router.get('/articles', (req, res) => {
  getAllArticlesHandler(req, res);
});

router.get('/articles/:articleId', (req, res) => {
  const { articleId } = req.params;
  getArticleByIdHandler(req, res, articleId);
});

module.exports = router;
