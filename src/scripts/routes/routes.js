import About from '../views/pages/about';
import BlogsArticle from '../views/pages/blog-article';
import Blogs from '../views/pages/blogs';
import Detail from '../views/pages/details';
import Main from '../views/pages/main';
import Maps from '../views/pages/maps';

const routes = {
  '/': Main,
  '/main': Main,
  '/about': About,
  '/maps': Maps,
  '/blog': Blogs,
  '/detail/:id': Detail,
  '/blog/:id': BlogsArticle,
};

export default routes;
