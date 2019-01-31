import React, { Component } from 'react';
import Split from 'react-split';
import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Button } from 'reactstrap';
import Editor from './Editor';
import { judge } from '../api';
import './Workspace.css';
import Ace from './Ace';
import Code from './Code';

class Workspace extends Component {
  state = { code: null, input: '', result: null, testResults: null, tab: 0 }
  runCode = this.runCode.bind(this);
  runTests = this.runTests.bind(this);
  tabs = ['Input', 'Output', 'Stderr', 'Compilation', 'Execution', 'Tests'];

  async run(input, output) {
    const resp = await judge.post('/submissions?wait=true', {
      source_code: this.state.code,
      language_id: 10,
      stdin: input || null,
      expected_output: output || null
    });
    console.log(resp);
    return resp.data;
  }

  async runCode() {
    const result = await this.run(this.state.input);
    let tab = 0;
    if (result.status.id <= 4) // accepted (or WA)
      tab = 1;
    else if (result.status.id === 6) // compilation error
      tab = 3;
    else if (result.status.id <= 12) // runtime error or TLE
      tab = 4;
    else // internal error
      alert('An internal error occurred. Please try again.');
    this.setState({ result, tab });
  }

  async runTests() {
    if (!this.props.testCases)
      return alert('No test cases provided, please select a problem first.');
    this.setState({
      testResults: new Array(this.props.testCases.length).fill(null),
      tab: 5
    });
    await Promise.all(this.props.testCases.map(({ input, output }, index) =>
      this.run(input, output).then(result => {
        result.input = input;
        this.setState((state) => {
          const testResults = state.testResults.slice();
          testResults[index] = result;
          return { testResults };
        });
      })
    ));
  }

  setTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <Split direction="vertical" sizes={[70, 30]} minSize={[100, 0]} gutterSize={4}>
        <Editor
          onChange={code => this.setState({ code })}
          onRun={this.runCode}
          onTest={this.runTests}
        />
        <div className="results-view">
          <TabContent activeTab={this.state.tab}>
            <TabPane tabId={0}>
              <Ace value={this.state.input} onChange={input => this.setState({ input })} />
            </TabPane>
            <TabPane tabId={1}>
              <Ace value={(this.state.result && this.state.result.stdout) || ''} readOnly={true} />
            </TabPane>
            <TabPane tabId={2}>
              <Ace value={(this.state.result && this.state.result.stderr) || ''} readOnly={true} />
            </TabPane>
            <TabPane tabId={3}>
              {this.state.result && (
                <div className="p-2">
                  {this.state.result.status.id !== 6 ? (
                    <b>Compilation successful.</b>
                  ) : (
                    <>
                      <b>Compilation error:</b>
                      <Code value={this.state.result.compile_output} />
                    </>
                  )}
                </div>
              )}
            </TabPane>
            <TabPane tabId={4}>
              {this.state.result && (
                <div className="p-2">
                  <p><b>Time:</b> {this.state.result.time == null ? '-' : Math.floor(this.state.result.time * 1000) + ' ms'}</p>
                  <p><b>Memory:</b> {this.state.result.memory == null ? '-' : this.state.result.memory + ' KB'}</p>
                  <p><b>Verdict:</b> {this.state.result.status.description}</p>
                </div>
              )}
            </TabPane>
            <TabPane tabId={5}>
              {this.state.testResults && (
                <Table className="results-table" hover={true}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Verdict</th>
                      <th>Time</th>
                      <th>Memory</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.testResults.map((result, i) => result && (
                      <tr key={i}>
                        <td>{i}</td>
                        <td>{result.status.description}</td>
                        <td>{result.time == null ? '-' : Math.floor(result.time * 1000) + ' ms'}</td>
                        <td>{result.memory == null ? '-' : result.memory + ' KB'}</td>
                        <td><Button size="sm" onClick={() => this.setState({ tab: 0, input: result.input })}>Load</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </TabPane>
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
