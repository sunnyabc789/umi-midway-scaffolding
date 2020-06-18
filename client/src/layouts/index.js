import React from 'react'
import { Breadcrumb, ConfigProvider, Layout, Menu } from 'antd'
// import zhCN from 'antd/es/locale/zh_CN';
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Link from 'umi/link'
import _ from 'lodash'
import {menus} from '../common/constants'
import {getBreadcrumbs} from 'react-router-breadcrumbs-hoc'
import NavLink from 'umi/navlink'

function inIframe () {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

const { SubMenu, Item: MenuItem } = Menu
const { Header, Content, Sider } = Layout
const conf = window.config || {}

const renderMenu = (menus = []) => {
  console.log(menus,'menus===')
  return menus.map((m, mi) => {
    if (m.children) {
      return (
        <Menu.SubMenu
          key={`${mi}`}
          title={(
            <React.Fragment>
            </React.Fragment>
          )}
        >
          {renderMenu(m.children)}
        </Menu.SubMenu>
      )
    }
    return (
      <MenuItem key={`${mi}`}>
        <Link to={m.link}>{m.title}</Link>
      </MenuItem>
    )
  })
}


export default class BasicLayout extends React.Component {

  componentDidMount() {
    window.historyPush = url => {
      let {history} = this.props
      history.push(url)
    }
  }

  render() {
    let {children, route, location} = this.props
    let {routes} = route

    let pathNameRemoveId = _.get((location.pathname || '').match(/^\/[^/]+/), [0]) || location.pathname

    let breadcrumbs = getBreadcrumbs({routes, location})
    let isInIframe = inIframe()
    let isPowerByQiankun = window.__POWERED_BY_QIANKUN__
    const mainContent = (
      <Layout style={{ background: '#e4eaef', height: '100%' }}>
        <Breadcrumb
          style={{
            padding: '16px 24px',
            background: '#fff'
          }}
        >
          {breadcrumbs.map((breadcrumb, index) => {
            // 这里的 title 在该页面的顶部注释里设置
            return (
              <Breadcrumb.Item key={breadcrumb.key}>
                <NavLink to={breadcrumb.match.url}>{breadcrumb._title}</NavLink>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
        <Content
          className="main-content-wrapper"
          style={{
            height: 'calc(100% - 21px - 32px)',
            padding: '12px 24px 24px',
            overflowY: 'auto'
          }}
        >
          { children }
        </Content>
      </Layout>
    )
    if (isPowerByQiankun) {
      return (
        <ConfigProvider locale={{...zhCN}}>
          {mainContent}
        </ConfigProvider>
      )
    }
    return (
      <ConfigProvider locale={{...zhCN}}>
        <Layout style={{height: '100%'}}>
          {isInIframe ? null : (
            <Header style={{height: 48, lineHeight: '48px'}}>
              <div className="logo"/>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
              >
                <Menu.Item key="1">博物馆音频系统</Menu.Item>
              </Menu>
            </Header>
          )}
          <Layout style={{height: isInIframe ? '100%' : 'calc(100% - 48px)'}}>
            <Sider
              width={200}
              style={{
                background: '#fff',
                overflowX: 'hidden',
                overflowY: 'auto'
              }}
              className={'hide-scroll-bar-y'}
            >
              <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[pathNameRemoveId || _.get(menus[0], 'link')]}
                // defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
                defaultOpenKeys={['2']}
              >
                {renderMenu(menus)}
              </Menu>
            </Sider>
            {mainContent}
          </Layout>
        </Layout>
      </ConfigProvider>
    )
  }
}
