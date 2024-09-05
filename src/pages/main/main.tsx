import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';
import pluralize from 'pluralize';
import { Point } from '../../components/map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { selectedCitySelector, sortedOffersSelector, pointsOffersByCity, selectSorting} from '../../store/selectors';
import { setSorting } from '../../store/slices/offers';
import { Sorting } from '../../utils/sorting-types';
import { PlaceCardVariant } from '../../utils/constants';
import classNames from 'classnames';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map';
import PlacesOptions from './components/places-options';
import CitiesList from '../../components/cities-list/cities-list';
import MainEmpty from './main-empty';

function Main(): JSX.Element {

  const selectedCity = useAppSelector(selectedCitySelector);
  const sorting: Sorting = useAppSelector(selectSorting);
  const points = useAppSelector(pointsOffersByCity);
  const selectedOffers = useAppSelector(sortedOffersSelector);
  const dispatch = useAppDispatch();
  let isNoOffers;

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    undefined
  );

  const handleListItemHover = useCallback((listItemId: string) => {
    const currentPoint = points.find((point) => point.id === listItemId);

    setSelectedPoint(currentPoint);
  }, [points]);

  const handleSortingFormChange = useCallback((evt: React.MouseEvent<HTMLElement>) => {
    const value = (evt.target as HTMLElement).textContent;
    if (value) {
      dispatch(setSorting(value as Sorting));
    }
  }, [dispatch]);

  if (!selectedOffers.length) {
    isNoOffers = true;
  }

  return (
    <main className={classNames(
      'page__main page__main--index',
      {'page__main--index-empty' : isNoOffers}
    )}
    >
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <CitiesList isTabs/>
          </ul>
        </section>
      </div>
      {
        isNoOffers ?
          <MainEmpty city={selectedCity} /> :
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{selectedOffers.length} {pluralize('places', selectedOffers.length)} to stay in {selectedCity}</b>
                <PlacesOptions
                  sorting={sorting}
                  onChange={handleSortingFormChange}
                />
                {<OffersList offers={selectedOffers} variant={PlaceCardVariant.Vertical} onListItemHover={handleListItemHover}/>}
              </section>
              <div className="cities__right-section">
                {<Map points={points} isMain selectedPoint={selectedPoint}/>}
              </div>
            </div>
          </div>
      }
    </main>
  );
}

export default Main;
