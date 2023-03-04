import { useState, useEffect } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMassage from "../errorMassage/ErrorMassage";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getCharacter, clearError } = useMarvelServices();
  // в переменные записываем то что пришло нам из нашего хука
  // char - это объект из _transformCharacter ({})
  // loading, error, getCharacter - приходит из useMarvelServices

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  // динамически формируем state из данных полученых с сервера с учетом того что они приходят в объекте results и имеют определенную структуру полей
  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    // получаем рандомное значение из диапазрна чисел из id персонажей
    getCharacter(id).then(onCharLoaded);
  };

  const errorMassage = error ? <ErrorMassage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;
  // если "условие" то "результат" иначе : "результат 2"

  return (
    <div className="randomchar">
      {errorMassage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

// простой рендерящий компонент, который выводит динамическую верстку. Компоненты нужно делить на рендерные и логические
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
