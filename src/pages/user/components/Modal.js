import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from 'utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      data.address = data.address.join(' ')
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={'姓名'} hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('name', {
                initialValue: item.name,
                rules: [{ required: true }]
              })(<Input />)
            }
          </FormItem>
          <FormItem label={'昵称'} hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('nickName', {
                initialValue: item.nickName,
                rules: [{ required: true }],
              })(<Input />)
            }
          </FormItem>
          <FormItem label={'性别'} hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('isMale', {
                initialValue: item.isMale,
                rules: [{ required: true,type: 'boolean' }]
              })(
                <Radio.Group>
                  <Radio value>男</Radio>
                  <Radio value={false}>女</Radio>
                </Radio.Group>
              )
            }
          </FormItem>
          <FormItem label={'年龄'} hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('age', {
                initialValue: item.age,
                rules: [{required: true, type: 'number'}],
              })(
                <InputNumber min={18} max={100} />
              )
            }
          </FormItem>
          <FormItem label={'电话'} hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('phone', {
                initialValue: item.phone,
                rules: [{
                  required: true,
                  pattern: /^1[34578]\d{9}$/,
                  message: '无效的电话号码',
                }]
              })(<Input />)
            }
          </FormItem>
          <FormItem label={'邮件'} hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    required: true,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: '无效的电子邮件'
                  }
                ]
              })(<Input />)
            }
          </FormItem>
          <FormItem label={'地址'} hasFeedback {...formItemLayout}>
            {
              getFieldDecorator('address', {
                initialValue: item.address && item.address.split(' '),
                rules: [{ required: true }]
              })(
                <Cascader style={{ width: '100%' }} options={city} placeholder={'请选择地址'}/>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
