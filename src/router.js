import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Member from './routes/Member';
import Report from './routes/Report';
import Setting from './routes/Setting';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/member" component={Member} />
      <Route path="/report" component={Report} />
      <Route path="/setting" component={Setting} />
    </Router>
  );
};
