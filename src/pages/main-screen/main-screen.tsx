// src/components/main-screen/main-screen.tsx
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Card } from '../../components/card/card';
import { Header } from '../../components/header/header';
import { Map } from '../../components/map/map';
import { Sort } from '../../components/sort/sort';
import { CITIES } from '../../constants/constants';
import { useDocumentTitle } from '../../hooks/document-title';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { selectCity } from '../../store/action';
import { ServerLocation, ServerOffer } from '../../types/offer';

function MainScreen(): JSX.Element {
  useDocumentTitle('search results');

  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const selectedCity = useAppSelector((state) => state.city);
  const location = useLocation();

  const [filteredOffers, setFilteredOffers] = useState<ServerOffer[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [sortType, setSortType] = useState('popular');

  useEffect(() => {
    const cityName = CITIES.find((item) => item.slug === location.pathname.slice(1));

    if (cityName) {
      dispatch(selectCity(cityName.name));
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const sortedOffers = [...offers.filter((offer) => offer.city.name === selectedCity)];

    switch (sortType) {
      case 'price-low-to-high':
        sortedOffers.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        sortedOffers.sort((a, b) => b.price - a.price);
        break;
      case 'top-rated-first':
        sortedOffers.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredOffers(sortedOffers);
  }, [offers, selectedCity, sortType]);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li key={city.name} className="locations__item">
                  <NavLink
                    to={`/${city.slug}`}
                    className={({ isActive }) => classNames('locations__item-link tabs__item', { 'tabs__item--active': isActive })}
                    onClick={() => dispatch(selectCity(city.name))}
                  >
                    <span>{city.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {selectedCity}</b>
                <Sort currentSort={sortType} onSortChange={setSortType} />

                <div className="cities__places-list places__list tabs__content">
                  {filteredOffers.map((item) => (
                    <Card key={item.id} environment="cities" {...item} onHover={setActiveCard} />
                  ))}
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  className='cities__map'
                  center={CITIES.find((item) => item.name === selectedCity)?.location as ServerLocation}
                  points={filteredOffers.map((item) => item.location)}
                  selectedPoint={filteredOffers.find((item) => item.id === activeCard)?.location}
                />
              </div>
            </div>
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {selectedCity}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export { MainScreen };
