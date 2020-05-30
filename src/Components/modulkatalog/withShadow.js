import React from 'react';

const withShadow = (Component, { init = 1, hovered = 3 }) => {
  return class extends React.Component {
    state = {
      shadow: init
    };

    onMouseOver = () => this.setState({ shadow: hovered });

    onMouseOut = () => this.setState({ shadow: init });

    render() {
      return (
        <Component
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          zdepth={this.state.shadow}
          {...this.props}
        />
      );
    }
  };
};

export default withShadow;