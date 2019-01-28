import React, { Component } from 'react';
import { Form, Input, Button, Spinner } from 'reactstrap';
import Split from 'react-split';
import Problem from './Problem';
import './App.css';
import api from '../api';
import Workspace from './Workspace';

class App extends Component {
  // Initialize state
  state = { problemId: '', problem: null, loading: false }
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(event) {
    this.setState({ problemId: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const resp = await api.get('/problem', { params: { type: 'CF', id: this.state.problemId } });
    this.setState({ problem: resp.data, loading: false });
  }

  render() {
    return (
      <Split direction="horizontal" sizes={[50, 50]} minSize={400} gutterSize={12} className="split-parent-horizontal">
        <div className="problem-pane">
          <Form className="problem-select" onSubmit={this.handleSubmit}>
            <Input placeholder="Codeforces Problem ID" value={this.state.problemId} onChange={this.handleChange}></Input>
            <Button style={{ marginLeft: '8px' }} disabled={this.state.loading}>{this.state.loading ? <Spinner size="sm" /> : 'Parse'}</Button>
          </Form>
          <Problem problem={this.state.problem} />
        </div>
        <Workspace testCases={this.state.problem && this.state.problem.statement.sampleTests} />
      </Split>
    );
  }
}

export default App;