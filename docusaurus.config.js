// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          breadcrumbs: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Andermi',
        logo: {
          alt: 'My Site Logo',
          src: 'img/user.jpg',
        },
        items: [
          {
            type: 'doc',
            docId: 'framework/react',
            position: 'right',
            label: '正文',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '正文',
                to: 'docs/HTML+CSS/css',
              },
            ],
          },
          {
            title: 'Me',
            items: [
              {
                label: 'CSND',
                href: 'https://blog.csdn.net/weixin_44038881?spm=1000.2115.3001.5343',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Adermi',
              },
              {
                label: '掘金',
                href: 'https://juejin.cn/user/2283015947683080',
              },
              {
                label: '100daycss',
                href: 'https://100daycss.xyb.cool',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'React Docs Beta 官网',
                href: 'https://beta.reactjs.org/',
              },
              {
                label: 'NextJs 官网',
                href: 'https://nextjs.org/',
              },
              {
                label: 'Vite 中文官网',
                href: 'https://vitejs.cn/',
              },
              {
                label: 'Lodash 官网',
                href: 'https://lodash.com/',
              },
              {
                label: 'React Router 官网',
                href: 'https://reactrouter.com/docs/en/v6',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Andermi  <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery" target="_blank">浙ICP备2021034657号-1</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
    }),
};

module.exports = config;
