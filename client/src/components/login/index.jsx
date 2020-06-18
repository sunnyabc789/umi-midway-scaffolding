import React from 'react'
import './login.styl'
import { Form, Input, Button, Alert, Icon, message } from 'antd'
import _ from 'lodash'
import router from 'umi/router'
import Fetch from '../../common/fetch-final'
import { connect } from 'dva'

const FormItem = Form.Item

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      onload: false,
      msg: ''
    }
  }

  componentDidMount() {
    if (this.props.user?.isLogined)  return window.location.pathname = '/console/portal/my-workbench'
  }

  handleSubmit = async () => {
    const { getFieldValue } = this.props.form
    this.setState({ onload: true })
    const userName = getFieldValue('username')
    const userPwd = getFieldValue('password')

    let res = await Fetch.post('/common/login', { username: userName, password: userPwd })

    this.setState({ onload: false })

    if (!res?.success) return message.error(res?.message || '登录失败')

    this.props.dispatch({
      type: 'user/login',
      payload: {
       user: res?.result?.user 
      },
      callback: () => window.location.pathname = '/my-workbench'
    })

    // router.push({
    //   pathname: '/my-workbench'
    // });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div id="universe-wrapper">
        <div id="login-content">
          <div className="login-body">
            <h1 className="aligncenter mg3b">
              <img className="iblock mw200" src="data:image/png;base64,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" alt="数果智能"/>
            </h1>
            <div className="login-panel">
              <div className="login-panel-title pd3x font16">登录到数果智能</div>
              <div className="login-panel-body pd3x pd3y">
                <Form onSubmit={this.handleSubmit}>
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [
                        { required: true, message: '不能为空' }
                      ]
                    })(
                      <Input
                        placeholder="用户名"
                        size="default"
                        addonBefore={<Icon type="user" className="color-white" />}
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator('password', {
                        rules: [
                          { required: true, whitespace: true, message: '请填写密码' }
                        ]
                      })(
                        <Input
                          type="password"
                          size="default"
                          placeholder="密码"
                          addonBefore={<Icon type="key" className="color-white" />}
                          onPressEnter={this.handleSubmit}
                        />
                      )
                    }
                  </FormItem>

                  <div className={this.state.msg ? 'pd1b' : 'hide'}>
                    <Alert message={this.state.msg} type="error" showIcon />
                  </div>

                  <Button onClick={this.handleSubmit} className="btn-login" size="large" type="primary" >
                    {this.state.onload ? '登录中...' : '登录'}
                  </Button>
                  <div className="pd3y font14 fix login-links">
                    {/* <a href="/retrieve-password" className="fright color-grey pointer">找回密码</a> */}
                  </div>
                </Form>
              </div>
            </div>

            <p className="aligncenter login-footer pd3y mg3t color-grey">
              v1.0.1
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ user }) => {
  return {
    user
  }
})(Form.create()(Login))
