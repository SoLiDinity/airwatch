const { nanoid } = require('nanoid');
const articles_db = require('./articles');

const addArticleHandler = (req, res) => {
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

  articles_db.push(newArticle);

  const isSuccess = articles_db.filter((article) => article.id === id).length > 0
    && hasInvalidFields === false;

  return res.status(isSuccess ? 201 : 500).json({
    status: isSuccess ? 'success' : 'fail',
    message: isSuccess ? 'Artikel berhasil ditambahkan' : 'Artikel gagal ditambahkan',
    data: isSuccess ? { articleId: id } : null,
  });
};

const getAllArticlesHandler = async (req, res) => {
  const articles = await articles_db;
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
