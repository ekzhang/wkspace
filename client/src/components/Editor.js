import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareAlt, faDownload, faTools, faPlay, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Spacer from './Spacer';
import Ace from './Ace';
import FileUpload from './FileUpload';
import { download } from '../js/utils';

function Editor(props) {
  return (
    <div className="editor-area">
      <div className="editor-menu">
        <FileUpload>
          {upload => (
            <button onClick={async () => props.onChange(await upload())}>
              <FontAwesomeIcon icon={faUpload} /> Load
            </button>
          )}
        </FileUpload>
        <Spacer />
        <button onClick={() => alert('Not implemented')}>
          <FontAwesomeIcon icon={faShareAlt} /> Share
        </button>
        <button onClick={() => download('main.cpp', this.state.code)}>
          <FontAwesomeIcon icon={faDownload} /> Download
        </button>
      </div>

      <Ace
        mode="c_cpp"
        value={props.value.code}
        onChange={code => props.onChange({ code })}
      />

      <div className="editor-menu">
        <button onClick={() => alert('Not implemented')}>
          <FontAwesomeIcon icon={faTools} /> Settings
        </button>
        <Spacer />
        <button disabled={props.working} onClick={props.onRun}>
          <FontAwesomeIcon icon={faPlay} /> Run
        </button>
        <button disabled={props.working} onClick={props.onTest}>
          <FontAwesomeIcon icon={faCheck} /> Test
        </button>
        <button disabled={props.working} onClick={props.onSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} /> Submit
        </button>
      </div>
    </div>
  );
}

export default Editor;
