import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message } from 'antd'
import { stringify } from 'qs'
import { Page } from 'components'
import { router } from 'utils'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@connect(({ user, loading }) => ({ user, loading }))
class User extends PureComponent {
  render() {
    const { location, dispatch, user, loading } = this.props
    const { query, pathname } = location
    const { list, pagination, currentItem, modalVisible, modalType, selectedRowKeys } = user

    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify({
            ...query,
            ...newQuery
          },{ arrayFormat: 'repeat' }
        )
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      centered: true,
      confirmLoading: loading.effects[`user/${modalType}`],
      title: `${modalType === 'create' ? '创建用户' : '编辑用户'}`,
      onOk(data) {
        dispatch({ type: `user/${modalType}`, payload: data }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({ type: 'user/hideModal' })
      }
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize
        })
      },
      onDeleteItem(id) {
        dispatch({ type: 'user/delete', payload: id }).then(() => {
          handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'update',
            currentItem: item
          }
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'user/updateState',
            payload: { selectedRowKeys: keys }
          })
        }
      }
    }

    const filterProps = {
      filter: {
        ...query
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1
        })
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: { modalType: 'create' }
        })
      },
      onDelete() {
        if (selectedRowKeys.length == 0) {
          message.warning('请先选择要删除的数据！');
          return;
        }
        dispatch({ type: 'user/multiDelete', payload: { ids: selectedRowKeys } }).then(() => {
          handleRefresh({
            page:
              list.length === selectedRowKeys.length && pagination.current > 1
                ? pagination.current - 1
                : pagination.current
          })
        })
      }
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default User
