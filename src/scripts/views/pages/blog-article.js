import UrlParser from '../../routes/url-parser';
import datas from '../../data/data.json';
import { createBlogArticleTemplate } from '../templates/template-creator';

// TODO 7

const BlogsArticle = {
  async render() {
    return `
        <div class="article-content" id="articleContent" style="margin: 1rem;"></div>
          `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const articleContentElement = document.querySelector('.article-content');
    const articleData = datas.articles.find((data) => data.id === url.id);

    const currentBlogUrlUri = encodeURIComponent(window.location.href);
    const currentBlogTitleUri = encodeURIComponent(articleData.title);
    console.log(currentBlogUrlUri);
    console.log(currentBlogTitleUri);

    const shareCurrentBlogUrl = {
      wa: `https://wa.me/?text=${currentBlogTitleUri}%0A${currentBlogUrlUri}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${currentBlogUrlUri}&quote=${currentBlogTitleUri}`,
      tw: `https://twitter.com/intent/tweet?url=${currentBlogUrlUri}&text=${currentBlogTitleUri}`,
    };

    const copyToClipboard = () => {
      const linkToCopy = window.location.href;
      const textarea = document.createElement('textarea');
      textarea.value = linkToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      // eslint-disable-next-line no-alert
      alert('Tautan telah disalin ke Clipboard');
    };

    articleContentElement.innerHTML += createBlogArticleTemplate(articleData, shareCurrentBlogUrl);

    const copyToClipBoardButtonElement = document.querySelector('#copyToClipboard');
    copyToClipBoardButtonElement.addEventListener('click', (e) => {
      e.preventDefault();

      copyToClipboard();
    });
  },
};

export default BlogsArticle;
