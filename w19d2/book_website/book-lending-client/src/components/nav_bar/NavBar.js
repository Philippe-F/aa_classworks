import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return(
  <>
    <Link to="/"> Books </Link>
    <Link to="/authors"> Authors </Link>
  </>
  )
}