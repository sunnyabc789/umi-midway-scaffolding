import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import elementResizeEvent, { unbind } from 'element-resize-event'

function pxStr2Num(str) {
  return str.substr(0, str.length - 2) * 1
}

export default class SizeProvider extends React.Component {

  static defaultProps = {
    doMeasure: true,
    cleanSizeWhenMeasure: false
  }

  static propTypes = {
    children: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func,
    doMeasure: PropTypes.bool,
    cleanSizeWhenMeasure: PropTypes.bool
  }

  state =  {
    spWidth: null,
    spHeight: null
  }

  mounted = false

  componentDidMount() {
    this.mounted = true

    let rootNode = ReactDOM.findDOMNode(this) // div.height-100
    this.monitorNode = rootNode.parentNode
    elementResizeEvent(this.monitorNode, this.onParentResizeDebounced)

    if (this.props.doMeasure) {
      this.onParentResizeDebounced()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.doMeasure && this.props.doMeasure) {
      this.onParentResizeDebounced()
    }
  }
  
  componentWillUnmount() {
    if (this.monitorNode) {
      unbind(this.monitorNode, this.onParentResizeDebounced)
    }
    this.monitorNode = null
    this.mounted = false
  }

  onParentResize = async () => {
    console.log('Resize')
    if (!this.mounted) {
      return
    }
    let {onSizeChange, cleanSizeWhenMeasure} = this.props
    if (cleanSizeWhenMeasure) {
      await new Promise(resolve => {
        this.setState({spWidth: null, spHeight: null}, resolve)
      })
    }

    let rootNode = ReactDOM.findDOMNode(this)
    if (!rootNode) {
      return
    }
    // 计算父节点的内部大小
    let parentNodeStyle = window.getComputedStyle(rootNode.parentNode)

    let paddingTop = parentNodeStyle.paddingTop
    let paddingBottom = parentNodeStyle.paddingBottom
    let paddingLeft = parentNodeStyle.paddingLeft
    let paddingRight = parentNodeStyle.paddingRight
    let spWidth = rootNode.parentNode.clientWidth - pxStr2Num(paddingLeft) - pxStr2Num(paddingRight)
    let spHeight = rootNode.parentNode.clientHeight - pxStr2Num(paddingTop) - pxStr2Num(paddingBottom)
    console.log(this.state.spWidth,'前面spWidth')
    console.log(spWidth,'现在spWidth')
    if(this.state.spWidth===null|| spWidth !== this.state.spWidth){
      console.log('我改变了state.spWidth')
      this.setState({
        // spWidth: rootNode.parentNode.clientWidth - pxStr2Num(paddingLeft) - pxStr2Num(paddingRight),
        // spHeight: rootNode.parentNode.clientHeight - pxStr2Num(paddingTop) - pxStr2Num(paddingBottom)
        spWidth,
        spHeight,
      }, onSizeChange && (() => onSizeChange(this.state)))
    }
    
  }

  onParentResizeDebounced = _.throttle(this.onParentResize, 500, {leading: false})

  render() {
    let {children} = this.props
    if (!this.mounted) {
      return <div className="height-100" >{'\u00a0'}</div>
    }

    return children(this.state)
  }
}

export const withSizeProviderDec = (mapPropsToSizeProviderProps = _.constant({})) => ComposedComponent => props => {
  return (
    <SizeProvider {...mapPropsToSizeProviderProps(props)}>
      {({spWidth, spHeight}) => {
        return (
          <ComposedComponent
            {...props}
            spWidth={spWidth}
            spHeight={spHeight}
          />
        )
      }}
    </SizeProvider>
  )
}

export const withSizeProvider = (ComposedComponent) => props => {
  return withSizeProviderDec()(ComposedComponent)(props)
}
