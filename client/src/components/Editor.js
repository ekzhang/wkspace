import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareAlt, faDownload, faTools, faPlay, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, Form, FormGroup, Label, Input } from 'reactstrap';
import Spacer from './Spacer';
import Ace from './Ace';
import FileUpload from './FileUpload';
import { download } from '../js/utils';
import languages from '../js/languages';

class Editor extends Component {
  state = { settingsOpen: false };
  toggleSettings = this.toggleSettings.bind(this);
  handleLanguage = this.handleLanguage.bind(this);

  toggleSettings() {
    this.setState(state => ({
      settingsOpen: !state.settingsOpen
    }));
  }

  handleLanguage(event) {
    const language = event.target.value;
    this.props.onChange({ language, code: languages[language].template });
  }

  render() {
    return (
      <div className="editor-area">
        <div className="editor-menu">
          <FileUpload>
            {upload => (
              <Button onClick={async () => this.props.onChange(await upload())}>
                <FontAwesomeIcon icon={faUpload} /> Load
              </Button>
            )}
          </FileUpload>
          <Spacer />
          <Button onClick={() => alert('Not implemented')}>
            <FontAwesomeIcon icon={faShareAlt} /> Share
          </Button>
          <Button onClick={() => download('main.cpp', this.props.value.code)}>
            <FontAwesomeIcon icon={faDownload} /> Download
          </Button>
        </div>

        <Ace
          mode={languages[this.props.value.language].mode}
          value={this.props.value.code}
          onChange={code => this.props.onChange({ code })}
        />

        <div className="editor-menu">
          <ButtonDropdown isOpen={this.state.settingsOpen} toggle={this.toggleSettings} direction="up">
            <DropdownToggle>
              <FontAwesomeIcon icon={faTools} /> Settings
            </DropdownToggle>
            <DropdownMenu className="p-3">
              <Form className="form-inline" style={{ width: 200 }}>
                <FormGroup>
                  <Label for="language-select">Language:</Label>
                  <Spacer width={6} />
                  <Input
                    bsSize="sm"
                    type="select"
                    id="language-select"
                    value={this.props.value.language}
                    onChange={this.handleLanguage}>
                    {Object.entries(languages).map(([id, { name }]) =>
                      <option key={id} value={id}>{name}</option>
                    )}
                  </Input>
                </FormGroup>
              </Form>
            </DropdownMenu>
          </ButtonDropdown>
          <Spacer />
          <Button disabled={this.props.working} onClick={this.props.onRun}>
            <FontAwesomeIcon icon={faPlay} /> Run
          </Button>
          <Button disabled={this.props.working} onClick={this.props.onTest}>
            <FontAwesomeIcon icon={faCheck} /> Test
          </Button>
          <Button disabled={this.props.working} onClick={this.props.onSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} /> Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Editor;
