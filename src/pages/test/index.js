import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { stringify } from 'qs'
import { Avatar, Table, Tag } from 'antd'
import { Page } from 'components'
import { router } from 'utils'
import styles from './index.less'

@connect(({ test, loading }) => ({ test, loading }))
class Test extends PureComponent {
  render() {
    const { dispatch, location, test, loading } = this.props
    const { text, list, pagination } = test
    const { pathname, query } = location


    const columns = [{
      title: '头像',
      dataIndex: 'avater',
      render: (text) => <Avatar shape="square" src={text} />
    }, {
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '年龄',
      dataIndex: 'age'
    }, {
      title: '性别',
      dataIndex: 'sex'
    }, {
      title: '联系电话',
      dataIndex: 'phone'
    }, {
      title: '工作',
      dataIndex: 'job',
      render: text => <Tag>{text}</Tag>
    }, {
      title: '学历',
      dataIndex: 'education'
    }, {
      title: '邮箱',
      dataIndex: 'email'
    }, {
      title: '地址',
      dataIndex: 'address'
    }, {
      title: '入职时间',
      dataIndex: 'enter'
    }]

    return (
      <Page inner>
        <Table
          dataSource={list}
          loading={loading.effects['post/query']}
          pagination={{
            ...pagination,
            showTotal: total => `总共 ${total} 条`,
          }}
          bordered
          scroll={{ x: 1200 }}
          className={styles.table}
          columns={columns}
          simple
          rowKey={record => record.id}
          onChange ={(page) => {
            router.push({
              pathname,
              search: stringify({
                ...query,
                page: page.current,
                pageSize: page.pageSize
              })
            })}
          }
        />
      </Page>
    )
  }
}

export default Test
