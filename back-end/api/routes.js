const express = require('express');
const {
  addArticleHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
  deleteArticleByIdHandler,
  updateArticleByIdHandler,
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

router.delete('/articles/:articleId', (req, res) => {
  const { articleId } = req.params;
  deleteArticleByIdHandler(req, res, articleId);
});

router.put('/articles/:articleId', (req, res) => {
  const { articleId } = req.params;
  updateArticleByIdHandler(req, res, articleId);
});

module.exports = router;
