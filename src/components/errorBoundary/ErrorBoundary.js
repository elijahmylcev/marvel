import propTypes from 'prop-types';
import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ErrorMessage />;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: propTypes.node.isRequired,
};

export default ErrorBoundary;
