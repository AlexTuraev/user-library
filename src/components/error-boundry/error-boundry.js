import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';

export default class ErrorBoundry extends Component {

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {

    if (this.state.hasError) {
      console.log('ошибка от ErrorBoundry');
      return <ErrorIndicator />
    }

    return this.props.children;
  }
}