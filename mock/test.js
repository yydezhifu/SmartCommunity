import { Mock, Constant } from './_utils'

const { ApiPrefix } = Constant

const dataSource = Mock.mock({
  'data|100': [
    {
      id: '@guid',
      name: '@cname()',
      email: '@email',
      'age|18-60': 20,
      'phone|1': /^1[0-9]{10}$/,
      address: '@county(true)',
      enter: '@date("yyyy-MM-dd")',
      'sex|1': ["男", "女"],
      'job|1': ["web", "java", "mysql"],
      'education|1': ["博士","研究生","本科","大专及以下"],
      avater() {
        return Mock.Random.image(
          '100x100',
          Mock.Random.color(),
          '#757575',
          'png',
          this.name.substr(0, 1)
        )
      }
    }
  ]
}).data

module.exports = {
  [`GET ${ApiPrefix}/test`](req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1
    let newData = dataSource
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return (
              String(item[key]).trim().indexOf(decodeURI(other[key].trim()) > -1)
            )
          }
          return true
        })
      }
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length
    })
  }
}
