import { OfferData } from '../../mocks/offers';
import { AppRoute, PlaceCardSize } from '../../utils/constants';
import { Link } from 'react-router-dom';

type PlaceCardProp = {
  offer: OfferData;
  variant: 'vertical' | 'horizontal';
  onMouseEnter(): void;
  onMouseLeave(): void;
};

const getPlaceCardState = (variant = 'vertical') => {
  let cardClassName = 'cities__card';
  let cardWrapperClassName = 'cities__image-wrapper';
  let cardInfoClassName = '';
  let cardWidth = PlaceCardSize.PlaceCard.with;
  let cardHeight = PlaceCardSize.PlaceCard.height;

  if (variant === 'horizontal') {
    cardClassName = 'favorites__card';
    cardWrapperClassName = 'favorites__image-wrapper';
    cardInfoClassName = 'favorites__card-info';
    cardWidth = PlaceCardSize.PlaceCardSmall.with;
    cardHeight = PlaceCardSize.PlaceCardSmall.height;
  }

  return {cardClassName, cardWidth, cardHeight, cardWrapperClassName, cardInfoClassName};
};

function Premium(): JSX.Element {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}

function PlaceCard({offer, variant, onMouseEnter, onMouseLeave}: PlaceCardProp): JSX.Element {
  const {title, isPremium, price, type, previewImage, rating, id} = offer;
  const {cardClassName, cardWidth, cardHeight, cardWrapperClassName, cardInfoClassName} = getPlaceCardState(variant);
  return (
    <article className={`${cardClassName} place-card`} onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium ? <Premium /> : ''}
      <div className={`${cardWrapperClassName} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}${id}`}>
          <img className="place-card__image" src={previewImage} width={cardWidth} height={cardHeight} alt="Place image"/>
        </Link>
      </div>
      <div className={`${cardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
/* Однако завязываться на useLocation - идея, хоть и вполне рабочая, но не самая удобная.
Представь, что руководитель проекта решит добавить эти карточки на ещё какую-нибудь страницу)
Гораздо проще было бы определить для карточки дополнительный пропс, назвать его, например, variant и передавать его снаружи там, где ты отрисовываешь карточки)

тогда у тебя тип для пропсов карточки выглядел бы примерно так:;
interface PlaceCardProps {
data: OfferData
variant: 'vertical' | 'horizontal'
} */
