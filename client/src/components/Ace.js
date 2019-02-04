import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import AceEditor from 'react-ace';
import 'brace/mode/c_cpp';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/ruby';
import 'brace/theme/monokai';
import 'brace/theme/dawn';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/keybinding/vim';
import 'brace/keybinding/emacs';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import './Editor.css';
import AceContext from '../context/AceContext';

function Ace(props) {
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {(width, height) =>
        <AceContext.Consumer>
          {aceProps =>
            <AceEditor
              mode="text"
              height={`100%/*${height}*/`} // Hack to call resize() properly
              width={`100%/*${width}*/`}
              fontSize={14}
              wrapEnabled={true}
              highlightActiveLine={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showPrintMargin: false,
                scrollPastEnd: 1.0,
              }}
              editorProps={{ $blockScrolling: Infinity }}
              {...aceProps}
              {...props}
            />
          }
        </AceContext.Consumer>
      }
    </ReactResizeDetector>
  )
}

export default Ace;
