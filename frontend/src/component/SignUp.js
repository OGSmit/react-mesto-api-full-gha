import { useState } from "react"
import { Link } from 'react-router-dom';

function SignUp({ onRegistr }) {
  const [formValue, setFormValue] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    onRegistr(password, email)
      .then(() => {
        e.target.reset()
      })
  }

  return (
    <section className="sign-up">
      <h1 className="sign-up__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="sign-up__form">
        <input required type="email" onChange={handleChange} placeholder="Email" name="email" className="sign-up__input"></input>
        <div className="sign-up__input-container">
        <input required type={showPassword? 'email' : 'password'} onChange={handleChange} placeholder="Пароль" name="password" className="sign-up__input"></input>
        <button className='sign-up__showPasswordButton' onMouseLeave={() => {setShowPassword(!showPassword)}} onMouseOver={() => {setShowPassword(!showPassword)}}></button>
        <div className={showPassword? "triangle-right" : 'triangle-rightOff'}></div>
        </div>
        <button className="sign-up__button">Зарегистрироваться</button>
      </form>
      <p className="sign-up__registration-question">Уже зарегистрированы? <Link className="sign-up__link" to="/sign-in">Войти</Link></p>
    </section>
  )
}

export default SignUp