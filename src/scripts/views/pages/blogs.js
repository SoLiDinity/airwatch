// TODO 7
import data from '../../data/data.json';

const Blogs = {
  async render() {
    return `
        <div class="blog-list-container" style="margin: 1rem;">
          <h1>Ini adalah Blog Page</h1>
          <div class="blog-container" style="display: flex; flex-direction: column; gap: 1rem;"></div>
        </div>
          `;
  },

  async afterRender() {
    const blogData = data.articles;
    console.log(blogData);

    const blogContainerElement = await document.querySelector('.blog-container');

    blogData.forEach((blog) => {
      const blogLink = `
      <div class="blog-card" style="width: 100%; display: flex; align-items: center;">
        <img src="${blog.image_url}" style="max-width: 100px; aspect-ratio: 1/1; object-fit: cover;">
        <a href="#/blog/${blog.id}">${blog.title}</a>
      </div>
      `;

      blogContainerElement.innerHTML += blogLink;
    });
  },
};

export default Blogs;
