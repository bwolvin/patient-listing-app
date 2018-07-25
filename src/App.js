import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Home from './components/views/home';
import Patient from './components/views/patient';

const App = () => (
    <div className="patient-directory">
        <div className="patient-directory">
            <h1>Patient Directory</h1>
            <Link to='/' className="home-link">Back Home</Link>
        </div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/patient/:id' component={Patient} />
        </Switch>
    </div>
)

export default App;
