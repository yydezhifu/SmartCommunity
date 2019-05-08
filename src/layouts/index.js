import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import BaseLayout from './BaseLayout'

@withRouter
class Layout extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
          <BaseLayout>{this.props.children}</BaseLayout>
      </LocaleProvider>
    )
  }
}

export default Layout
