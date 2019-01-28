import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import AceEditor from 'react-ace';
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import './Editor.css';

const defaultCode = `#include <bits/stdc++.h>
using namespace std;

typedef long long LL;
const double PI = 4 * atan(1);

#define MAXN 100013
int N;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);

    cin >> N;

    cout.flush();
    return 0;
}
`;

class Editor extends Component {
  state = { code: defaultCode }
  handleChange = this.handleChange.bind(this);

  handleChange(code) {
    this.setState({ code });
    if (this.props.onChange)
      this.props.onChange(code);
  }

  componentDidMount() {
    this.handleChange(this.state.code);
  }

  render() {
    return (
      <div className="editor-area">
        <div className="editor-menu">
          <button>test</button>
        </div>

        <ReactResizeDetector handleWidth handleHeight>
          {(width, height) => (
            <AceEditor
              mode="c_cpp"
              theme="monokai"
              height={height ? '100%' : '0'}
              width={width ? '100%' : '0'}
              value={this.state.code}
              fontSize={14}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showPrintMargin: false,
                scrollPastEnd: 1.0,
              }}
              editorProps={{ $blockScrolling: Infinity }}
              onChange={this.handleChange}
            />
          )}
        </ReactResizeDetector>

        <div className="editor-menu">
          <button>bottom test</button>
        </div>
      </div>
    );
  }
}

export default Editor;
