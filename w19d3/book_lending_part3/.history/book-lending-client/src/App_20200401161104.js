import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BookIndex from './pages/BookIndex';
import BookShow from './pages/BookShow';
import AuthorIndex from './pages/AuthorIndex';
import AuthorShow from './pages/AuthorShow';
import NavBar from '../src/components/nav_bar/NavBar'
import UserProfile from './pages/UserProfile';
import { Protected, Auth } from './utils/route_util';
import LoginPage from './pages/Login';
import { AuthComponent } from './utils/component_util';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <AuthComponent component={BookIndex}/>} />
        <Route exact path="/authors" component={AuthorIndex} />
        <Route exact path="/authors/:authorId" component={AuthorShow} />
        <Route exact path="/books/:bookId" component={BookShow} />
        <Protected exact path="/me" component={UserProfile} />
        <Auth exact path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};
