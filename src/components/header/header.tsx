import { Link } from 'react-router-dom';
import { Logo } from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { APIRoute } from '../../constants/constants';
import { logoutAction } from '../../store/api-actions';

function Header() {
  const isAuth = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userEmail);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ?
                <>
                  <li className="header__nav-item user">
                    <Link to='/favorites' className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userEmail}</span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" onClick={() => {
                      dispatch(logoutAction());
                    }}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </> :
                <li className="header__nav-item user">
                  <Link to={APIRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
