import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';

import LoginPage from '../views/examples/LoginPage.js';
import RegisterPage from '../views/examples/RegisterPage.js';
import AboutUs from '../views/examples/AboutUs.js';
import ProfilePage from '../views/examples/ProfilePage.js';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(AboutUs, null)} />
          <Route exact path="/Profile" component={Auth(ProfilePage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
