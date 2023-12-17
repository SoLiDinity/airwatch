Feature('Displaying Buffering, AQI Map, and Blog Page');

Scenario('Displaying Buffering/Loader while the page is loading content', ({ I }) => {
  const pages = ['/', '/maps', '/about', '/blog', '/blog/BQp4hMNbhpYgrNph/'];

  pages.forEach(page => {
    I.amOnPage(`/#${page}`);
    I.waitForElement('load-spinner');
    I.seeElement('load-spinner');
    
    I.wait(3);
    I.dontSee('load-spinner');
  });
});

Scenario('Showing AQI on Map and Displaying detail page button on AQi map popup', ({ I }) => {
    I.amOnPage('/#/maps');

    I.waitForElement('#map');
    I.seeElement('#map');

    I.waitForElement('#indexOnMapContainer', 10);
    I.seeElement('#indexOnMapContainer');

    const firstIndexOnMap = locate('#indexOnMapContainer.moderate').first();

    I.click(firstIndexOnMap);

    I.wait('.to-detail-page');
    I.seeElement('.to-detail-page');
    I.click('.to-detail-page');

    I.waitForElement('.detail-content');
    I.seeElement('.detail-content');
});

Scenario('Showing Blog Articles list and Displaying go to article button', ({ I }) => {
    I.amOnPage('/#/blog');

    I.wait(3);
    I.seeElement('.blog-card');

    const firstBlogArticle = locate('.blog-card a').first();

    I.click(firstBlogArticle);

    I.waitForElement('.blog-article', 3);
    I.seeElement('.blog-article');
});