import { useState, useEffect } from "react";
import Comment from './Comment';
import api from '../utils/Api';

function ImagePopup(props) {
  const [inputVal, setInputVal] = useState('');
  const [comments, setComments] = useState([]);

  function handleClick(e) {
    e.stopPropagation();
    props.onClose();
  }

  function handleClickForChildren(e) {
    e.stopPropagation();
    return;
  }

  function inputChange(e) {
    setInputVal(e.target.value);
  }

  function addComment() {
    const cardId = props.card._id;
    api.addComment(cardId, inputVal)
      .then(res => {
        setComments(res.comments);
        setInputVal('');
      })
      .catch(err => console.log(err))
      .finally(() => {
        setInputVal('');
      });;
  }

  useEffect(() => {
    if (props.card) {
      fetchComments();
    }
  }, [props.card]);

  function fetchComments() {
    const cardId = props.card._id;
    return api.getCommentsByCardId(cardId)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCommentDelete(cardId, commentId) {
   return api.deleteComment(cardId, commentId)
   .then(res => {
    setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
  })
   .catch(err => console.log(err))
  }

  return (
    <div onClick={handleClick} className={props.isOpened ? 'popup popup_dark popup_opened' : 'popup popup_dark'} id="popup_image">
      <div onClick={handleClickForChildren} className="popup__container popup__container_target">
        <button className="popup__buttons-close" type="button" onClick={props.onClose} />
        <h2 className="popup__subtitle">{props.card.name}</h2>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <div className="popup__comment-area">
          {comments && comments.map(element => {
            return <Comment commentId={element._id} cardId={props.card._id} key={element._id} deleteComment={handleCommentDelete}
            commentText={element.text} commentOwner={element.user._id} authorName={element.user.name} authorAvatar={element.user.avatar} />
          })}
          <form className="popup__image__add-comment-form">
            <input minLength={3} value={inputVal} placeholder="Добавить комментарий..." className="input__add-comment" onChange={inputChange}></input>
            <button className="button__add-comment" type="submit" onClick={addComment}>Добавить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;