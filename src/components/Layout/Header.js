import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Popover, Badge, List, Avatar } from 'antd'
import { Ellipsis } from 'ant-design-pro'
import moment from 'moment'
import classnames from 'classnames'
import styles from './Header.less'

const { SubMenu } = Menu

class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }

  render() {
    const {
      fixed,
      collapsed,
      notifications,
      onCollapseChange,
      onAllNotificationsRead,
      onTapBack
    } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu title={<Avatar src="user.jpg" />}>
          <Menu.Item key="SignOut">退出</Menu.Item>
        </SubMenu>
      </Menu>
    ]

    rightContent.unshift(
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        overlayClassName={styles.notificationPopover}
        getPopupContainer={() => document.querySelector('#layoutHeader')}
        content={
          <div className={styles.notification}>
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              locale={{emptyText: '无新消息'}}
              renderItem={item => (
                <List.Item className={styles.notificationItem}>
                  <List.Item.Meta
                    title={<Ellipsis tooltip lines={1}>{item.title}</Ellipsis>}
                    description={moment(item.date).fromNow()}
                  />
                  <Icon style={{fontSize: 10, color: '#ccc'}} type="right" theme="outlined" />
                </List.Item>
              )}
            />
            {
              notifications.length ? (
                <div onClick={onAllNotificationsRead} className={styles.clearButton}>
                  清空消息
                </div>
              ) : null
            }
          </div>
        }
      >
        <Badge count={notifications.length} dot offset={[-10, 10]} className={styles.iconButton}>
          <Icon className={styles.iconFont} type="bell" />
        </Badge>
      </Popover>
    )

    rightContent.unshift(
      <div key={0} onClick={onTapBack}>
        <Badge className={styles.iconButton}>
          <Icon className={styles.iconFont} type="rollback" />
        </Badge>
      </div>
    )

    return (
      <Layout.Header
        className={classnames(styles.header, {[styles.fixed]: fixed, [styles.collapsed]: collapsed})}
        id="layoutHeader"
      >
        <div className={styles.button} onClick={onCollapseChange.bind(this, !collapsed)}>
          <Icon type={classnames({'menu-unfold': collapsed, 'menu-fold': !collapsed})}/>
        </div>
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
  onTapBack: PropTypes.func
}

export default Header
