import { Header } from '../../components/header/header';
import { Card } from '../../components/card/card';
import { Footer } from '../../components/footer/footer';
import { mockOffer } from '../../mock/offer';
import { useDocumentTitle } from '../../hooks/document-title';

const mockOffers = Array.from({ length: 5 }, mockOffer);


function FavoritesScreen() {
  useDocumentTitle('favorites');

  const offers = Array.from({ length: 2 }, mockOffer);

  return (
    <div className="page">
      <Header />

      {/* Блок вставляется, когда в избранном что-то есть */}
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {mockOffers.map((item) => (
                    <Card key={item.id} environment="favorites" {...item} />
                  ))}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <Card environment="favorites" {...offers[0]} />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Блок вставляется, когда избранное пусто */}
      {/* <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main> */}

      <Footer />
    </div>
  );
}

export { FavoritesScreen };
