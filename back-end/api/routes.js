const express = require('express');
const { swaggerUi, specs } = require('./swagger');
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

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs));

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Add a new article
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewArticle'
 *     responses:
 *       201:
 *         description: Article added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleId'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all articles
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticlesList'
 *
 * /articles/{articleId}:
 *   get:
 *     summary: Get an article by ID
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: ID of the article
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewArticle:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         image_url:
 *           type: string
 *         overview:
 *           type: string
 *         content:
 *           type: object
 *           properties:
 *             sections:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewSection'
 *
 *     NewSection:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         image_url:
 *           type: string
 *         paragraph:
 *           type: string
 *         list:
 *           type: array
 *           items:
 *             type: string
 *
 *     ArticleId:
 *       type: object
 *       properties:
 *         articleId:
 *           type: string
 *
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         image_url:
 *           type: string
 *         overview:
 *           type: string
 *         content:
 *           $ref: '#/components/schemas/ArticleContent'
 *
 *     ArticleContent:
 *       type: object
 *       properties:
 *         sections:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Section'
 *
 *     Section:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         image_url:
 *           type: string
 *         paragraph:
 *           type: string
 *         list:
 *           type: array
 *           items:
 *             type: string
 *
 *     ArticlesList:
 *       type: object
 *       properties:
 *         articles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Article'
 */

module.exports = router;
