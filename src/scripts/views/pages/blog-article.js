import UrlParser from '../../routes/url-parser';
import datas from '../../data/data.json';
import { createBlogArticleTemplate, createBlogsListCardTemplate } from '../templates/template-creator';
import CustomAlert from '../../utils/custom-alert-initiator';
// TODO 7

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
          `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const articleContentElement = document.querySelector('.article-content');
    const otherArticlesContainerElement = document.querySelector('.recommended-articles-container');
    const articleData = datas.articles.find((data) => data.id === url.id);

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
        message: '<i class="fa-solid fa-circle-info" style="margin-right: .35rem;"></i>Tautan telah disalin',
        backgroundColor: '#0094FF',
      });
    };

    articleContentElement.innerHTML += createBlogArticleTemplate(articleData, shareCurrentBlogUrl);

    const copyToClipBoardButtonElement = document.querySelector('#copyToClipboard');
    copyToClipBoardButtonElement.addEventListener('click', (e) => {
      e.preventDefault();

      copyToClipboard();
    });

    const otherArticles = datas.articles.filter((data) => data.id !== url.id);
    otherArticles.slice(0, 4).forEach((article) => {
      otherArticlesContainerElement.innerHTML += createBlogsListCardTemplate(article, 10);
    });
  },
};

export default BlogsArticle;