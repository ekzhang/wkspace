import React, { Component } from 'react';
import { Form, Input, Button, Spinner } from 'reactstrap';
import Spacer from '../components/Spacer';
import { api } from '../js/api';

class ProblemSelect extends Component {
  state = {
    problemId: '',
    loading: false
  };
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(event) {
    this.setState({ problemId: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const { data } = await api.post('/workspace', { type: 'CF', id: this.state.problemId });
      this.props.onChange(data);
    }
    catch (e) {
      alert('Error: ' + JSON.stringify(e.response.data));
    }
    finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="d-flex w-100">
        <Input bsSize="sm" autoFocus placeholder="Codeforces Problem ID" value={this.state.problemId} onChange={this.handleChange} />
        <Spacer width={6} />
        <Button size="sm" disabled={this.state.loading}>{this.state.loading ? <Spinner size="sm" /> : 'Parse'}</Button>
      </Form>
    );
  }
}

export default ProblemSelect;
