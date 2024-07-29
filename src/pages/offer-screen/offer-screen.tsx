import classNames from 'classnames';
import { Header } from '../../components/header/header';
import { ReviewsList } from '../../components/reviews-list/reviews-list';

import { ServerOfferDetail, ServerOffer } from '../../types/offer';
import { Map } from '../../components/map/map';

import { useState, useEffect } from 'react';
import { Card } from '../../components/card/card';
import { api } from '../../store';
import { APIRoute, AppRoute } from '../../constants/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/spinner/spinner';

const NEARBY_OFFERS_COUNT = 3;

function OfferScreen() {
  const navigate = useNavigate();
  const [data, setData] = useState<ServerOfferDetail | null>(null);
  const [offers, setOffers] = useState<ServerOffer[]>([]);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const offerPath = `${APIRoute.Offers}/${id}`;
        const offerData = await api.get<ServerOfferDetail>(offerPath);
        const offersNearbyData = await api.get<ServerOffer[]>(`${offerPath}/nearby`);

        setData(offerData.data);
        setOffers(offersNearbyData.data.slice(0, NEARBY_OFFERS_COUNT));
      } catch (error) {
        navigate(AppRoute.NotFound);
      }
    }
    getData();
  }, [id, navigate]);

  if (!data) {
    return <Spinner />;
  } else {
    const { title, images, type, price, isPremium, isFavorite, rating, bedrooms, maxAdults, goods, host, description, location } = data;

    return (
      <div className="page">
        <Header />

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.map((item) => (
                  <div className="offer__image-wrapper" key={item}>
                    <img className="offer__image" src={item} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}

                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {title}
                  </h1>
                  <button className={classNames('offer__bookmark-button', 'button', { 'offer__bookmark-button--active': isFavorite })} type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${100 / 5 * rating}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((item) => (
                      <li className="offer__inside-item" key={item}>
                        {item}
                      </li>
                    ))}

                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {host.name}
                    </span>
                    {host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {description}
                    </p>
                  </div>
                </div>

                {id &&
                  <ReviewsList id={id} />}
              </div>
            </div>
            <Map className='offer__map' center={Object.assign(location, { zoom: 12 })} points={[...(offers.map((item) => (item.location))), location]} selectedPoint={data.location} />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {offers.map((item) => (
                  <Card key={item.id} environment="cities" {...item} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export { OfferScreen };
