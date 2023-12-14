import DataSource from '../../data/data-source';
import { createBlogsListCardTemplate, createErrorPage } from '../templates/template-creator';

const Blogs = {
  async render() {
    return `
        <div class="blog-list-container" style="margin: 1rem;">
          <div class="blog-container"></div>
        </div>
      `;
  },

  async afterRender() {
    try {
      const data = await DataSource.allBlogsArticles();
      const blogArticlesData = data.articles;

      const blogContainerElement = document.querySelector('.blog-container');

      blogArticlesData.forEach(blog => {
        blogContainerElement.innerHTML += createBlogsListCardTemplate(blog, 30);
      });

      const blogCards = document.querySelectorAll('.blog-card');
      blogCards.forEach(blogCard => {
        blogCard.setAttribute('data-aos', 'fade-up');
      });
    } catch (error) {
      const blogContainerElement = document.querySelector('.blog-container');

      blogContainerElement.innerHTML = createErrorPage();
    }
  },
};

export default Blogs;
