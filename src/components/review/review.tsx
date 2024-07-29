import { ServerReview } from '../../types/review';

function formatDate(isoDate: string) {
  const res = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  return res.toLocaleDateString('en-US', options);
}

type ReviewDateProps = {
  isoDate: string;
};

function ReviewDate({ isoDate }: ReviewDateProps) {
  const formattedDate = formatDate(isoDate);

  // Извлечение года и месяца для атрибута dateTime
  const [year, month] = isoDate.split('-');
  return (
    <time className="reviews__time" dateTime={`${year}-${month}`}>
      {formattedDate}
    </time>
  );
}

function Review({ user, date, comment, rating }: ServerReview): JSX.Element {
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${100 / 5 * rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>

        <ReviewDate isoDate={date} />
      </div>
    </>
  );
}

export { Review };
