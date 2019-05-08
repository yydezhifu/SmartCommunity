import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styles from '../../index.less'

@connect(({ hmap }) => ({ hmap }))
class Left2 extends PureComponent {
  handleClick = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'hmap/showModal',
      payload: {
        title: '人员进出记录'
      }
    })
  }

  render() {
    return (
      <div className={styles.numberCard} onClick={this.handleClick}>
        <div>当前园区人数</div>
        <p>123,456,789</p>
      </div>
    )
  }
}

export default Left2
