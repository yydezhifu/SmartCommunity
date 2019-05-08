import React, { PureComponent } from 'react'
import styles from '../../index.less'

class Left1 extends PureComponent {
  render() {
    return (
      <div>
        <div className={styles.t_line_box}>
          <i className={styles.t_l_line}></i>
          <i className={styles.l_t_line}></i>
        </div>
        <div className={styles.t_line_box}>
          <i className={styles.t_r_line}></i>
          <i className={styles.r_t_line}></i>
        </div>
        <div className={styles.t_line_box}>
          <i className={styles.l_b_line}></i>
          <i className={styles.b_l_line}></i>
        </div>
        <div className={styles.t_line_box}>
          <i className={styles.r_b_line}></i>
          <i className={styles.b_r_line}></i>
        </div>
        <div className={styles.mainTitle}>
          <img src="./t_1.png" />物业收入
        </div>
        <div id="chart_1" className="chart"></div>
      </div>
    )
  }
}

export default Left1
