import React from 'react';
import './App.css';
import Customer from "./components/Customer";
import Trainings from "./components/Trainings";
import Toolbar from '@material-ui/core/Toolbar';
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import AppCalendar from './components/AppCalendar';

function App() {

  const routes = ["/components/Customer", "/components/Trainings", "/components/AppCalendar"];
  return (
    <div>
      <BrowserRouter>
      <Route path="/">
        <AppBar>
          <Toolbar>
          <Tabs>
              <Tab label="Customer" value={routes[0]} component={Link} to={routes[0]} />
              <Tab label="Trainings" value={routes[1]} component={Link} to={routes[1]} />
              <Tab label="AppCalendar" value={routes[2]} component={Link} to={routes[2]} />
          </Tabs>
          </Toolbar>
        </AppBar>
      
      </Route>
      <Switch>
        <Route path="/components/Customer" component={Customer} />
        <Route path="/components/Trainings" component={Trainings} />
        <Route path="/components/AppCalendar" component={AppCalendar} />
      </Switch>
    </BrowserRouter>
    
    
    </div>
  );
}

export default App;
