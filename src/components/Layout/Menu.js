import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import Navlink from 'umi/navlink'
import withRouter from 'umi/withRouter'
import { arrayToTree, queryAncestors, pathMatchRegexp } from 'utils'
import store from 'store'

const { SubMenu } = Menu

@withRouter
class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || []
  }

  onOpenChange = openKeys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id) // 一级菜单id
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }
    this.setState({ openKeys: newOpenKeys })
    store.set('openKeys', newOpenKeys)
  }

  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.id} title={
              <Fragment>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </Fragment>
          }>
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Navlink to={item.route || '#'}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Navlink>
        </Menu.Item>
      )
    })
  }

  render() {
    const {
      collapsed,
      theme,
      menus,
      location,
      isMobile,
      onCollapseChange
    } = this.props

    const menuTree = arrayToTree(menus, 'id', 'menuParentId')
    const currentMenu = menus.find(_ => _.route && pathMatchRegexp(_.route, location.pathname))
    const selectedKeys = currentMenu ? queryAncestors(menus, currentMenu, 'menuParentId').map(_ => _.id) : []
    const menuProps = collapsed ? {} : { openKeys: this.state.openKeys }

    return (
      <Menu
        mode="inline"
        theme={theme}
        onOpenChange={this.onOpenChange}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        onClick={isMobile ? () => { onCollapseChange(true) } : undefined}
        {...menuProps}
      >
        {this.generateMenus(menuTree)}
      </Menu>
    )
  }
}

SiderMenu.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onCollapseChange: PropTypes.func
}

export default SiderMenu
