import { Link } from 'react-router-dom';
import { Logo } from '../../components/logo/logo';
import { useDocumentTitle } from '../../hooks/document-title';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';

function LoginScreen() {
  useDocumentTitle('login');
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const authData: AuthData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      dispatch(loginAction(authData));
    }
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form ref={formRef} className="login__form form" onSubmit={onSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={'/amsterdam'} className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { LoginScreen };
