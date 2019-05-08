import React, { PureComponent } from 'react'
import styles from '../../index.less'
import Right1 from './right1'
import Right2 from './right2'

class Left extends PureComponent {
  render() {
    return (
      <div className={styles.mainLeft}>
        <Right1 />
        <Right2 />
      </div>
    )
  }
}

export default Left
