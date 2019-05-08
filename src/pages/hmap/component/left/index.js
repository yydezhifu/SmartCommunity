import React, { PureComponent } from 'react'
import styles from '../../index.less'
import Left1 from './left1'
import Left2 from './left2'
import Left3 from './left3'

class Left extends PureComponent {
  render() {
    return (
      <div className={styles.mainLeft}>
        <Left1 />
        <Left2 />
        <Left3 />
      </div>
    )
  }
}

export default Left
