import React from 'react'
import Views from './pages/views';
import Edose from './pages/edose';
import Vaie from './pages/vaie';
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: React.FC = (): JSX.Element => {

  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/Views' component={Views} />
          <Route path='/Edose' component={Edose} />
          <Route path='/Vaie' component={Vaie} />
        </Switch>
    </Router>
  );

};

export default App;
