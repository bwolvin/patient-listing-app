import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Patient from './components/patient';

const App = () => (
    <div className="patient-listing">
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/patient/:id' component={Patient} />
        </Switch>
    </div>
)

export default App
