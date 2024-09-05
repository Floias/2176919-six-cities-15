import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { setCity } from '../../store/slices/offers';
import { City } from '../../utils/cities';
import { selectedCitySelector } from '../../store/selectors';

type LocationProps = {
  city: City;
  isTabs: boolean;
}

function Location({city, isTabs}: LocationProps) {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectedCitySelector);
  const isCurrentCity = city === currentCity;
  return (
    <li className="locations__item" data-testid="cities-list-item">
      <a className={classNames(
        'locations__item-link',
        {'tabs__item' :isTabs},
        {'tabs__item--active' :isCurrentCity}
      )} href='#' onClick={(evt) => {
        evt.preventDefault();
        const value = (evt.target as HTMLElement).textContent;
        if (value) {
          dispatch(setCity(value));
        }
      }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

export default Location;
