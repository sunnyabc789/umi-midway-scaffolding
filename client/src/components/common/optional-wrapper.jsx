import React, {useEffect, useState} from 'react'
import {Radio} from 'antd'
import _ from 'lodash'

export default function OptionalWrapper(props) {
  const {defaultValue, value, onChange, ctrlComponent: CtrlComponent, initialValue, disabled, disabledText = '禁用', enabledText = '启用', ...rest} = props
  const [pendingValue, setPendingValue] = useState(() => (value || defaultValue))

  useEffect(() => {
    if (value && !_.isEqual(value, pendingValue)) {
      setPendingValue(value)
    }
  }, [value])

  return (
    <React.Fragment>
      <Radio.Group
        onChange={e => {
          let {value: radioVal} = e.target
          let next = +radioVal === 1 ? null : initialValue
          setPendingValue(next)
          onChange(next)
        }}
        value={_.isNil(pendingValue) ? '1' : '2'}
        disabled={disabled}
      >
        <Radio value="1">{disabledText}</Radio>
        <Radio value="2">{enabledText}</Radio>
      </Radio.Group>
      {_.isNil(pendingValue) ? null : (
        <CtrlComponent
          value={pendingValue}
          onChange={next => {
            setPendingValue(next)
            onChange(next)
          }}
          disabled={disabled}
          {...rest}
        />
      )}
    </React.Fragment>
  )
}
