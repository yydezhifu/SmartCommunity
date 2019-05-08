import React, { PureComponent } from 'react'
import styles from '../../index.less'

class Left3 extends PureComponent {
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
          <img src="./t_7.png" />访客记录
        </div>
        <div className={styles.mainTable}>
          <table>
            <thead>
            <tr>
              <th>运营数(辆)</th>
              <th>线路总长度(公里)</th>
              <th>客运总量(万人次)</th>
              <th>日期</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>21059</td>
              <td>26497</td>
              <td>184448</td>
              <td>2018年</td>
            </tr>
            <tr>
              <td>18777</td>
              <td>21140</td>
              <td>188808</td>
              <td>2017年</td>
            </tr>
            <tr>
              <td>15757</td>
              <td>20225</td>
              <td>201143</td>
              <td>2016年</td>
            </tr>
            <tr>
              <td>17458</td>
              <td>19567</td>
              <td>202446</td>
              <td>2015年</td>
            </tr>
            <tr>
              <td>11323</td>
              <td>14562</td>
              <td>279854</td>
              <td>2014年</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Left3




