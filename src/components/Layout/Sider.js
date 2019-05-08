import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import ScrollBar from '../ScrollBar'
import { config } from 'utils'
import SiderMenu from './Menu'
import styles from './Sider.less'

class Sider extends PureComponent {
  render() {
    const {
      menus,
      theme,
      isMobile,
      collapsed,
      onCollapseChange
    } = this.props

    return (
      <Layout.Sider
        width={256}
        theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={isMobile ? null : onCollapseChange}
        className={styles.sider}
      >
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            { collapsed ? null : <h1>{config.siteName}</h1> }
          </div>
        </div>

        <div className={styles.menuContainer}>
          <ScrollBar option={{ suppressScrollX: true }}>
            <SiderMenu
              menus={menus}
              theme={theme}
              isMobile={isMobile}
              collapsed={collapsed}
              onCollapseChange={onCollapseChange}
            />
          </ScrollBar>
        </div>
      </Layout.Sider>
    )
  }
}

Sider.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onThemeChange: PropTypes.func,
  onCollapseChange: PropTypes.func
}

export default Sider
