import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import Link from 'umi/navlink'
import withRouter from 'umi/withRouter'
import { pathMatchRegexp, queryAncestors } from 'utils'
import styles from './Bread.less'

@withRouter
class Bread extends PureComponent {
  generateBreadcrumbs = paths => {
    return paths.map((item, key) => {
      return (
        <Breadcrumb.Item key={key}>
          {
            paths.length - 1 !== key
              ? <Link to={item.route || '#'}>{item.name}</Link>
              : item.name
          }
        </Breadcrumb.Item>
      )
    })
  }
  render() {
    const { routeList, location } = this.props
    const currentRoute = routeList.find(_ => _.route && pathMatchRegexp(_.route, location.pathname))
    const paths = currentRoute
      ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
      : [routeList[0], { id: 404, name: '未发现页面' }]

    return (
      <Breadcrumb className={styles.bread} separator=">">
        {this.generateBreadcrumbs(paths)}
      </Breadcrumb>
    )
  }
}

Bread.propTypes = {
  routeList: PropTypes.array
}

export default Bread
