import * as React from "react";

export class NoSSR extends React.Component<{}, { canRender: boolean }> {
  constructor(args: {}) {
    super(args);
    this.state = {
      canRender: false
    };
  }

  componentDidMount() {
    this.setState({ canRender: true });
  }

  render() {
    const { children } = this.props;
    const { canRender } = this.state;

    return canRender ? children : null;
  }
}
