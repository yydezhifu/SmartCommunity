module.exports = {
  siteName: '智慧社区管理中心',
  copyright: 'Copyright © 2019 zhihuishequ.com 武汉合纵创联信息科技有限公司产品',
  logoPath: '/favicon.png',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/login/, /map/]
    }
  ]
}
