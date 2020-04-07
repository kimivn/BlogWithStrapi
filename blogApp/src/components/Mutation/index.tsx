// import React from 'react';
// import {useMutation} from '@apollo/react-hooks';
//
// const Query = ({ children, mutation, id }) => {
//   const { data, loading, error } = useMutation(query, {
//     variables: { id: id }
//   });
//
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (error) {
//     return <p>Error: {JSON.stringify(error)}</p>;
//   }
//   return children({ data });
// };
//
// export default Query;
