import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute, CITIES } from '../../constants/constants';
import { PrivateRoute, PublicRoute } from '../routes/routes';

import { MainScreen } from '../../pages/main-screen/main-screen';
import { FavoritesScreen } from '../../pages/favorites-screen/favorites-screen';
import { LoginScreen } from '../../pages/login-screen/login-screen';
import { OfferScreen } from '../../pages/offer-screen/offer-screen';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks/store';
import { Spinner } from '../spinner/spinner';

function App() {
  const isOffersLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main}>
          <Route
            index
            element={<Navigate to={CITIES[0].slug} />}
          />

          {CITIES.map((city) => (
            <Route
              key={city.slug}
              path={`/:${city.slug}`}
              element={<MainScreen />}
            />
          ))}
        </Route>

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
