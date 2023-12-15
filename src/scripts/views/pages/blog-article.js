import UrlParser from '../../routes/url-parser';
import {
  createBlogArticleTemplate,
  createBlogsListCardTemplate,
  createErrorPage,
} from '../templates/template-creator';
import CustomAlert from '../../utils/custom-alert-initiator';
import DataSource from '../../data/data-source';

const BlogsArticle = {
  async render() {
    return `
      <div class="blog-article">
        <div class="article-content" id="articleContent"></div>
        <aside class="recommended-articles">
          <h3>Artikel Rekomendasi</h3>
          <div class="recommended-articles-container"></div>
        </aside>
      </div>
      <div class="article-page-error"></div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const articleContentElement = document.querySelector('.article-content');
      const otherArticlesContainerElement = document.querySelector(
        '.recommended-articles-container',
      );

      const data = await DataSource.specificBlogsArticlesById(url.id);
      const datas = await DataSource.allBlogsArticles(false);
      const articleData = data.article;

      const currentBlogUrlUri = encodeURIComponent(window.location.href);
      const currentBlogTitleUri = encodeURIComponent(`${articleData.title} | Baca artikelnya di:`);

      const shareCurrentBlogUrl = {
        wa: `https://wa.me/?text=${currentBlogTitleUri}%0A${currentBlogUrlUri}`,
        fb: `https://www.facebook.com/sharer/sharer.php?u=${currentBlogUrlUri}&quote=${currentBlogTitleUri}`,
        tw: `https://twitter.com/intent/tweet?url=${currentBlogUrlUri}&text=${currentBlogTitleUri}`,
      };

      const copyToClipboard = () => {
        const linkToCopy = window.location.href;
        const currentBlogTitleToCopy = `${articleData.title} | Baca artikelnya di:`;
        const textarea = document.createElement('textarea');

        textarea.value = `${currentBlogTitleToCopy} ${linkToCopy}`;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        CustomAlert.init({
          message: '<i class="fa-solid fa-clipboard"></i>Tautan telah disalin',
          backgroundColor: '#0094FF',
        });
      };

      articleContentElement.innerHTML += createBlogArticleTemplate(
        articleData,
        shareCurrentBlogUrl,
      );

      const copyToClipBoardButtonElement = document.querySelector('#copyToClipboard');
      copyToClipBoardButtonElement.addEventListener('click', e => {
        e.preventDefault();
        copyToClipboard();
      });

      const otherArticles = datas.articles.filter(
        otherArticleData => otherArticleData.id !== url.id,
      );
      otherArticles.slice(0, 4).forEach(article => {
        otherArticlesContainerElement.innerHTML += createBlogsListCardTemplate(article, 10);
      });
    } catch (error) {
      const blogArticleContainer = document.querySelector('.blog-article');
      const errorContainer = document.querySelector('.article-page-error');

      blogArticleContainer.innerHTML = '';
      errorContainer.innerHTML += createErrorPage();
    }
  },
};

export default BlogsArticle;
