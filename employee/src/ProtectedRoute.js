// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route {...rest} render={(props) => {
//       if (!ROLE_USER) {
//         return <Redirect to='/login' />;
//       }

//       if (roles && !roles.includes(user.role)) {
//         return <Redirect to='/' />;
//       }

//       return <Component {...props} />;
//     }} />
//   );
// };

export default ProtectedRoute;