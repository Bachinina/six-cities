import classNames from 'classnames';
import { ServerOffer } from '../../types/offer';
import { Link } from 'react-router-dom';

type CardProps = ServerOffer & {
  environment: 'cities' | 'favorites';
  onHover?: (id: string | null) => void;
};

const ImgSize = {
  cities: {
    width: 260,
    height: 200,
  },
  favorites: {
    width: 150,
    height: 110,
  },
};

function Card({
  id,
  environment,
  title,
  type,
  price,
  isFavorite = false,
  isPremium = false,
  rating,
  previewImage,
  onHover = () => { },
}: CardProps) {
  return (
    <article className={`${environment}__card place-card`} onMouseOver={() => onHover(id)} onMouseLeave={() => onHover(null)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${environment}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={ImgSize[environment].width} height={ImgSize[environment].height} alt={title} />
        </Link>
      </div>
      <div className={`${environment}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={classNames('button', 'place-card__bookmark-button', { 'place-card__bookmark-button--active': isFavorite })} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${100 / 5 * rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export { Card };
