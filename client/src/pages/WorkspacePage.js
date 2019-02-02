import React, { Component } from 'react';
import { Form, Input, Button, Spinner } from 'reactstrap';
import Split from 'react-split';
import Problem from '../components/Problem';
import './WorkspacePage.css';
import Workspace from '../components/Workspace';
import Spacer from '../components/Spacer';
import { api } from '../js/api';

class WorkspacePage extends Component {
  state = { problemId: '', problem: null, loading: false };
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(event) {
    this.setState({ problemId: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const resp = await api.get('/problem', { params: { type: 'CF', id: this.state.problemId } });
      this.setState({ problem: resp.data });
    }
    catch (e) {
      alert('Error: ' + e);
    }
    finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Split direction="horizontal" sizes={[50, 50]} minSize={400} gutterSize={12} className="split-parent-horizontal">
        <div className="problem-pane">
          <Form className="problem-select" onSubmit={this.handleSubmit}>
            <Input size="sm" autoFocus placeholder="Codeforces Problem ID" value={this.state.problemId} onChange={this.handleChange} />
            <Spacer width={6} />
            <Button size="sm" disabled={this.state.loading}>{this.state.loading ? <Spinner size="sm" /> : 'Parse'}</Button>
          </Form>
          <Problem problem={this.state.problem} />
        </div>
        <Workspace problem={this.state.problem} />
      </Split>
    );
  }
}

export default WorkspacePage;
