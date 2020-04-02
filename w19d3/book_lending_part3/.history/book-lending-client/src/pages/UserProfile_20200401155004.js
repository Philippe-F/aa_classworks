import React from 'react';
import NavBar from '../components/nav_bar/NavBar';
import UserDetails from '../components/user/UserDetails.js';
import LogOutButton from '../components/user/LogOutButton';

export default () => {
  return (
    <>
      <NavBar />
      <LogOutButton />
      <UserDetails />
    </>
  )
}