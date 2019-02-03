import React, { Component } from 'react';
import Split from 'react-split';
import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Button } from 'reactstrap';
import Editor from './Editor';
import { judge } from '../js/api';
import './Workspace.css';
import Ace from './Ace';
import Code from './Code';

class Workspace extends Component {
  state = {
    input: '',
    result: null,
    testResults: null,
    working: false,
    tab: 0
  };
  runCode = this.runCode.bind(this);
  runTests = this.runTests.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  tabs = ['Input', 'Output', 'Stderr', 'Compilation', 'Execution', 'Tests'];

  async run(input, output) {
    const resp = await judge.post('/submissions', {
      source_code: this.props.solution.code,
      language_id: this.props.solution.language,
      stdin: input || null,
      expected_output: output || null
    });
    const { token } = resp.data;
    while (true) {
      const { data } = await judge.get('/submissions/' + token);
      if (data.status.id > 2) // not queued or processing
        return data;
    }
  }

  async runCode() {
    this.setState({ working: true });
    try {
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
    catch (e) {
      alert(e);
    }
    finally {
      this.setState({ working: false });
    }
  }

  async runTests() {
    if (!this.props.problem)
      return alert('No test cases provided, please select a problem first.');
    const testCases = this.props.problem.statement.sampleTests;
    this.setState({
      testResults: new Array(testCases.length).fill(null),
      tab: 5,
      working: true
    });
    await Promise.all(testCases.map(({ input, output }, index) =>
      this.run(input, output).then(result => {
        result.input = input;
        this.setState((state) => {
          const testResults = state.testResults.slice();
          testResults[index] = result;
          return { testResults };
        });
      })
    ));
    this.setState({ working: false });
  }

  handleSubmit() {
    if (!this.props.problem)
      return alert('Cannot submit, no problem selected.');
    window.open(this.props.problem.submitLink, '_blank');
  }

  setTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <Split direction="vertical" sizes={[70, 30]} minSize={[100, 0]} gutterSize={4}>
        <Editor
          value={this.props.solution}
          onChange={this.props.onChange}
          onRun={this.runCode}
          onTest={this.runTests}
          onSubmit={this.handleSubmit}
          working={this.state.working}
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
