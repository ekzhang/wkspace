import React, { Component } from 'react';
import Split from 'react-split';
import Editor from './Editor';

class Workspace extends Component {
  state = { code: null }

  render() {
    return (
      <Split direction="vertical" sizes={[70, 30]} minSize={[100, 0]}>
        <Editor onChange={(code) => this.setState({ code })} />
        <div>bottom pane</div>
      </Split>
    );
  }
}

export default Workspace;
