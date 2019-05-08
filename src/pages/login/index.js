import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Icon } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import config from 'utils/config'
import styles from './index.less'

@connect(({ loading }) => ({ loading }))

@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) { return }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const { loading, form } = this.props
    const { getFieldDecorator } = form

    return (
      <>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <form>
            <Form.Item hasFeedback>
              {
                getFieldDecorator('username', { rules: [{required: true, message: '用户名为必填项'}] })(
                  <Input onPressEnter={this.handleOk} placeholder={'用户名'} prefix={<Icon type="user"></Icon>} />
                )
              }
            </Form.Item>
            <Form.Item hasFeedback>
              {
                getFieldDecorator('password', { rules: [{ required: true, message: '密码为必填项'}] })(
                  <Input type="password" onPressEnter={this.handleOk} placeholder={'密码'} prefix={<Icon type="lock"></Icon>} />
                )
              }
            </Form.Item>
            <Row>
              <Button type="primary" onClick={this.handleOk} loading={loading.effects.login}>登录</Button>
            </Row>
          </form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter copyright={config.copyright} />
        </div>
      </>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default Login
