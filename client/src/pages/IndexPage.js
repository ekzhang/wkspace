import React, { Component } from 'react';
import { api } from '../js/api';
import languages from '../js/languages';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Spacer from '../components/Spacer';

class IndexPage extends Component {
  state = { recent: null };

  async componentDidMount() {
    const { data } = await api.get('/workspace');
    this.setState({ recent: data });
  }

  async remove(id) {
    const resp = await api.delete(`/workspace/${id}`);
    if (resp.status === 200) {
      this.setState(state => ({
        recent: state.recent.filter(obj => obj._id !== id)
      }));
    }
  }

  render() {
    return (
      <div className="p-4 h-100" style={{ overflowY: 'auto' }}>
        <h1>Welcome!</h1>
        <div className="d-flex flex-wrap">
          {this.state.recent && this.state.recent.map(workspace =>
            <Card key={workspace._id} className="m-2" style={{ flexBasis: '250px' }}>
              <CardBody>
                <CardTitle className="font-weight-bold">{workspace.problem.title}</CardTitle>
                <CardSubtitle className="font-italic">{moment(workspace.updatedAt).fromNow()}</CardSubtitle>
                <CardText>{workspace.solution && (languages[workspace.solution.language] || {}).name}</CardText>
                <Link to={`/workspace/${workspace._id}`}><Button>Open</Button></Link>
                <Spacer width={6} />
                <Button color="danger" onClick={() => this.remove(workspace._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

export default IndexPage;
