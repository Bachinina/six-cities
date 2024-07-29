import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

// Компонент возвращает null, поэтому на странице он не отрисуется, но станет отрабатывать useEffect, и каждый раз будет выполняться код window.scrollTo(0, 0);, обнуляя scroll.

// Обнулять scroll следует только при открытии новой страницы, то есть при изменении pathname, поэтому pathname указано в зависимостях для useEffect.
