import React, { Component } from 'react';
import Split from 'react-split';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Editor from './Editor';
import { judge } from '../api';
import './Workspace.css';
import Ace from './Ace';

class Workspace extends Component {
  state = { code: null, result: null, tab: 0 }
  runCode = this.runCode.bind(this);
  tabs = ['Input', 'Output', 'Stderr', 'Compilation', 'Tests'];

  async runCode() {
    const result = await judge.post('/submissions?wait=true', {
      source_code: this.state.code,
      language_id: 10
    });
    this.setState({ result });
  }

  setTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <Split direction="vertical" sizes={[70, 30]} minSize={[100, 0]} gutterSize={4}>
        <Editor
          onChange={(code) => this.setState({ code })}
          onRun={this.runCode}
        />
        <div className="results-view">
          <TabContent activeTab={this.state.tab}>
            <TabPane tabId={0}>
              <Ace value={JSON.stringify(this.state.result)} />
            </TabPane>
            <TabPane tabId={1}>1</TabPane>
            <TabPane tabId={2}>2</TabPane>
            <TabPane tabId={3}>3</TabPane>
            <TabPane tabId={4}>4</TabPane>
          </TabContent>
          <Nav tabs>
            {this.tabs.map((tabName, i) => (
              <NavItem key={i}>
                <NavLink
                  className={this.state.tab === i ? 'active' : ''}
                  onClick={() => this.setTab(i)}>
                  {tabName}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </Split>
    );
  }
}

export default Workspace;
