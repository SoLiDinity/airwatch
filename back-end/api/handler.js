/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const { connectToDatabase } = require('./connection');

const addArticleHandler = async (req, res) => {
  const {
    title, image_url, overview, content,
  } = req.body;

  const id = nanoid(16);

  const apiKey = process.env.API_KEY;
  const { key } = req.query;

  if (key !== `${apiKey}`) {
    return res.status(401).json({
      status: 'fail',
      error: {
        message: 'Unauthorized. Key tidak valid.',
      },
    });
  }

  const validSectionFields = ['title', 'image_url', 'paragraph', 'list'];

  if (!title || !image_url || !overview || !content || !Array.isArray(content.sections)) {
    return res.status(400).json({
      status: 'fail',
      error: {
        message:
          'Request body tidak valid. pastikan semua bagian sudah benar, dan bagian content menyimpan array sections',
      },
    });
  }

  let hasInvalidFields = false;

  content.sections.forEach((section) => {
    const invalidFields = Object.keys(section).filter((field) => !validSectionFields.includes(field));

    if (invalidFields.length > 0) {
      hasInvalidFields = true;
    }

    if (section.list && !Array.isArray(section.list)) {
      hasInvalidFields = true;
    }
  });

  if (hasInvalidFields) {
    return res.status(400).json({
      status: 'fail',
      error: {
        message: 'Terdapat satu atau lebih bagian yang tidak valid pada sections',
      },
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
      error: {
        message: 'Internal server error',
      },
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
        image_url: article.image_url,
        overview: article.overview,
      })),
    },
  });
};

const getArticleByIdHandler = async (req, res, articleId) => {
  const articlesCollection = await connectToDatabase();
  const articles = await articlesCollection.find({}).toArray();

  const foundArticle = articles.find((article) => article.id === articleId);

  if (foundArticle) {
    res.status(200).json({
      status: 'success',
      data: {
        article: {
          id: foundArticle.id,
          title: foundArticle.title,
          image_url: foundArticle.image_url,
          overview: foundArticle.overview,
          content: foundArticle.content,
        },
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      error: {
        message: 'Artikel tidak ditemukan',
      },
    });
  }
};

const deleteArticleByIdHandler = async (req, res, articleId) => {
  const articlesCollection = await connectToDatabase();
  const articles = await articlesCollection.find({}).toArray();

  const apiKey = process.env.API_KEY;
  const { key } = req.query;

  if (key !== `${apiKey}`) {
    return res.status(401).json({
      status: 'fail',
      error: {
        message: 'Unauthorized. Key tidak valid.',
      },
    });
  }

  const foundArticle = articles.find((article) => article.id === articleId);

  if (foundArticle) {
    const result = await articlesCollection.deleteOne({ id: articleId });

    console.log(articleId);

    if (result.deletedCount === 1) {
      return res.status(200).json({
        status: 'success',
        message: 'Artikel berhasil dihapus',
      });
    }
  }

  return res.status(404).json({
    status: 'fail',
    error: {
      message: 'Artikel tidak ditemukan',
    },
  });
};

const updateArticleByIdHandler = async (req, res, articleId) => {
  const {
    title, image_url, overview, content,
  } = req.body;

  const apiKey = process.env.API_KEY;
  const { key } = req.query;

  if (key !== `${apiKey}`) {
    return res.status(401).json({
      status: 'fail',
      error: {
        message: 'Unauthorized. Key tidak valid.',
      },
    });
  }

  const validSectionFields = ['title', 'image_url', 'paragraph', 'list'];

  if (!title || !image_url || !overview || !content || !Array.isArray(content.sections)) {
    return res.status(400).json({
      status: 'fail',
      error: {
        message:
          'Request body tidak valid. pastikan semua bagian sudah benar, dan bagian content menyimpan array sections',
      },
    });
  }

  let hasInvalidFields = false;

  content.sections.forEach((section) => {
    const invalidFields = Object.keys(section).filter((field) => !validSectionFields.includes(field));

    if (invalidFields.length > 0) {
      hasInvalidFields = true;
    }

    if (section.list && !Array.isArray(section.list)) {
      hasInvalidFields = true;
    }
  });

  if (hasInvalidFields) {
    return res.status(400).json({
      status: 'fail',
      error: {
        message: 'Terdapat satu atau lebih bagian yang tidak valid pada sections',
      },
    });
  }

  const updatedArticle = {
    title,
    image_url,
    overview,
    content,
  };

  const articlesCollection = await connectToDatabase();

  try {
    const result = await articlesCollection.updateOne({ id: articleId }, { $set: updatedArticle });

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        status: 'success',
        message: 'Artikel berhasil diperbarui',
      });
    }

    return res.status(404).json({
      status: 'fail',
      error: {
        message: 'Artikel tidak ditemukan',
      },
    });
  } catch (error) {
    console.error('Error updating article in the database:', error);
    return res.status(500).json({
      status: 'fail',
      error: {
        message: 'Internal server error',
      },
      data: null,
    });
  }
};

module.exports = {
  addArticleHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
  deleteArticleByIdHandler,
  updateArticleByIdHandler,
};
