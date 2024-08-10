import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { api } from '../../store';
import { ServerOffer } from '../../types/offer';
import { APIRoute } from '../../constants/constants';
import { ReviewData } from '../../types/review-data';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { CustomErrorResponse } from '../../types/login-error';

type ReviewsFormParams = Pick<ServerOffer, 'id'> & {
  onReviewSubmit: () => void;
};

function ReviewsForm({ id, onReviewSubmit }: ReviewsFormParams): JSX.Element {
  const [isValid, setIsValid] = useState(false);
  const defaultFormData: ReviewData = {
    rating: 0,
    comment: '',
  };
  const [formData, setFormData] = useState<ReviewData>(defaultFormData);

  useEffect(() => {
    const { rating, comment } = formData;
    setIsValid(rating !== 0 && comment.length >= 50);
  }, [formData]);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: parseInt(evt.target.value, 10) });
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, comment: evt.target.value });
  };

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await api.post<ReviewData>(`${APIRoute.Comments}/${id}`, formData);
      setFormData(defaultFormData);
      onReviewSubmit(); // обновляем отзывы после успешной отправки
    } catch (error) {
      const axiosError = error as AxiosError<CustomErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data.details[0].messages[0]);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  }

  return (
    <form className="reviews__form form" method="post" onSubmit={(evt) => {
      onSubmit(evt);
    }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={formData.rating === 5}
          onChange={handleRatingChange}

        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={formData.rating === 4}
          onChange={handleRatingChange}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={formData.rating === 3}
          onChange={handleRatingChange}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={formData.rating === 2}
          onChange={handleRatingChange}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={formData.rating === 1}
          onChange={handleRatingChange}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleTextChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
