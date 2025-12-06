import React, { useContext } from 'react';
import './ItemCard.css';
import likeIcon from '../../../assets/Like button.svg';
import likedIcon from '../../../assets/Like button-liked.svg';
import CurrentUserContext from '../../../contexts/CurrentUserContext.js';

function ItemCard({ item, onClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const imageUrl = item?.link || item?.imageUrl;
  const isLiked = item?.likes?.some((id) => id === currentUser?._id);
  const likeButtonClass = `item-card__like-btn ${isLiked ? 'item-card__like-btn_active' : ''}`;

  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <div
      className="item-card"
      onClick={() => onClick(item)}
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="item-card__header">
        <div className="item-card__name-wrapper">
          <span className="item-card__name">
            {item?.name || 'Unnamed Item'}
          </span>
        </div>
        {isLoggedIn && (
          <button
            className={likeButtonClass}
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            aria-label={isLiked ? 'Unlike item' : 'Like item'}
          >
            <img
              src={isLiked ? likedIcon : likeIcon}
              alt="Like"
              className="item-card__like-icon"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
