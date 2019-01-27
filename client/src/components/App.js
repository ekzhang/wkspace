import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import Split from 'react-split';
import Problem from './Problem';
import './App.css';
import api from '../api';

class App extends Component {
  // Initialize state
  state = { problemId: '', problem: null }
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(event) {
    this.setState({ problemId: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('submitted: ' + this.state.problemId);
    const resp = await api.get('/problem', { params: { type: 'CF', id: this.state.problemId } });
    this.setState({ problem: resp.data });
  }

  render() {
    return (
      <Split direction="horizontal" sizes={[50, 50]} minSize={400} gutterSize={12} className="split-parent">
        <div className="problem-pane">
          <Form className="problem-select" onSubmit={this.handleSubmit}>
            <Input placeholder="Codeforces Problem ID" value={this.state.problemId} onChange={this.handleChange}></Input>
            <Button style={{ marginLeft: '8px' }}>Parse</Button>
          </Form>
          <Problem problem={this.state.problem}></Problem>
        </div>
        <div>divane 2</div>
      </Split>
    );
  }
}

export default App;
