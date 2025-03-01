import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, user } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					user.role === 'admin' ? (
						<Redirect to="/admin/dashboard" />
					) : (
						<Component {...props} />
					)
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
