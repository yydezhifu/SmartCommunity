import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定删此条数据吗？',
        onOk() { onDeleteItem(record.id) }
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props
    const columns = [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        width: 72,
        render: text => <Avatar src={text} />
      },
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '性别',
        dataIndex: 'isMale',
        key: 'isMale',
        render: text => <span>{text ? 'Male' : 'Female'}</span>
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '邮件',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: '编辑' },
                { key: '2', name: '删除' }
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `总共 ${total} 条`
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object
}

export default List
