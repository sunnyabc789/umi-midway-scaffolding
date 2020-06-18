import React from 'react'
import Redirect from 'umi/redirect';
import { menus } from '../common/constants'
import _ from 'lodash'

export default function() {
  return (
    <Redirect to={_.get(menus[0], 'link')} />
  );
}
