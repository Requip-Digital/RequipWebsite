/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.requip.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/private/*'],
  changefreq: 'weekly',
  priority: 0.7,
};
