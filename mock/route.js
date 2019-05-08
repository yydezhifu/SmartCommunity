import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: '控制台',
    route: '/dashboard'
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    icon: 'user',
    name: '用户管理',
    route: '/user'
  },
  {
    id: '7',
    breadcrumbParentId: '1',
    icon: 'form',
    name: '发布管理',
    route: '/post'
  },
  {
    id: '8',
    breadcrumbParentId: '1',
    icon: 'smile',
    name: '测试模块',
    route: '/test'
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: '用户详情',
    route: '/user/:id'
  },
  {
    id: '4',
    breadcrumbParentId: '1',
    name: 'UI组件',
    icon: 'codepen'
  },
  {
    id: '45',
    breadcrumbParentId: '4',
    menuParentId: '4',
    name: '编辑器',
    icon: 'edit',
    route: '/UIElement/editor'
  },
  {
    id: '5',
    breadcrumbParentId: '1',
    name: '图表',
    icon: 'code-o'
  },
  {
    id: '51',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'ECharts',
    icon: 'line-chart',
    route: '/chart/ECharts'
  },
  {
    id: '53',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'Rechartst',
    icon: 'area-chart',
    route: '/chart/Recharts'
  }
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  }
}
