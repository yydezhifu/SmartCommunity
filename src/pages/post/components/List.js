import React, { PureComponent } from 'react'
import { Table, Avatar } from 'antd'
import { Ellipsis } from 'ant-design-pro'
import styles from './List.less'

class List extends PureComponent {
  render() {
    const { ...tableProps } = this.props
    const columns = [
      {
        title: '图像',
        dataIndex: 'image',
        render: text => <Avatar shape="square" src={text} />,
      },
      {
        title: '标题',
        dataIndex: 'title',
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: '作者',
        dataIndex: 'author',
      },
      {
        title: '分类',
        dataIndex: 'categories',
      },
      {
        title: '标签',
        dataIndex: 'tags',
      },
      {
        title: '是否可见',
        dataIndex: 'visibility',
      },
      {
        title: '评论',
        dataIndex: 'comments',
      },
      {
        title: '观点',
        dataIndex: 'views',
      },
      {
        title: '发布日期',
        dataIndex: 'date',
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `总共 ${total} 条`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
