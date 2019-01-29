import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import AceEditor from 'react-ace';
import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import './Editor.css';

function Ace({ mode = 'text', value, onChange }) {
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {(width, height) => (
        <AceEditor
          mode={mode}
          theme="monokai"
          height={'calc(100% - 0 * ' + height + 'px)'} // Hack to call resize() properly
          width={'calc(100% - 0 * ' + width + 'px)'}
          fontSize={14}
          wrapEnabled={true}
          highlightActiveLine={false}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
            scrollPastEnd: 1.0,
          }}
          editorProps={{ $blockScrolling: Infinity }}
          value={value}
          onChange={onChange}
        />
      )}
    </ReactResizeDetector>
  )
}

export default Ace;
