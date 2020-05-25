import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faShareAlt, faDownload, faTools, faPlay, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, Form, FormGroup, Label, Input } from 'reactstrap';
import Spacer from './Spacer';
import Ace from './Ace';
import FileUpload from './FileUpload';
import { download } from '../js/utils';
import languages from '../js/languages';
import AceContext from '../context/AceContext';

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
          <Button onClick={() => this.props.onShare()}>
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
            <DropdownMenu className="p-4">
              <AceContext.Consumer>
                {aceProps =>
                  <Form style={{ width: 300 }}>
                    <FormGroup className="form-row">
                      <Label className="col-4 font-weight-bold" for="language-select">Language</Label>
                      <Spacer width={6} />
                      <Input
                        className="col"
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
                    <FormGroup className="form-row">
                      <Label className="col-4 font-weight-bold" for="theme-select">Theme</Label>
                      <Spacer width={6} />
                      <Input
                        className="col"
                        bsSize="sm"
                        type="select"
                        id="theme-select"
                        value={aceProps.theme}
                        onChange={event => this.props.onAceChange({ theme: event.target.value })}>
                        <option value="monokai">Monokai</option>
                        <option value="dawn">Dawn</option>
                        <option value="textmate">Textmate</option>
                        <option value="solarized_light">Solarized Light</option>
                        <option value="solarized_dark">Solarized Dark</option>
                      </Input>
                    </FormGroup>
                    <FormGroup className="form-row">
                      <Label className="col-4 font-weight-bold" for="keybinding-select">Keybinding</Label>
                      <Spacer width={6} />
                      <Input
                        className="col"
                        bsSize="sm"
                        type="select"
                        id="keybinding-select"
                        value={aceProps.keyboardHandler}
                        onChange={event => this.props.onAceChange({ keyboardHandler: event.target.value })}>
                        <option value="">Default</option>
                        <option value="vim">Vim</option>
                        <option value="emacs">Emacs</option>
                      </Input>
                    </FormGroup>
                  </Form>
                }
              </AceContext.Consumer>
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
