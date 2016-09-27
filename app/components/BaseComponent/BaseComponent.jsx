/**
 * Created by Lightstaff on 2016/09/24.
 */

import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
}
