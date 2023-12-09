// TODO 7
import data from '../../data/data.json';
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
    const blogData = data.articles;
    const blogContainerElement = await document.querySelector('.blog-container');

    blogData.forEach((blog) => {
      blogContainerElement.innerHTML += createBlogsListCardTemplate(blog, 30);
    });
  },
};

export default Blogs;
