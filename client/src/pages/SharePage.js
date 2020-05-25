import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'reactstrap';
import moment from 'moment';
import Ace from '../components/Ace';
import { api } from '../js/api';
import languages from '../js/languages';

function SharePage({ match }) {
  const { id } = match.params;
  const [ share, setShare ] = useState(null);
  const [ time, setTime ] = useState(moment());

  useEffect(() => {
    const id = setInterval(() => setTime(moment()), 5000);
    return () => clearInterval(id);
  });

  useEffect(() => {
    api.get(`/share/${id}`).then(resp => {
      if (resp.status === 200) {
        setShare(resp.data);
      }
    });
  }, [id]);

  if (!share) {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
      </div>
    );
  }

  return (
    <Container style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '8px 0' }}>
        Code shared: <strong>{time.to(share.createdAt)}</strong>
      </div>
      <Ace
        mode={(languages[share.solution.language] || {}).mode}
        value={share.solution.code}
        readOnly
      />
    </Container>
  );
}

export default SharePage;
