import ReviewsForm from '../reviews-form/reviews-form';
import { Review } from '../review/review';
import { useAppSelector } from '../../hooks/store';
import { useEffect, useState, useCallback } from 'react';
import { ServerReview } from '../../types/review';
import { ServerOffer } from '../../types/offer';
import { APIRoute } from '../../constants/constants';
import { api } from '../../store';

type ReviewsListParams = Pick<ServerOffer, 'id'>;

function ReviewsList({ id }: ReviewsListParams): JSX.Element {
  const isAuth = useAppSelector((state) => state.authorizationStatus);
  const [reviews, setReviews] = useState<ServerReview[]>([]);

  const fetchReviews = useCallback(async () => {
    const reviewsPath = `${APIRoute.Comments}/${id}`;
    const reviewsData = await api.get<ServerReview[]>(reviewsPath);
    setReviews(reviewsData.data);
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((item) => <li className="reviews__item" key={item.id}><Review {...item} /></li>)}
      </ul>

      {Boolean(isAuth) &&
        <ReviewsForm id={id} onReviewSubmit={() => {
          fetchReviews();
        }}
        />}
    </section>
  );
}
export { ReviewsList };
