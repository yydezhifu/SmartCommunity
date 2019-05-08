import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import  moment  from 'moment'
import 'moment/locale/zh-cn'
import styles from '../../index.less'

@connect(({ hmap }) => ({ hmap }))

class Top extends Component {
  constructor() {
    super()
    this.state = {
      time: moment().format('HH:mm:ss').substring(10),
      date: moment().format('YYYY MM DD'),
      week: moment().format('dddd'),
      timer: null
    }
  }

  componentDidMount() {
    this.state.timer = setInterval(() => {
      this.setState({
        time: moment().format('YYYY-MM-DD HH:mm:ss').substring(10)
      })
    }, 1000)
  }

  render() {
    const { dispatch } = this.props
    const handleToMain = () => {
      dispatch({ type: 'hmap/switch' })
    }
    return (
      <div className={styles.head}>
        <div className={styles.navTool}></div>
        <div className={styles.boxCenter}>
          <div className={styles.centerTop}>
            <h1 onClick={handleToMain}>智慧园区管理中心</h1>
          </div>
        </div>
        <div className={styles.weatherBox}>
          <div>
            <p>{this.state.time}</p>
          </div>
          <div>
            <p>{this.state.week}</p>
            <p>{this.state.date}</p>
          </div>
          <img src="./weather_img01.png"/>
          <div>
            <p>多云</p>
            <p>16-22℃</p>
          </div>
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    if(this.state.timer!= null) {
      clearInterval(this.state.timer)
    }
  }

}

export default Top
