import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import About from '../About';
import Home from '../Home';
import Pets from '../Pets';
import PetDetail from '../PetDetail';

class AppRoot extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' exact component={About} />
        <Route path='/pets/zipcodes/:zip' render={props => <Pets {...props} />} />
        <Route path='/pets/:petId' render={props => <PetDetail {...props} />} />
      </Switch>
    );
  }
}

export default withRouter(AppRoot);
