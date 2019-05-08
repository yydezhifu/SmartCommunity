import React, { PureComponent } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import styles from  './index.less'


@connect(({ hmap }) => ({ hmap }))

class CustomModal extends PureComponent {

  handleClose = () => {
    const { dispatch } = this.props
    dispatch({ type: 'hmap/hideModal' })
  }

  render() {
    const { children, hmap } = this.props
    const { title, visible } = hmap

    return (
      <>
        {
          visible ? (
            <div className={styles.modal}>
              <div className={styles.content}>
                <span className={styles.close} onClick={this.handleClose}></span>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.modalDataBox}>
                  { children }
                </div>
              </div>
            </div>
          ) : null
        }
      </>
    )
  }
}

CustomModal.propTypes = {//参数类型及是否必传
  children: PropTypes.node //自定义内容
};

export default CustomModal
