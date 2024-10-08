import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../constants/constants';
import { useAppSelector } from '../hooks/store';

type AccessStatusProps = {
  children: JSX.Element;
}

const createAccessStatus = (status: AuthorizationStatus[], route: AppRoute) =>
  function AccessStatus({ children }: AccessStatusProps) {
    const authStatus = useAppSelector((state) => state.authorizationStatus);
    return (
      status.includes(authStatus)
        ? children
        : <Navigate to={route} />
    );
  };

const PrivateRoute = createAccessStatus([AuthorizationStatus.Auth], AppRoute.Login);
const PublicRoute = createAccessStatus([AuthorizationStatus.NoAuth, AuthorizationStatus.Unknown], AppRoute.Main);

export { PrivateRoute, PublicRoute };
