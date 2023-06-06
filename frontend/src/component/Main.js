import '../index.css';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useSelector } from 'react-redux';

function Main(props) {

  const userInfo = useContext(CurrentUserContext);
  const reduxCardState = useSelector(state =>  state.cards.reduxCards );


  return (
    <main className="main">
      <section className="profiles">
        <div className="profiles__column">
          <div className="profiles__container">
            <img
              alt="Аватар профиля"
              src={userInfo.avatar}
              className="profiles__avatar"
            />
            <button className="profiles__buttons-avatar" onClick={props.onEditAvatar} type="button" />
          </div>
          <div className="profiles__row">
            <h1 className="profiles__name">{userInfo.name}</h1>
            <button className="profiles__buttons-edit" onClick={props.onEditProfile} type="button" />
          </div>
          <p className="profiles__subtitle">{userInfo.about}</p>
          <button className="profiles__buttons-add" onClick={props.onAddPlace} type="button" />
        </div>
      </section>
      <section className="profile-content">
        {props.cards.map((card, index) => {
          return (
            <Card comments={card.comments} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={index} onCardClick={props.onCardClick} card={card} name={card.name} link={card.link} likes={card.likes} />
          )
        })}
      </section>
        <p className='p-margin'>Рендер с помощью Redux  &#8659;</p>
      <section className="profile-content">
        {reduxCardState.map((reduxCard, index) => {
          return (
            <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={index} onCardClick={props.onCardClick} card={reduxCard} name={reduxCard.name} link={reduxCard.link} likes={reduxCard.likes} />
          )
        })}
      </section>
    </main>
  )
}

export default Main