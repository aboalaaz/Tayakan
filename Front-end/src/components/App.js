import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';

import LoginPage from '../views/examples/LoginPage.js';
import RegisterPage from '../views/examples/RegisterPage.js';
import AboutUs from '../views/examples/AboutUs.js';
import ProfilePage from '../views/examples/ProfilePage.js';
import Admin_Dashboard from '../views/examples/Admin_Dashboard';
import Test from '../views/examples/Test';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(AboutUs, null)} />
         

          <Route exact path="/Test" component={Auth(Test, true)} />
          <Route exact path="/Profile" component={Auth(ProfilePage, true)} />
          <Route exact path="/dashboard" component={Auth(Admin_Dashboard, true)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
