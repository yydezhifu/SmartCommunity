import React, { PureComponent } from 'react'
import styles from './index.less'

import Left from './component/left'
import Right from './component/right'
import Top from './component/top'
import Content from './component/content'
import CustomModal from './component/modal'

class Hmap extends PureComponent {

  handleInitMap = () => {
    new window.AMap.Map('chart', {
      mapStyle: "amap://styles/blue",
      resizeEnable: false,
      rotateEnable: false,
      zoomEnable: false,
      zoom: 18,
      pitch: 75,
      rotation: -15,
      viewMode: '3D',
      buildingAnimation: false,
      center: [ 114.411573, 30.460554 ]
    })
  }

  componentWillMount() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://webapi.amap.com/maps?v=1.4.6&key=216bac63f1c71548281029cb3234b873';
    script.onload = this.handleInitMap
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className={styles.main}>
        <Top />
        <div className={styles.dataContent}>
          <div className={styles.dataMain} id="chart">
            <Left />
            <Content />
            <Right />
          </div>
        </div>
        <CustomModal>
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
        </CustomModal>
      </div>
    )
  }
}

export default Hmap
