import React, { Component } from 'react';
import { Form, Input, Button, Spinner } from 'reactstrap';
import Split from 'react-split';
import Problem from '../components/Problem';
import './WorkspacePage.css';
import Workspace from '../components/Workspace';
import Spacer from '../components/Spacer';
import { api } from '../js/api';
import languages from '../js/languages';
import debounce from 'lodash/debounce';

const defaultLanguage = 10;

function defaultSolution(language = defaultLanguage) {
  return {
    language,
    code: languages[language].template
  };
}

class WorkspacePage extends Component {
  state = {
    problemId: '',
    loading: false,
    problem: null,
    solution: defaultSolution()
  };
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleWorkspaceChange = this.handleWorkspaceChange.bind(this);
  workspaceSave = debounce(this.workspaceSave.bind(this), 1000);

  loadState(data) {
    if (data.solution == null)
      data.solution = defaultSolution();
    this.setState({
      problem: data.problem,
      solution: data.solution
    });
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const { data } = await api.get(`/workspace/${id}`);
      this.loadState(data);
    }
  }

  handleChange(event) {
    this.setState({ problemId: event.target.value });
  }

  handleWorkspaceChange(value) {
    this.setState(state => ({
      solution: { ...state.solution, ...value }
    }));
    this.workspaceSave();
  }

  workspaceSave() {
    if (this.props.match.params.id)
      api.put(`/workspace/${this.props.match.params.id}/save`, this.state.solution);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const { data } = await api.post('/workspace', { type: 'CF', id: this.state.problemId });
      this.props.history.push(`/workspace/${data._id}`);
      this.loadState(data);
    }
    catch (e) {
      alert(e);
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
            <Input bsSize="sm" autoFocus placeholder="Codeforces Problem ID" value={this.state.problemId} onChange={this.handleChange} />
            <Spacer width={6} />
            <Button size="sm" disabled={this.state.loading}>{this.state.loading ? <Spinner size="sm" /> : 'Parse'}</Button>
          </Form>
          <Problem problem={this.state.problem} />
        </div>
        <Workspace
          problem={this.state.problem}
          solution={this.state.solution}
          onChange={this.handleWorkspaceChange} />
      </Split>
    );
  }
}

export default WorkspacePage;
