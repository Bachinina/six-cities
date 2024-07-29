// src/components/sort/sort.tsx
import { useState } from 'react';
import classNames from 'classnames';
import { SORT_OPTIONS } from '../../constants/constants';

type SortProps = {
  currentSort: string;
  onSortChange: (value: string) => void;
}

function Sort({ currentSort, onSortChange }: SortProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSortChange = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleOptions}>
        {SORT_OPTIONS.find((option) => option.value === currentSort)?.label || 'Popular'}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {SORT_OPTIONS.map((option) => (
          <li
            key={option.value}
            className={classNames('places__option', {
              'places__option--active': currentSort === option.value,
            })}
            tabIndex={0}
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { Sort };
