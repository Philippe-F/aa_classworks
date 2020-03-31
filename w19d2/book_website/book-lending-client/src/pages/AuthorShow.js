import React from 'react';
import AuthorDetails from '../components/authors/AuthorDetails';

export default (props) => {
  const { authorId } = props.match.params

  return (
    <>
      <h1> This is the author's show page!!!!!! </h1>
      <AuthorDetails authorId={authorId} />
    </>
  )
}