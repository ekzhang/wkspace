import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import AceEditor from 'react-ace';
import 'brace/mode/c_cpp';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/ruby';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import './Editor.css';

function Ace({ mode = 'text', readOnly, value, onChange }) {
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {(width, height) => (
        <AceEditor
          mode={mode}
          theme="monokai"
          height={`100%/*${height}*/`} // Hack to call resize() properly
          width={`100%/*${width}*/`}
          fontSize={14}
          wrapEnabled={true}
          highlightActiveLine={false}
          readOnly={readOnly}
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
