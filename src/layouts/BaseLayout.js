import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
import { queryLayout } from 'utils'
// import NProgress from 'nprogress'
import config from 'utils/config'
import withRouter from 'umi/withRouter'

import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import './BaseLayout.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout
}

@withRouter
@connect(({ loading }) => ({ loading }))
class BaseLayout extends PureComponent {
  previousPath = ''

  render() {
    const { loading, children, location } = this.props
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]
    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      // NProgress.start()
    }

    if (!loading.global) {
      // NProgress.done()
      this.previousPath = currentPath
    }

    return (
      <>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Container>{children}</Container>
      </>
    )
  }
}

BaseLayout.propTypes = {
  loading: PropTypes.object
}

export default BaseLayout
