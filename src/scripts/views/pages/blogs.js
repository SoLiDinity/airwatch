import DataSource from '../../data/data-source';
import { createBlogsListCardTemplate } from '../templates/template-creator';

const Blogs = {
  async render() {
    return `
        <div class="blog-list-container" style="margin: 1rem;">
          <div class="blog-container"></div>
        </div>
          `;
  },

  async afterRender() {
    const data = await DataSource.allBlogsArticles();
    const blogArticlesData = data.articles;

    console.log(blogArticlesData);

    const blogContainerElement = document.querySelector('.blog-container');

    blogArticlesData.forEach(blog => {
      blogContainerElement.innerHTML += createBlogsListCardTemplate(blog, 30);
    });
  },
};

export default Blogs;
