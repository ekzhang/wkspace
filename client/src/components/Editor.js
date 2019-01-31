import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareAlt, faDownload, faTools, faPlay, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Spacer from './Spacer';
import Ace from './Ace';
import FileUpload from './FileUpload';

const defaultCode = `#include <bits/stdc++.h>
using namespace std;

typedef long long LL;
const double PI = 4 * atan(1);

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);

    // your code here

    cout.flush();
    return 0;
}
`;

class Editor extends Component {
  state = { code: defaultCode }
  handleChange = this.handleChange.bind(this);

  handleChange(code) {
    if (code !== null) {
      this.setState({ code });
      if (this.props.onChange)
        this.props.onChange(code);
    }
  }

  componentDidMount() {
    this.handleChange(this.state.code);
  }

  render() {
    return (
      <div className="editor-area">
        <div className="editor-menu">
          <FileUpload>
            {upload => (
              <button onClick={async () => this.handleChange(await upload())}>
                <FontAwesomeIcon icon={faUpload} /> Load
              </button>
            )}
          </FileUpload>
          <Spacer />
          <button><FontAwesomeIcon icon={faShareAlt} /> Share</button>
          <button><FontAwesomeIcon icon={faDownload} /> Download</button>
        </div>

        <Ace
          mode="c_cpp"
          value={this.state.code}
          onChange={this.handleChange}
        />

        <div className="editor-menu">
          <button><FontAwesomeIcon icon={faTools} /> Compile</button>
          <Spacer />
          <button onClick={this.props.onRun}><FontAwesomeIcon icon={faPlay} /> Run</button>
          <button onClick={this.props.onTest}><FontAwesomeIcon icon={faCheck} /> Test</button>
          <button><FontAwesomeIcon icon={faPaperPlane} /> Submit</button>
        </div>
      </div>
    );
  }
}

export default Editor;
