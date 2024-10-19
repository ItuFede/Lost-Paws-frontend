// import React, { useEffect, useState } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { Auth } from "aws-amplify";

//const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await Auth.currentAuthenticatedUser();
//         setIsAuthenticated(true);
//       } catch (error) {
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;

const ProtectedRoute = ({ component: Component, ...rest }) => {};
export default ProtectedRoute;
