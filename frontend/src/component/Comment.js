// Структура :
// Выводим строкой Аватар + имя + текст коммента

import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Comment({ commentText, commentOwner, authorName, authorAvatar, deleteComment, cardId, commentId }) {
  const userInfo = useContext(CurrentUserContext);
  const isMyComment = commentOwner ===  userInfo._id;

  function handleDeleteComment() {
   return deleteComment(cardId, commentId)
  }

  return (
    <div className="comment">
      <div className="comment__container">
      <img className="comment__avatar" alt="Аватарка" src={authorAvatar}></img>
      <p className="comment__author-name">{authorName}</p>
      <p className="comment__text">{`: ${commentText}.`}</p>
      </div>
      {isMyComment?
      <button className="comment__button-delete" onClick={handleDeleteComment}></button>:
      ''}
      
    </div>
  )
}
// все стили в page.css
export default Comment