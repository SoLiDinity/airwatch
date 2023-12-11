/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const { connectToDatabase } = require('./connection');

const addArticleHandler = async (req, res) => {
  const {
    title,
    image_url,
    overview,
    content,
  } = req.body;

  const id = nanoid(16);

  const validSectionFields = ['title', 'image_url', 'paragraph', 'list'];

  if (!title || !image_url || !overview || !content || !Array.isArray(content.sections)) {
    return res.status(400).json({
      error: 'Invalid request body. Ensure all fields are provided, and content should contain an array of sections.',
    });
  }

  let hasInvalidFields = false;

  content.sections.forEach((section) => {
    const invalidFields = Object.keys(section)
      .filter((field) => !validSectionFields.includes(field));

    if (invalidFields.length > 0) {
      hasInvalidFields = true;
    }

    if (section.list && !Array.isArray(section.list)) {
      hasInvalidFields = true;
    }
  });

  if (hasInvalidFields) {
    return res.status(400).json({
      error: 'Invalid field(s) in one or more sections.',
    });
  }

  const newArticle = {
    id,
    title,
    image_url,
    overview,
    content,
  };

  const articlesCollection = await connectToDatabase();

  try {
    const result = await articlesCollection.insertOne(newArticle);

    const isSuccess = result.acknowledged && result.insertedId;

    return res.status(isSuccess ? 201 : 500).json({
      status: isSuccess ? 'success' : 'fail',
      message: isSuccess ? 'Artikel berhasil ditambahkan' : 'Artikel gagal ditambahkan',
      data: isSuccess ? { articleId: id } : null,
    });
  } catch (error) {
    console.error('Error adding article to the database:', error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
      data: null,
    });
  }
};

const getAllArticlesHandler = async (req, res) => {
  const articlesCollection = await connectToDatabase();
  const articles = await articlesCollection.find({}).toArray();

  res.json({
    status: 'success',
    data: {
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        overview: article.overview,
      })),
    },
  });
};

module.exports = {
  addArticleHandler,
  getAllArticlesHandler,
};
