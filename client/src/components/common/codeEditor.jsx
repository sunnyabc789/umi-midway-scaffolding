import {Controlled as CodeMirror} from 'react-codemirror2'
import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import _ from 'lodash'


require('codemirror/lib/codemirror.css')
require('codemirror/theme/xq-light.css')
require('codemirror/mode/sql/sql.js')
// require('codemirror/mode/python/python')
// require('codemirror/mode/shell/shell')
// require('codemirror/mode/clike/clike')


export default function CodeEditor({value, onChange = _.noop, defaultValue, className, lang = 'sql', ...rest}) {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: `text/x-${lang === 'shell' ? 'sh' : (lang || 'sql')}`,
        theme: 'xq-light',
        lineNumbers: true,
        lineWrapping: true,
        viewportMargin: Infinity
      }}
      className={`js-code-editor ${className}`}
      css={css({
        '.CodeMirror': {
          fontFamily: 'Arial, monospace',
          fontSize: '16px',
          border: '1px solid #eee',
          height: 'auto'
        },
        '.CodeMirror-selected': {
          background: '#8f8f8f !important'
        }
      })}
      onBeforeChange={(editor, data, nextVal) => {
        onChange(nextVal)
      }}
      // onChange={(editor, data, value) => {}}
      {...rest}
    />
  )
}
