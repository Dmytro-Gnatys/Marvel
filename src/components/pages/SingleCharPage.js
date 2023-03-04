import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import useMarvelServices from "../../services/MarvelServices";
import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

import "./singleCharPage.scss";

const SingleCharPage = () => {
  const { charId } = useParams();
  // comicId - параметр который мы задали через path="/comics/:comicId" в App
  // useParams вернет нам объект с данными и ID

  const [char, setChar] = useState(null);
  // в этой переменной будет объект со всеми данными про комикс (его достает хук useParams())

  const { loading, error, getCharacter, clearError } = useMarvelServices();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    // если запрос будет успешный то результат запишется в переменную comic
  };

  const errorMassage = error ? <ErrorMassage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <>
      <AppBanner />
      {errorMassage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail} = char;
  // вытаскиваем значения из успешно принятого объекта comic (из onComicLoaded)

  return (
    <div className="single-char">
       <Helmet>
          <meta
            name="description"
            content={`${name} comics book`}
          />
          <title>{name}</title>
    </Helmet>
        <img src={thumbnail} alt={name} className="single-char__char-img"/>
        <div className="single-char__info">
            <h2 className="single-char__name">{name}</h2>
            <p className="single-char__descr">{description}</p>
        </div>
    </div>
)
};

export default SingleCharPage;
