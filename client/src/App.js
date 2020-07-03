import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
//HomeStay
import Home from './components/homestay/Home';
import HomeStays from './components/homestay/HomeStays';
import HomeStay from './components/homestay/Homestay';
import SingleHomeStay from './components/homestay/SingleHomeStay';
import Error from './components/homestay/Error';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth' ;
import setAuthToken from './utils/setAuthToken';
import CreateHomestay from './components/homestay/homestay-forms/CreateHomestay';
import EditHomestay from './components/homestay/homestay-forms/EditHomestay';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
<Provider store={store}>
<Router>
  <Fragment>
   <Navbar />
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Alert />
      <switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profiles" component={Profiles} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/homestays/:userCoords" component={HomeStays} />
      <Route exact path="/homestay/:id" component={HomeStay} />
      <Route exact path="/homestay" component={Home} />

      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/create-homestay" component={CreateHomestay} />
      <PrivateRoute exact path="/edit-homestay" component={EditHomestay} />

      </switch>
    </section>
  </Fragment>
</Router>
</Provider>
)};

export default App;
