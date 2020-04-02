import React from 'react';
import NavBar from '../components/nav_bar/NavBar';
import UserDetails from '../components/user/UserDetails.js';
import LogOutButton from '../components/user/LogOutButton';
import { ProtectedComponent } from '../utils/component_util';

export default () => {
  return (
    <ProtectedComponent>
      <NavBar />
      <LogOutButton />
      <UserDetails />
    </ProtectedComponent>
  )
}